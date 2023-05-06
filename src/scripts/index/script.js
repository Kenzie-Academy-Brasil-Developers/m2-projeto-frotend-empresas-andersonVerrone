function init() {
    const select = document.querySelector('#sector__picker');
    const itemsContainer = document.querySelector('.items__container');
    const redirectionBtns =document.querySelectorAll('.nav__container > button');
    const url = 'http://localhost:3333';
    let categoryID = [];

    async function checkCategories() {
        const route = '/categories/readAll';

        fetch(url+route)
            .then(async(res) => {
                const result = await res.json();
                createOptionOfSelect(result);
            })
    }

    function createOptionOfSelect(arr) {
        arr.forEach(element => {
            categoryID.push(element)
            const option = document.createElement('option');
            select.appendChild(option)
            option.innerHTML = element.name;
            option.value = element.id;
        });
    }
 
    async function checkCompany() {
        const route = '/companies/readAll';
        
        fetch(url+route)
        .then(async(res) => {
            const result = await res.json();
            createItemCompany(result);
        })
    }
    
    function createItemCompany(arr) {
        arr.forEach(element => {
            const item = document.createElement('li');
            itemsContainer.appendChild(item);
            item.classList.add('item');
            item.dataset.id = element.category_id;
            
            const title = document.createElement('p');
            item.appendChild(title);
            title.innerHTML = element.name;
            
            let categorie = '';
            
            for (let i = 0; i < categoryID.length; i++) {
                if (categoryID[i].id === element.category_id) {
                    categorie = categoryID[i].name;
                }
            }
            
            const chip = document.createElement('button');
            item.appendChild(chip);
            chip.classList.add('chip');
            chip.innerHTML = categorie;
        })
    }

    function activeSelect() {
        select.addEventListener('change', () => {
            const id = select.value;
            const items = document.querySelectorAll('.item');
            const itemCompany = document.querySelectorAll(`[data-id="${id}"]`);

            if (id === '') {
                items.forEach(element => {
                    element.classList.remove('hidden');
                })
            } else {
                items.forEach(element => {
                    element.classList.add('hidden');
                })
                itemCompany.forEach(element => {
                    element.classList.remove('hidden');
                })
            }
        })
    }

    function activeButton() {
        const arrType = ['login','register'];
        redirectionBtns.forEach((element,i) => {
            element.addEventListener('click', () => {
                localStorage.setItem('typeRedirection',arrType[i]);
                window.location.replace('./src/pages/registerPage.html');
            })
        })
    }
    
    checkCategories();
    checkCompany();
    activeSelect();
    activeButton();
}

init();