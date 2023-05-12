import { allCompanies, allUsers, departmentsFromCompany , createDepartment, allUsersNoWork } from "../api.js";
import { fillSelect } from "../fillSelect.js";
import { removeItemArr } from "../removeItemfromArr.js";
import { createCardDepartment } from "./createDepartmentCard.js";
import { createCardUsers } from "./createUsersCard.js";
import { activeModalCreateDep } from "./modalCreateDep.js";

async function init() {
    const logout = document.querySelector('.nav__btn__logout');
    const select = document.querySelector('#select__container');
    const departmentsContainer = document.querySelector('.departments__list');
    const usersContainer = document.querySelector('.users__list');
    const emptyContainer = document.querySelector('.empty__container');
    const createBtn = document.querySelector('.btn__create');
    const modalCreate = document.querySelector('.modal__create');
    const modalEditDepartment = document.querySelector('.modal__edit');
    const selectModalCreateDep = document.querySelector('#modal__create--department');
    const url = 'http://localhost:3333';

    function activeLogout() {
        logout.addEventListener('click', () => {
            localStorage.clear();
            window.location.replace('../../../index.html');
        })
    }

    fillSelect(select, await allCompanies());

    function updateDepartmentsByCompany() {

        select.addEventListener('change', async () => {
            if (select.value !== '') {
                const id = select.value;

                const liContainer = document.querySelectorAll('.departments__list > *');
                removeItemArr(liContainer);
                
                createCardDepartment(
                    await departmentsFromCompany(id),
                    await allCompanies(),
                    await allUsersNoWork(),
                    fillSelect,
                    removeItemArr
                    );
                    
            } else {
                departmentsContainer.classList.add('hidden');
                emptyContainer.classList.remove('hidden');
            }
        })
    }
 
    activeLogout();
    updateDepartmentsByCompany();
    createCardUsers(
        await allUsers(),
        await allCompanies()
    );
    activeModalCreateDep(createDepartment);
    fillSelect(selectModalCreateDep, await allCompanies());
}

init();