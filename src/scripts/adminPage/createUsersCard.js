export function createCardUsers(arrUsers, arrCompaniesName) {

    arrUsers.forEach(item => {
        const ul = document.querySelector('.users__list');
    
        const li = document.createElement('li');
        ul.appendChild(li);
        li.classList.add('user__item');
    
        const userDataContainer = document.createElement('div');
        li.appendChild(userDataContainer);
    
        const name = document.createElement('h3');
        userDataContainer.appendChild(name);
        name.innerHTML = item.name;
    
        const company = document.createElement('p');
        userDataContainer.appendChild(company);
    
        arrCompaniesName.forEach(element => {
            if (element.id === item.company_id) {
                company.innerHTML = element.name;
            }
        })
    
        const btnContainer = document.createElement('div');
        li.appendChild(btnContainer);
    
        const editIcon = document.createElement('i');
        btnContainer.appendChild(editIcon);
        editIcon.classList.add('fa-solid', 'fa-pencil');

        editIcon.addEventListener('click', () => {
            openEditUserModal(item.name,item.email);
            closeEditUserModal();
            activeBtnEditUser(item.id);
        })
    
        const deleteIcon = document.createElement('i');
        btnContainer.appendChild(deleteIcon);
        deleteIcon.classList.add('fa-regular', 'fa-trash-can');

        deleteIcon.addEventListener('click',()=>{
            openDeleteUserModal(item.name);
            closeDeleteUserModal();
            activeBtnDeleteUser(item.id);
        })
    })
}

function openEditUserModal(name,email) {
    const modal = document.querySelector('.modal__edit--user');
    const inputs = document.querySelectorAll('.modal__edit--user > div > input');

    modal.showModal();
    inputs[0].value = name;
    inputs[1].value = email;
}

function closeEditUserModal() {
    const modal = document.querySelector('.modal__edit--user');
    const btn = document.querySelector('.modal__edit--user > div > p');

    btn.addEventListener('click', () => {
        modal.close();
    })
}

const editUser = async (employeeID,name,email) => {
    const url = 'http://localhost:3333';
    const token = localStorage.getItem('@doit:token');

    const route = `/employees/updateEmployee/${employeeID}`;

    const data = {
        "name": name,
        "email": email
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
            throw new Error('Erro ao atualizar Usuario!');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function activeBtnEditUser(employeeID) {
    const btn = document.querySelector('.modal__edit--user > div > .btn-action1');

    btn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.modal__edit--user > div > input');

        editUser(employeeID,inputs[0].value,inputs[1].value);
    })
}

function openDeleteUserModal(name) {
    const modal = document.querySelector('.modal__delete--user');
    const span = document.querySelector('.modal__delete--user > div > p > span');

    span.innerHTML = `${name}?`;
    modal.showModal();
}

function closeDeleteUserModal() {
    const modal = document.querySelector('.modal__delete--user');
    const btn = document.querySelector('.modal__delete--user > div > .btn__close__modal');

    btn.addEventListener('click', () => {
        modal.close();
    })
}

const deleteUser = async(userID) => {
    const url = 'http://localhost:3333';
    const token = localStorage.getItem('@doit:token');

    const route = `/employees/deleteEmployee/${userID}`;
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
            window.location.reload();
            return result;
        } else {
            throw new Error('erro ao deletar Usuario!');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function activeBtnDeleteUser (userID) {
    const btn = document.querySelector('.modal__delete--user > div > .btn-action2');

    btn.addEventListener('click',() => {
        deleteUser(userID);
    })
}