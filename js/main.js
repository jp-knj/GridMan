//let cols = document.querySelector('#columns');
let minCol = document.querySelector('#itemWidth');
let gridColGap = document.querySelector('#gridColGap');
let gridRowGap = document.querySelector('#gridRowGap');
let unifyGap = document.querySelector('#unifyGap');
let gridWrapper = document.querySelector('.js-grid');

let minColWidth = 200;
let gridColGapValue = 16;
let gridRowGapValue = 16;

let isUnify = false;

minCol.addEventListener('input', function () {

  if (this.value < 0) {
    return;
  }

  minColWidth = this.value;
  generateGridItems();

});

gridColGap.addEventListener('input', function () {

  gridColGapValue = this.value;
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
  }
});

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


