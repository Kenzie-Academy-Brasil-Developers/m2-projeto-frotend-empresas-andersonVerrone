import { allCompanies, arrDepartmentByEmployee} from "../api.js";

async function init() {
    const logout = document.querySelector('.nav__btn__logout');
    const departmentID = localStorage.getItem('@doit:deparmentID');

    function activeLogout() {
        logout.addEventListener('click', () => {
            localStorage.clear();
            window.location.replace('../../../index.html');
        })
    }

    function updateData(arrCompanies, arrDepartment) {
        const name = localStorage.getItem('@doit:user');
        const email = localStorage.getItem('@doit:email');
        const company = localStorage.getItem('@doit:companyID');
        const department = localStorage.getItem('@doit:deparmentID');

        const nameBox = document.querySelector('.user__container > h2');
        const emailBox = document.querySelector('.user__container > p');
        const topContainer = document.querySelector('.top__container > p')
        const emptyContainer = document.querySelector('.empty__container');
        const employeeContainer =document.querySelector('.employee__container');

        nameBox.innerHTML = name;
        emailBox.innerHTML = email;

        if (company === null && department === null) {
            emptyContainer.classList.remove('hidden');
            employeeContainer.classList.add('hidden');
        } else {
            emptyContainer.classList.add('hidden');
            employeeContainer.classList.remove('hidden');

            let companyName ='';

            arrCompanies.forEach(element => {
                if (element.id === company) {
                    companyName = element.name;
                }
            });

            let deparmentName = arrDepartment.name;

            topContainer.innerHTML = `${companyName} - ${deparmentName}`;

            const employeeArr = arrDepartment.employees;

            createCard(employeeArr);
        }
    }

    function createCard(arr) {
        const ul = document.querySelector('.list__container');
        arr.forEach(element => {
            const li = document.createElement('li');
            ul.appendChild(li);
            li.classList.add('card__container')

            const name = document.createElement('p');
            li.appendChild(name);
            name.innerHTML = element.name;
        })
    }

    activeLogout();
    updateData(await allCompanies(), await arrDepartmentByEmployee(departmentID));
}

init();