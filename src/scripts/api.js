const url = 'http://localhost:3333';

export const allCategories = async () => {
    const route = '/categories/readAll';

    const res = await fetch(url + route);
    const response = await res.json();

    return response;
};

export const allCompanies = async () => {
    const route = '/companies/readAll';

    const res = await fetch(url + route);
    const response = await res.json();

    return response;
}

export const arrDepartmentByEmployee = async (deparmentID) => {
    const token = localStorage.getItem('@doit:token');

    const route = `/departments/readById/${deparmentID}`;

    const option = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await fetch(url + route,option);
    const response = await res.json();

    return response;
}

export const tokenFromApi = async (email, password) => {
    const data = {
        "email": email,
        "password": password
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const route = '/auth/login';

    try {
        const response = await fetch(url + route, options);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error('Usuário ou senha inválida!');
        }
    } catch (error) {
        console.log(error);
        makeToast('login', true);
        throw error;
    }
};

export const logIn = async (token) => {
    const route = '/employees/profile';

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token.authToken
        }
    };

    try {
        const response = await fetch(url + route, options);
        if (response.ok) {
            const result = await response.json();
            makeToast('login', false);
            localStorage.clear();
            setTimeout(() => {
                if (token.isAdm) {
                    localStorage.setItem('@doit:token', token.authToken);
                    window.location.replace('../pages/admin-page.html');
                } else {
                    localStorage.setItem('@doit:token', token.authToken);
                    localStorage.setItem('@doit:user', result.name);
                    localStorage.setItem('@doit:email', result.email);
                    localStorage.setItem('@doit:companyID', result.company_id);
                    localStorage.setItem('@doit:deparmentID', result.department_id);
                    window.location.replace('../pages/user-page.html');
                }
            }, 1100);

            return result;
        } else {
            throw new Error('Usuário ou senha inválida!');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const registerUser = async (name, email, password) => {
    const data = {
        "name": name,
        "email": email,
        "password": password
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const route = '/employees/create';

    try {
        const response = await fetch(url + route, options);
        if (response.ok) {
            const result = await response.json();
            makeToast('register', false);
            return result;
        } else {
            throw new Error('Usuário ou senha inválida!');
        }
    } catch (error) {
        console.log(error);
        makeToast('register', true);
        throw error;
    }

}

export const departmentsFromCompany = async (companyID) => {
    const token = localStorage.getItem('@doit:token');

    const route = `/departments/readByCompany/${companyID}`;

    const option = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await fetch(url + route, option);
    const response = await res.json();

    return response;
}

export const allUsers = async () => {
    const token = localStorage.getItem('@doit:token');

    const route = '/employees/readAll';

    const option = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await fetch(url + route, option);
    const response = await res.json();

    return response;
}

export const createDepartment = async (nameOfDepartment, descOfDepartment, company) => {
    if (nameOfDepartment !== '' && descOfDepartment !== '' && company !== '') {
        const token = localStorage.getItem('@doit:token');

        const data = {
            name: nameOfDepartment,
            description: descOfDepartment,
            company_id: company
        }

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(data)
        }

        const route = '/departments/create';

        try {
            const response = await fetch(url + route, option);
            if (response.ok) {
                const result = await response.json();
                makeToast('create', false);
                setTimeout(() => {
                    window.location.reload();
                }, 1005);
                return result;
            } else {
                throw new Error('Usuário ou senha inválida!');
            }
        } catch (error) {
            console.log(error);
            makeToast('create', true);
            throw error;
        }
    } else {
        makeToast('create', true);
    }
}

export const allUsersNoWork = async () => {
    const token = localStorage.getItem('@doit:token');

    const route = '/employees/outOfWork';

    const option = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const res = await fetch(url + route, option);
    const response = await res.json();

    return response;
}

export function makeToast(type, isError) {
    const toast = document.querySelector('.toast');
    const toastContainer = document.querySelector('.toast > div');
    const sonOfToast = document.querySelectorAll('.toast > div > *');

    if (sonOfToast.length > 0) {
        sonOfToast.forEach(element => element.remove());
    }

    if (type === 'login' && !isError) {
        toastContainer.classList.remove('error');
        toastContainer.classList.add('correct');

        const icon = document.createElement('i');
        toastContainer.appendChild(icon);
        icon.classList.add('fa-sharp', 'fa-solid', 'fa-circle-check');

        const text = document.createElement('p');
        toastContainer.appendChild(text);
        text.innerHTML = 'Login Realizado com Sucesso!'

        toast.showModal();
        setTimeout(() => {
            toast.close();
        }, 1000);
    } else if (type === 'login' && isError) {
        toastContainer.classList.remove('correct');
        toastContainer.classList.add('error');

        const icon = document.createElement('i');
        toastContainer.appendChild(icon);
        icon.classList.add('fa-solid', 'fa-triangle-exclamation');

        const text = document.createElement('p');
        toastContainer.appendChild(text);
        text.innerHTML = 'Usuario ou Senha incorreto!'

        toast.showModal();
        setTimeout(() => {
            toast.close();
        }, 2000);
    } else if (type === 'register' && !isError) {
        toastContainer.classList.remove('error');
        toastContainer.classList.add('correct');

        const icon = document.createElement('i');
        toastContainer.appendChild(icon);
        icon.classList.add('fa-sharp', 'fa-solid', 'fa-circle-check');

        const text = document.createElement('p');
        toastContainer.appendChild(text);
        text.innerHTML = 'Cadastro Realizado com Sucesso!'

        toast.showModal();

        setTimeout(() => {
            toast.close();
        }, 1000);
    } else if (type === 'register' && isError) {
        toastContainer.classList.remove('correct');
        toastContainer.classList.add('error');

        const icon = document.createElement('i');
        toastContainer.appendChild(icon);
        icon.classList.add('fa-solid', 'fa-triangle-exclamation');

        const text = document.createElement('p');
        toastContainer.appendChild(text);
        text.innerHTML = 'Erro ao cadastrar usuario!'

        toast.showModal();
        setTimeout(() => {
            toast.close();
        }, 2000);
    } else if (type === 'create' && !isError) {
        toastContainer.classList.remove('error');
        toastContainer.classList.add('correct');

        const icon = document.createElement('i');
        toastContainer.appendChild(icon);
        icon.classList.add('fa-sharp', 'fa-solid', 'fa-circle-check');

        const text = document.createElement('p');
        toastContainer.appendChild(text);
        text.innerHTML = 'Departamento criado com sucesso!'

        toast.showModal();

        setTimeout(() => {
            toast.close();
        }, 1000);
    } else if (type === 'register' && isError) {
        toastContainer.classList.remove('correct');
        toastContainer.classList.add('error');

        const icon = document.createElement('i');
        toastContainer.appendChild(icon);
        icon.classList.add('fa-solid', 'fa-triangle-exclamation');

        const text = document.createElement('p');
        toastContainer.appendChild(text);
        text.innerHTML = 'Erro ao criar departamento!'

        toast.showModal();
        setTimeout(() => {
            toast.close();
        }, 2000);
    }
}