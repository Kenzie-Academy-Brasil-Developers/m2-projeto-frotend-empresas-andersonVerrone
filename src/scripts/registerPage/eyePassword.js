export function activeRevealOrHidePassword() {
    const passwordIcon = document.querySelectorAll('.password__container > i');
    const passwordInput = document.querySelectorAll('.password__container > input');
    passwordIcon.forEach((element,i) => {
        element.addEventListener('click',() => {
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