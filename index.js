const onClickLogin = () => {
    const email = document.getElementById('input-email').value;
    if(email.length < 5 && !email.includes('@')){
        alert("E-mail não e valido");
        return;
    }
    localStorage.setItem('@WalletApp:userEmail', email);
    window.open('./src/pagens/home/index.html', '_self');
};