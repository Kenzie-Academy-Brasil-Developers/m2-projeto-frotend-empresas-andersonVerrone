export function createItemCompany(arrCompany, arrCategories) {

    arrCompany.forEach(element => {
        const itemsContainer = document.querySelector('.items__container');

        const item = document.createElement('li');
        itemsContainer.appendChild(item);
        item.classList.add('item');
        item.dataset.id = element.category_id;
        
        const title = document.createElement('p');
        item.appendChild(title);
        title.innerHTML = element.name;
        
        let categorie = '';
        
        for (let i = 0; i < arrCategories.length; i++) {
            if (arrCategories[i].id === element.category_id) {
                categorie = arrCategories[i].name;
            }
        }
        
        const chip = document.createElement('button');
        item.appendChild(chip);
        chip.classList.add('chip');
        chip.innerHTML = categorie;
    })
}