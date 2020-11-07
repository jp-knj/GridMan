//let cols = document.querySelector('#columns');
let minCol = document.querySelector('#itemWidth');
let gridColGap = document.querySelector('#gridColGap');
let gridRowGap = document.querySelector('#gridRowGap');
let unifyGap = document.querySelector('#unifyGap');
let gridWrapper = document.querySelector('.js-grid');

let breakPoint = document.querySelector('.flex-breakpoints-list');
let addBreanpoint = document.querySelector('#addBreakpoint');

let minColWidth = 200;
let gridColGapValue = 16;
let gridRowGapValue = 16;

let isUnify = false;

// Flexbox breakpoints
let flexBreakpoints = [
  {
      breakpointFrom: 768,
      numOfItems: 3
  },
  {
      breakpointFrom: 1080,
      numOfItems: 2
  }
];

console.log(flexBreakpoints);

// Asign default value for inputs
minCol.value = minColWidth;
gridColGap.value = gridColGapValue;
gridRowGap.value = gridRowGapValue;

minCol.addEventListener('input', function () {
  if(this.value < 0) {
      return;
  }
  minColWidth = this.value;
  generateGridItems();
});

gridColGap.addEventListener('input', function () {
  gridColGapValue = this.value;
  generateGridItems();
});

gridRowGap.addEventListener('input', function () {
  gridRowGapValue = this.value;
  generateGridItems();
});

unifyGap.addEventListener('input', function () {

  if (this.checked) {
    gridColGapValue = 20;
    gridRowGapValue = 20;

    gridColGap.value = gridColGapValue;
    gridRowGap.value = gridRowGapValue;

    isUnify = true;

    generateGridItems();

  } else {
    isUnify = false;
  }

});

addBreanpoint.addEventListener('click', function (e) {
  e.preventDefault();
  let breakpoint = addBreakpoint();
  breakPointsList.appendChild(breakpoint);
});

generateGridItems();

function generateGridItems() {

  if (isUnify) {

    // Get the current focused element
    let currentActiveElem = document.activeElement;

    if(currentActiveElem.getAttribute('id') == 'gridColGap') {
        gridRowGapValue = gridColGapValue;
    }

    if(currentActiveElem.getAttribute('id') == 'gridRowGap') {
        gridColGapValue = gridRowGapValue;
    }

    gridColGap.value = gridColGapValue;
    gridRowGap.value = gridRowGapValue;

  }

  gridWrapper.style.gridTemplateColumns = `repeat(auto-fit, minmax(${minColWidth}px, 1fr))`;
  gridWrapper.style.gridColumnGap = `${gridColGapValue}px`;
  gridWrapper.style.gridRowGap = `${gridRowGapValue}px`;

}


