//let cols = document.querySelector('#columns');
let minCol = document.querySelector('#itemWidth');
let gridWrapper = document.querySelector('.js-grid');
//let numOfCols = cols.value;
let minColWidth = minCol.value;

minCol.addEventListener('input', function () {
    minColWidth = this.value;
    generateGridItems();
});

// cols.addEventListener('input', function () {
//     numOfCols = this.value;
//     generateGridItems();
// });

function generateGridItems() {
    gridWrapper.style.gridTemplateColumns = `repeat(auto-fill, minmax(${minColWidth}px, 1fr))`;
    console.log('Hello');
}

//console.log(numOfCols);
