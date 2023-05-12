export function createCardDepartment(arrElement, arrCompaniesName, arrUsersNoWork, functionFillSelect, functionRemove) {
    const ul = document.querySelector('.departments__list');
    const emptyContainer = document.querySelector('.empty__container');

    if (arrElement.length > 0) {
        ul.classList.remove('hidden');
        emptyContainer.classList.add('hidden');

        arrElement.forEach(element => {
            const li = document.createElement('li');
            ul.appendChild(li);
            li.classList.add('departments__item');

            const departmentContainer = document.createElement('div');
            li.appendChild(departmentContainer);

            const title = document.createElement('h3');
            departmentContainer.appendChild(title);
            title.innerHTML = element.name;

            const descText = document.createElement('p');
            departmentContainer.appendChild(descText);
            descText.innerHTML = element.description

            const nameCompany = document.createElement('p');
            departmentContainer.appendChild(nameCompany);

            let company = '';

            arrCompaniesName.forEach(obj => {
                if (obj.id === element.company_id) {
                    nameCompany.innerHTML = obj.name;
                    company = obj.name;
                }
            })

            const btnContainer = document.createElement('div');
            li.appendChild(btnContainer);

            const viewIcon = document.createElement('i');
            btnContainer.appendChild(viewIcon);
            viewIcon.classList.add('fa-regular', 'fa-eye');

            viewIcon.addEventListener('click', async() => {
                const select = document.querySelector('#select__modal__edit');
                const sonsOfSelect = select.querySelectorAll('option[value]:not([value=""])');
                functionRemove(sonsOfSelect);
                functionFillSelect(select, arrUsersNoWork);
                openViewModal();
                closeViewModal();
                activeBtnHire( hireDepartment, element.id );
                updateContractedEmployees( await employeesOfDepartment(element.id), arrCompaniesName, functionRemove);
                updateModalViewData(element.name, element.description, company);
            })

            const editIcon = document.createElement('i');
            btnContainer.appendChild(editIcon);
            editIcon.classList.add('fa-solid', 'fa-pencil');

            editIcon.addEventListener('click', () => {
                openEditModal(element.description);
                closeEditModal();
                activeBtnEdit(element.id, element.name);
            })

            const deleteIcon = document.createElement('i');
            btnContainer.appendChild(deleteIcon);
            deleteIcon.classList.add('fa-regular', 'fa-trash-can');

            deleteIcon.addEventListener('click', async () => {
                openDeleteModal(element.name);
                closeDeleteModal();
                activeBtnDelete(element.id, await employeesOfDepartment(element.id));
            })
        });

    } else {
        ul.classList.add('hidden');
        emptyContainer.classList.remove('hidden');
    }
}

function openViewModal() {
    const modal = document.querySelector('.modal__view');
    modal.showModal();
}

function updateModalViewData(name, desc, company) {
    const nameDepartment = document.querySelector('.modal__view > div > h2');
    const descDepartment = document.querySelector('.modal__view > div > h3');
    const nameCompany = document.querySelector('.modal__view > div > p');

    nameDepartment.innerHTML = name;
    descDepartment.innerHTML = desc;
    nameCompany.innerHTML = company;
}

function closeViewModal() {
    const modal = document.querySelector('.modal__view');
    const btnClose = document.querySelector('.modal__view > div > .btn__close__modal');
    btnClose.addEventListener('click', () => {
        modal.close();
    })
}

const employeesOfDepartment = async (idDepartment) => {
    const url = 'http://localhost:3333';
    const token = localStorage.getItem('@doit:token');

    const route = `/departments/readById/${idDepartment}`;

    const option = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await fetch(url + route, option);
    const response = await res.json();

    return response.employees;
}

function updateContractedEmployees( arrWorkers, arrCompany, functionRemove) {
    const list = document.querySelector('.list__container--edit');
    const sonsOfList = list.querySelectorAll('*');

    functionRemove(sonsOfList);

    createContractedCard( arrWorkers, arrCompany)
}

function createContractedCard( arrWorkers, arrCompany ) {
    if (arrWorkers.length > 0) {
        arrWorkers.forEach((element, i) => {
            const list = document.querySelector('.list__container--edit');

            const card = document.createElement('li');
            list.appendChild(card);
            card.classList.add('card--edit');

            const name = document.createElement('h3');
            card.appendChild(name);
            name.innerHTML = element.name;

            const company = document.createElement('p');
            card.appendChild(company);

            arrCompany.forEach(item => {
                if (item.id === element.company_id) {
                    company.innerHTML = item.name;
                }
            })

            const btn = document.createElement('button');
            card.appendChild(btn);
            btn.classList.add('btn--default');
            btn.innerHTML = 'Desligar';

            btn.addEventListener('click', async () => {
                await dismissEmployee(element.id);
            })
        });
    }
}

const hireDepartment = async (departmentID, userID) => {
    const url = 'http://localhost:3333';
    const token = localStorage.getItem('@doit:token');

    const route = `/employees/hireEmployee/${userID}`;

    const data = {
        "department_id": departmentID
      };

    const option = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(url + route, option);
        if (response.ok) {
            const result = await response.json();
            window.location.reload();
            return result;
        } else {
            throw new Error('Usuário ou senha inválida!');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function activeBtnHire( functionHire, departmentID ) {
    const hireBtn = document.querySelector('.modal__view > div > div > .btn-action1');

    hireBtn.addEventListener('click', async()=> {
        const select = document.querySelector('#select__modal__edit');
        await functionHire(departmentID, select.value);
    })
}

const dismissEmployee = async(userID) => {
    const url = 'http://localhost:3333';
    const token = localStorage.getItem('@doit:token');

    const route = `/employees/dismissEmployee/${userID}`;

    const option = {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    try {
        const response = await fetch(url + route, option);
        if (response.ok) {
            const result = await response.json();
            window.location.reload();
            return result;
        } else {
            throw new Error('Usuário ou senha inválida!');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function openEditModal(desc) {
    const modal = document.querySelector('.modal__edit--departments');
    const textArea = document.querySelector('.modal__edit--departments > div > textarea');

    modal.showModal();
    textArea.value = desc;
}

function closeEditModal() {
    const modal = document.querySelector('.modal__edit--departments');
    const btn = document.querySelector('.modal__edit--departments > div > p');

    btn.addEventListener('click', () => {
        modal.close();
    })
}

const editDepartment = async (depId, desc , name) => {
    const url = 'http://localhost:3333';
    const token = localStorage.getItem('@doit:token');

    const route = `/departments/update/${depId}`;

    const data = {
        "description": desc,
        "name": name
      };

    const option = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(url + route, option);
        if (response.ok) {
            const result = await response.json();
            window.location.reload();
            return result;
        } else {
            throw new Error('Usuário ou senha inválida!');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function activeBtnEdit(depId, name) {
    const btn = document.querySelector('.modal__edit--departments > div > .btn-action1');

    btn.addEventListener('click', async () => {
        const textArea = document.querySelector('.modal__edit--departments > div > textarea');
        await editDepartment(depId, textArea.value, name);
    })
}

function openDeleteModal(department) {
    const modal = document.querySelector('.modal__delete');
    const span = document.querySelector('.modal__delete > div > p > span');

    modal.showModal();
    span.innerHTML = department;
}

function closeDeleteModal() {
    const modal = document.querySelector('.modal__delete');
    const btn = document.querySelector('.modal__delete > div > .btn__close__modal');

    btn.addEventListener('click', () => {
        modal.close();
    })
}

const deleteDepartment = async (depID) => {
    const url = 'http://localhost:3333';
    const token = localStorage.getItem('@doit:token');

    const route = `/departments/delete/${depID}`;
    const option = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    try {
        const response = await fetch(url + route, option);
        if (response.ok) {
            const result = await response.json();
            // window.location.reload();
            return result;
        } else {
            throw new Error('erro ao deletar Usuario!');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function activeBtnDelete(deparmentID, arrEmployees) {
    const btn = document.querySelector('.modal__delete > div > .btn-action2');

    btn.addEventListener('click', async () => {
        arrEmployees.forEach(async element => {
            await dismissEmployee ( element.id );
        })
        await deleteDepartment(deparmentID);
    })
}