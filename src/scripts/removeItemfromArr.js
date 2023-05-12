export function removeItemArr(arr) {
    arr.forEach(item => {
        item.remove();
    })
}