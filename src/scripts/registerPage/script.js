import { logIn, makeToast, registerUser, tokenFromApi } from "../api.js";
import { checkStatusRequested } from "./checkStatusRequest.js";
import { activeRevealOrHidePassword } from "./eyePassword.js";

async function init() {
    const inputsLogin = document.querySelectorAll('.login__container input');
    const inputsRegister = document.querySelectorAll('.register__container input');
    const loginBtn = document.querySelector('.btn__login');
    const registerBtn = document.querySelector('.btn__register');

    checkStatusRequested();
    activeRevealOrHidePassword();
    

    function activeLoginBtn() {
        loginBtn.addEventListener('click', async () => {
            const user = inputsLogin[0].value;
            const password = inputsLogin[1].value;
            inputsLogin[0].value = '';
            inputsLogin[1].value = '';

            logIn(await tokenFromApi(user,password));
        })
    }

    

    function activeRegisterBtn() {
        registerBtn.addEventListener('click', () => {
            const user = inputsRegister[0].value;
            const email = inputsRegister[1].value;
            const password = inputsRegister[2].value;

            if (user === "" || email === "" || password === "") {
                makeToast('register',true);
                return
            }

            inputsRegister[0].value = '';
            inputsRegister[1].value = '';
            inputsRegister[2].value = '';

            registerUser(user, email, password);
        })
    }

    activeLoginBtn();
    activeRegisterBtn();
}

init();