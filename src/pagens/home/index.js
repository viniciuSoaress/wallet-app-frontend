const onDeleteItem = async (id) => {
    try {
        const email = localStorage.getItem('@WalletApp:userEmail');
        await fetch(`https://mp-wallet-app-api.herokuapp.com/finances/${id}`, {
            method: 'DELETE',
            headers: {
                email: email,
            },
        })
        onLoadFinacessData();
    } catch (error) {
        alert('error ao deletar item.')
    }
}


const renderFinacesList = (data) => {
    const table = document.getElementById('finaces-table');
    table.innerHTML = '';

    const tableHeader = document.createElement('tr');


    const titleText = document.createTextNode('Titulo');
    const titleElement = document.createElement('th');
    titleElement.appendChild(titleText);
    tableHeader.appendChild(titleElement);

    const categoText = document.createTextNode('Categoria');
    const categoElement = document.createElement('th');
    categoElement.appendChild(categoText);
    tableHeader.appendChild(categoElement);

    const dateText = document.createTextNode('Data');
    const dateElement = document.createElement('th');
    dateElement.className = 'center'
    dateElement.appendChild(dateText);
    tableHeader.appendChild(dateElement);

    const valuerText = document.createTextNode('Valor');
    const valuerElement = document.createElement('th');
    valuerElement.className = 'center'
    valuerElement.appendChild(valuerText);
    tableHeader.appendChild(valuerElement);

    const actionText = document.createTextNode('Ação');
    const actionElement = document.createElement('th');
    actionElement.className = 'right'
    actionElement.appendChild(actionText);
    tableHeader.appendChild(actionElement);

    table.appendChild(tableHeader)

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
        deleteTd.onclick = () => onDeleteItem(item.id);
        deleteTd.style.cursor = 'pointer'
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
    financeCard1.innerHTML = '';

    const totalSubtext = document.createTextNode('Total de lançamentos');
    const totalSubtextElement = document.createElement('h3');
    totalSubtextElement.appendChild(totalSubtext);
    financeCard1.appendChild(totalSubtextElement)

    const totalText = document.createTextNode(totalItems);
    const totalTextElement = document.createElement('h1');
    totalTextElement.id = 'total-element'
    totalTextElement.classList = 'mt-smaller'
    totalTextElement.appendChild(totalText);
    financeCard1.appendChild(totalTextElement)


    const financeCard2 = document.getElementById('finace-card-2');
    financeCard2.innerHTML = '';

    const revenueSubtext = document.createTextNode('Receitas');
    const revenueSubtextElement = document.createElement('h3');
    revenueSubtextElement.appendChild(revenueSubtext);
    financeCard2.appendChild(revenueSubtextElement)

    const revenueText = document.createTextNode(
        new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(revenues)
    );
    const revenueTextElement = document.createElement('h1');
    revenueTextElement.id = 'revenue-element'
    revenueTextElement.classList = 'mt-smaller'
    revenueTextElement.appendChild(revenueText);
    financeCard2.appendChild(revenueTextElement);


    const financeCard3 = document.getElementById('finace-card-3');
    financeCard3.innerHTML = '';

    const expensesSubtext = document.createTextNode('Total de lançamentos');
    const expensesSubtextElement = document.createElement('h3');
    expensesSubtextElement.appendChild(expensesSubtext);
    financeCard3.appendChild(expensesSubtextElement)

    const expenceText = document.createTextNode(
        new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(expenses)
    );
    const expenceTextElement = document.createElement('h1');
    expenceTextElement.id = 'expenses-element'
    expenceTextElement.classList = 'mt-smaller'
    expenceTextElement.appendChild(expenceText);
    financeCard3.appendChild(expenceTextElement);


    const financeCard4 = document.getElementById('finace-card-4');
    financeCard4.innerHTML = '';


    const balancetextSub = document.createTextNode('Total de lançamentos');
    const balancetextSubElement = document.createElement('h3');
    balancetextSubElement.appendChild(balancetextSub);
    financeCard4.appendChild(balancetextSubElement)

    const balanceText = document.createTextNode(
        new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(totalValue)
    );
    const balanceTextElement = document.createElement('h1');
    balanceTextElement.id = 'balance-element'
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


const onLoadCategories = async () => {
    try {
        const categoriesSelect = document.getElementById('input-category');
        const response = await fetch('https://mp-wallet-app-api.herokuapp.com/categories');

        const categoriesResult = await response.json()
        categoriesResult.map((category) => {
            const option = document.createElement('option');
            const categoryText = document.createTextNode(category.name);
            option.id = `category_${category.id}`;
            option.value = category.id;
            option.appendChild(categoryText);
            categoriesSelect.appendChild(option);
        })
    } catch (erroe) {
        alert('error ao caregar')
    }
}


const onOpenModal = () => {
    const modal = document.getElementById('modal-backgroud');
    modal.style.display = 'flex'
}

const onCloseModal = () => {
    const modal = document.getElementById('modal-backgroud');
    modal.style.display = 'none'
}

const onCallAddFinace = async (data) => {

    try {

        const email = localStorage.getItem('@WalletApp:userEmail');

        const response = await fetch('https://mp-wallet-app-api.herokuapp.com/finances', {
            method: 'POST',
            mode: 'cors',
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
                email: email,
            },
            body: JSON.stringify(data),
        });

        const user = await response.json();
        return user;

    } catch (error) {
        return { error }
    }
}

const onCreateFinaceRelase = async (target) => {
    try {
        const title = target[0].value;
        const value = Number(target[1].value);
        const date = target[2].value;
        const category = Number(target[3].value);
        const result = await onCallAddFinace({
            title,
            value,
            date,
            category_id: category,
        });

        if (result.error) {
            ErrorEvent('errorao adicionar novo dado financeiro.');
            return
        }
        onCloseModal()
        onLoadFinacessData()

    } catch (error) {
        alert('error ao adicionar novo dado finaceiro.')
    }
}

window.onload = () => {
    const email = localStorage.getItem('@WalletApp:userEmail');
    onLoadUserInfo()
    onLoadFinacessData()
    onLoadCategories()

    const form = document.getElementById('form-cfinace-relase');
    form.onsubmit = (event) => {
        event.preventDefault();

        onCreateFinaceRelase(event.target);
    }
}