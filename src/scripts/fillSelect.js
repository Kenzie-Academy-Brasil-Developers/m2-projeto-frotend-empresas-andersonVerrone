export function fillSelect(address, arrValues) {
    arrValues.forEach(element => {
        const option = document.createElement('option');
        address.appendChild(option)
        option.innerHTML = element.name;
        option.value = element.id;
    });
}