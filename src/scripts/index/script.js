import { allCategories, allCompanies } from "../api.js";
import { fillSelect } from "../fillSelect.js";
import { createItemCompany} from "./createItemIndex.js";
import { activeFilter } from "./activeFilterForindex.js";

 async function init() {
    const select = document.querySelector('#sector__picker');
    const redirectionBtns =document.querySelectorAll('.nav__container > button');
    
    function activeButton() {
        const arrType = ['login','register'];
        redirectionBtns.forEach((element,i) => {
            element.addEventListener('click', () => {
                localStorage.setItem('@doit:typeRedirection',arrType[i]);
                window.location.replace('./src/pages/registerPage.html');
            })
        })
    }

    fillSelect(select,await allCategories());
    createItemCompany(await allCompanies(), await allCategories());
    activeFilter();
    activeButton();
}

init();