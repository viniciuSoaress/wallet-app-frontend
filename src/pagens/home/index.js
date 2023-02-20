const renderFinacesList = (data) => {
    const table = document.getElementById('finaces-table');


    data.map((item) => {
        const tableRow = document.createElement('tr');
        tableRow.classList = 'mt-small'

        const titleTd = document.createElement('td');
        const titleText = document.createTextNode(item.title);
        titleTd.appendChild(titleText);
        tableRow.appendChild(titleTd);

        const categoryTd = document.createElement('td');
        const categoryText = document.createTextNode(item.name);
        categoryTd.appendChild(categoryText);
        tableRow.appendChild(categoryTd);

        const dateTd = document.createElement('td');
        dateTd.classList = 'center'
        const dateText = document.createTextNode(new Date(item.date).toLocaleDateString());
        dateTd.appendChild(dateText);
        tableRow.appendChild(dateTd);

        const valueTd = document.createElement('td');
        valueTd.classList = 'center'
        const valueText = document.createTextNode(
            new Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL',
            }).format(item.value)
        );
        valueTd.appendChild(valueText);
        tableRow.appendChild(valueTd);

        const deleteTd = document.createElement('td');
        deleteTd.classList = 'right'
        const deleteText = document.createTextNode('Deletar');
        deleteTd.appendChild(deleteText);
        tableRow.appendChild(deleteTd);

        table.appendChild(tableRow)
    });
};

const renderFinacesElements = (data) => {
    const totalItems = data.length;
    const revenues = data
        .filter((item) => Number(item.value) > 0)
        .reduce((acc, item) => acc + Number(item.value), 0)
        ;

    const expenses = data
        .filter((item) => Number(item.value) < 0)
        .reduce((acc, item) => acc + Number(item.value), 0)
        ;

    const totalValue = revenues - (-expenses);

    const financeCard1 = document.getElementById('finace-card-1');
    const totalText = document.createTextNode(totalItems);
    const totalTextElement = document.createElement('h1');
    totalTextElement.classList = 'mt-smaller'
    totalTextElement.appendChild(totalText);
    financeCard1.appendChild(totalTextElement)


    const financeCard2 = document.getElementById('finace-card-2');
    const revenueText = document.createTextNode(
        new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(revenues)
    );
    const revenueTextElement = document.createElement('h1');
    revenueTextElement.classList = 'mt-smaller'
    revenueTextElement.appendChild(revenueText);
    financeCard2.appendChild(revenueTextElement);


    const financeCard3 = document.getElementById('finace-card-3');
    const expenceText = document.createTextNode(
        new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(expenses)
    );
    const expenceTextElement = document.createElement('h1');
    expenceTextElement.classList = 'mt-smaller'
    expenceTextElement.appendChild(expenceText);
    financeCard3.appendChild(expenceTextElement);


    const financeCard4 = document.getElementById('finace-card-4');
    const balanceText = document.createTextNode(
        new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(totalValue)
    );
    const balanceTextElement = document.createElement('h1');
    balanceTextElement.classList = 'mt-smaller';
    balanceTextElement.style.color = '#5936cd'
    balanceTextElement.appendChild(balanceText);
    financeCard4.appendChild(balanceTextElement);
}

const onLoadFinacessData = async () => {

    try {
        const date = '2022-12-15';
        const email = localStorage.getItem('@WalletApp:userEmail');
        const result = await fetch(`https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`, {
            method: 'GET',
            headers: {
                email: email,
            }
        });

        const data = await result.json();
        renderFinacesElements(data)
        renderFinacesList(data)
        return data;

    } catch (error) {
        return { error }
    }
}


const onLoadUserInfo = () => {

    const email = localStorage.getItem('@WalletApp:userEmail')
    const name = localStorage.getItem('@WalletApp:userName');

    const navbarUserInfo = document.getElementById('navbar-user-conteiner');
    const navbarUserAvatar = document.getElementById('navbar-user-avatar');

    const emailElement = document.createElement('p');
    const emailText = document.createTextNode(email);
    emailElement.appendChild(emailText);

    navbarUserInfo.appendChild(emailElement);

    const logoutElement = document.createElement('a');
    const logoutText = document.createTextNode('Sair');
    logoutElement.appendChild(logoutText);

    navbarUserInfo.appendChild(logoutElement)

    const nameElement = document.createElement('h3');
    const nameText = document.createTextNode(name.charAt(0));
    nameElement.appendChild(nameText);
    navbarUserAvatar.appendChild(nameElement)
}

window.onload = () => {
    const email = localStorage.getItem('@WalletApp:userEmail');
    onLoadUserInfo()
    onLoadFinacessData()
}