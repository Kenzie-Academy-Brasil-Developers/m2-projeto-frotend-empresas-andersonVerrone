function init() {
    const section = document.querySelector('.section__container');
    const loginContainer = document.querySelector('.login__container');
    const registerContainer = document.querySelector('.register__container');
    const redirectionBtns = document.querySelectorAll('.nav__container > button');
    const backBtn = document.querySelector('.btn__back');
    const goToRegisterBtn = document.querySelector('.btn__to__register');
    const input = document.querySelectorAll('input');
    const passwordInput = document.querySelectorAll('.password__container > input');
    const passwordIcon = document.querySelectorAll('.password__container > i');
    const inputsLogin = document.querySelectorAll('.login__container input');
    const inputsRegister = document.querySelectorAll('.register__container input');
    const loginBtn = document.querySelector('.btn__login');
    const registerBtn = document.querySelector('.btn__register');
    const url = 'http://localhost:3333'

    function checkStatusRequested() {
        const status = localStorage.getItem('typeRedirection');

        if (status === 'login') {
            section.classList.remove('register');
            loginContainer.classList.remove('hidden');
            loginContainer.classList.add('show');
            registerContainer.classList.add('hidden');
            registerContainer.classList.remove('show');
            input.forEach(element => {
                element.value = '';
            })
        } else {
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

    function activeRedirectionBtns() {
        const arrType = ['login', 'register'];
        redirectionBtns.forEach((element, i) => {
            element.addEventListener('click', () => {
                localStorage.setItem('typeRedirection', arrType[i]);
                checkStatusRequested();
            })
        })
    }

    function activeBackBtn() {
        backBtn.addEventListener('click', () => {
            window.location.replace('../../index.html');
        })
    }

    function activeGoToRegister() {
        goToRegisterBtn.addEventListener('click', () => {
            localStorage.setItem('typeRedirection', 'register');
            checkStatusRequested();
        })
    }

    function activePasswordBtn() {
        passwordIcon.forEach((element, i) => {
            element.addEventListener('click', () => {
                if (passwordInput[i].type === 'password') {
                    element.classList.remove('fa-eye-slash');
                    element.classList.remove('fa-sharp');
                    element.classList.add('fa-eye');
                    passwordInput[i].type = 'text';
                } else {
                    element.classList.add('fa-eye-slash');
                    element.classList.add('fa-sharp');
                    element.classList.remove('fa-eye');
                    passwordInput[i].type = 'password';
                }
            })
        })
    }

    function activeLoginBtn() {
        loginBtn.addEventListener('click', () => {
            const user = inputsLogin[0].value;
            const password = inputsLogin[1].value;
            inputsLogin[0].value = '';
            inputsLogin[1].value = '';

            logIn(user, password);
        })
    }

    async function logIn(user, password) {
        const data = {
            "email": user,
            "password": password
        }

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const route = '/auth/login';

        fetch(url + route, options)
            .then(async (res) => {
                if (res.ok) {
                    const response = await res.json();
                    const token = response.authToken;
                    takeUser(token);

                } else {
                    throw new Error('Usuario não encontrado');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    async function takeUser(token) {
        const route = '/employees/profile';

        const options = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            }
        }

        fetch(url + route, options)
            .then(async (res) => {
                const response = await res.json();
                console.log(response);
                const name = response.name;
                const email = response.email;
                const isAdm = response.is_admin;

                localStorage.clear();
                localStorage.setItem('token',token);
                localStorage.setItem('name',name);
                localStorage.setItem('email',email);

                if ( isAdm ) {
                    window.location.replace('./src/pages/admin-page.html');
                } else {
                    window.location.replace('./src/pages/user-page.html');
                }
            })
    }

    function activeRegisterBtn() {
        registerBtn.addEventListener('click', () => {
            const user = inputsRegister[0].value;
            const email = inputsRegister[1].value;
            const password = inputsRegister[2].value;

            inputsRegister[0].value = '';
            inputsRegister[1].value = '';
            inputsRegister[2].value = '';

            register(user, email, password);
        })
    }

    async function register(user, email, password) {
        const data = {
            "name": user,
            "email": email,
            "password": password
        }

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const route = '/employees/create';

        fetch(url + route, options)
            .then(async (res) => {
                if (res.ok) {
                    const response = await res.json();
                    console.log(response);
                    localStorage.setItem('typeRedirection', 'login');
                    checkStatusRequested();
                } else {
                    throw new Error('Não foi possivel Cadastrar');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    checkStatusRequested();
    activeRedirectionBtns();
    activeBackBtn();
    activeGoToRegister();
    activePasswordBtn();
    activeLoginBtn();
    activeRegisterBtn();
}

init();