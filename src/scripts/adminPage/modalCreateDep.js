export function activeModalCreateDep(functionCreateDep) {

    openModalCreateDep();
    closeModalCreateDep();
    activeBtnOnModalCreate(functionCreateDep);
}

function openModalCreateDep() {
    const btn = document.querySelector('.btn__create');
    const modal = document.querySelector('.modal__create');

    btn.addEventListener('click', () => {
        modal.showModal();
    })
}

function closeModalCreateDep() {
    const btn = document.querySelector('.modal__create > div > .btn__close__modal');
    const modal = document.querySelector('.modal__create');

    btn.addEventListener('click', () => {
        modal.close();
    })
}

function activeBtnOnModalCreate(functionCreateDep) {
    const name = document.querySelector('.modal__create__name');
    const desc = document.querySelector('.modal__create__desc');
    const company = document.querySelector('#modal__create--department');
    const btn = document.querySelector('.modal__create > div > button');

    btn.addEventListener('click', async() => {
        functionCreateDep(name.value,desc.value,company.value);
    })
}