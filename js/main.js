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

/********************** Functions ***********************/
function generateGridItems() {

  if (unifyGap.checked) {
    isUnify = true;
  } else {
    isUnify = false;
  }

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

function addBreakpoint() {

  let listLength = breakPointsList.children.length;

  let mainDiv = document.createElement('div');
  mainDiv.classList.add('flex-breakpoints-item');

  let deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = "remove";

  let bpTitle = document.createElement('h3');
  bpTitle.innerHTML = `Breakpoint ${listLength+1}`;

  let gridDiv = document.createElement('div');
  gridDiv.classList.add('grid--2');

  let firstInputDiv = document.createElement('div');

  let firstInputLabel = document.createElement('label');
  firstInputLabel.classList.add('label');
  firstInputLabel.setAttribute('for', `fromWidth-${listLength+1}`);
  firstInputLabel.innerHTML = "From Width";

  let firstInput = document.createElement('input');
  firstInput.classList.add('input');
  firstInput.setAttribute('type', 'number');
  firstInput.setAttribute('id', `fromWidth-${listLength+1}`);
  firstInput.setAttribute('placeholder', 'e.g: 500px');

  let secondInputDiv = document.createElement('div');

  let secondInputLabel = document.createElement('label');
  secondInputLabel.classList.add('label');
  secondInputLabel.setAttribute('for', `itemsToShow-${listLength+1}`);
  secondInputLabel.innerHTML = "Number of items";

  let secondInput = document.createElement('input');
  secondInput.classList.add('input');
  secondInput.setAttribute('type', 'number');
  secondInput.setAttribute('id', `itemsToShow-${listLength+1}`);
  secondInput.setAttribute('placeholder', 'e.g: 3');

  firstInputDiv.appendChild(firstInputLabel);
  firstInputDiv.appendChild(firstInput);

  secondInputDiv.appendChild(secondInputLabel);
  secondInputDiv.appendChild(secondInput);

  gridDiv.appendChild(firstInputDiv);
  gridDiv.appendChild(secondInputDiv);

  mainDiv.appendChild(deleteBtn);
  mainDiv.appendChild(bpTitle);
  mainDiv.appendChild(gridDiv);

  return mainDiv;

}
