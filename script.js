function addClient() {
    const clientName = document.getElementById('clientName').value;
    let accountNumber = document.getElementById('accountNumber').value;

    if (!clientName) {
        alert('Введите имя клиента');
        return;
    }

    if (!accountNumber) {
        accountNumber = 'ACC' + Math.floor(Math.random() * 10000);
    }

    const client = {
        name: clientName,
        accountNumber: accountNumber,
        balance: 0,
        credits: []
    };

    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.push(client);
    localStorage.setItem('clients', JSON.stringify(clients));
    alert(`Клиент ${clientName} добавлен с номером счёта: ${accountNumber}`);
    window.location.href = 'index.html';
}

function addCreditToClient(accountNumber, credit) {
    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    const clientIndex = clients.findIndex(client => client.accountNumber === accountNumber);

    if (clientIndex !== -1) {
        clients[clientIndex].credits.push(credit);
        localStorage.setItem('clients', JSON.stringify(clients));
        alert('Кредит успешно добавлен');
    } else {
        alert('Клиент не найден');
    }
}

function displayClients() {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = '';

    clients.forEach((client, index) => {
        const clientCard = document.createElement('div');
        clientCard.className = 'client-card';
        clientCard.innerHTML = `
            <p><strong>Имя:</strong> ${client.name}</p>
            <p><strong>Номер счёта:</strong> ${client.accountNumber}</p>
            <button onclick="interact(${index})">Взаимодействовать</button>
        `;
        clientList.appendChild(clientCard);
    });
}

function displayClientsForDeletion() {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = '';

    clients.forEach((client, index) => {
        const clientCard = document.createElement('div');
        clientCard.className = 'client-card';
        clientCard.innerHTML = `
            <p><strong>Имя:</strong> ${client.name}</p>
            <p><strong>Номер счёта:</strong> ${client.accountNumber}</p>
            <button onclick="deleteClient(${index})">Удалить</button>
        `;
        clientList.appendChild(clientCard);
    });
}

function deleteClient(index) {
    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.splice(index, 1);
    localStorage.setItem('clients', JSON.stringify(clients));
    alert('Клиент удалён');
    displayClientsForDeletion();
}

function interact(index) {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    localStorage.setItem('currentClient', JSON.stringify(clients[index]));
    window.location.href = 'interaction.html';
}
