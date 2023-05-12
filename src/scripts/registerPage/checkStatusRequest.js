export function checkStatusRequested() {
    const status = localStorage.getItem('@doit:typeRedirection');
    const section = document.querySelector('.section__container');
    const loginContainer = document.querySelector('.login__container');
    const registerContainer = document.querySelector('.register__container');
    const input = document.querySelectorAll('input');

    if (status === 'login') {
        createMenuBtns(status);
        section.classList.remove('register');
        loginContainer.classList.remove('hidden');
        loginContainer.classList.add('show');
        registerContainer.classList.add('hidden');
        registerContainer.classList.remove('show');
        input.forEach(element => {
            element.value = '';
        })
    } else {
        createMenuBtns(status);
        section.classList.add('register');
        registerContainer.classList.remove('hidden');
        registerContainer.classList.add('show');
        loginContainer.classList.add('hidden');
        loginContainer.classList.remove('show');
        input.forEach(element => {
            element.value = '';
        })
    }
}

function createMenuBtns(type) {
    const btnContainer = document.querySelector('.nav__container');
    const sonOfBtnContainer = document.querySelectorAll('.nav__container > *')

    if (sonOfBtnContainer.length > 0) {
        sonOfBtnContainer.forEach(element => element.remove());
    }

    const firstBtn = document.createElement('button');
    btnContainer.appendChild(firstBtn);
    firstBtn.classList.add('btn-outlined','nav__btn__login');
    firstBtn.innerHTML = 'Home';

    firstBtn.addEventListener('click', () => {
        window.location.replace('../../index.html');
    });

    const secondBtn = document.createElement('button');
    btnContainer.appendChild(secondBtn);
    secondBtn.classList.add('btn--default','nav__btn__register');

    if (type === 'login') {
        secondBtn.innerHTML = 'Cadastro';
        secondBtn.addEventListener('click',() => {
            localStorage.setItem('@doit:typeRedirection','register');
            checkStatusRequested();
        })

    }else {
        secondBtn.innerHTML = 'Login';
        secondBtn.addEventListener('click',() => {
            localStorage.setItem('@doit:typeRedirection','login');
            checkStatusRequested();
        })
    }
}