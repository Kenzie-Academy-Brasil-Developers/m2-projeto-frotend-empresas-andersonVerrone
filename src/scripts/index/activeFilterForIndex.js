export function activeFilter() {
    const select = document.querySelector('#sector__picker');

    select.addEventListener('click', () => {
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