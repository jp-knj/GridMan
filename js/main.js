let minCol = document.querySelector('#itemWidth');
let gridColGap = document.querySelector('#gridColGap');
let gridRowGap = document.querySelector('#gridRowGap');
let unifyGap = document.querySelector('#unifyGap');
let gridWrapper = document.querySelector('.js-grid');

let breakPoint = document.querySelector('.flex-breakpoints-list');
let addBreakpointBtn = document.querySelector('#addBreakpoint');
let generateCSS = document.querySelector('#generateCSS');

let minColWidth = 200;
let gridColGapValue = 16;
let gridRowGapValue = 16;

let isUnify = false;

// Flexbox breakpoints
let flexBreakpoints = [];

let flexBreakpointsInfo = [];

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

addBreakpointBtn.addEventListener('click', function (e) {
  e.preventDefault();
  let breakpoint = addBreakpoint();
  breakPointsList.appendChild(breakpoint);
});

generateCSS.addEventListener('click', function (e) {
  e.preventDefault();

  getBreakpoints();

  console.log("Flex Breakpoints" + flexBreakpoints);

  console.log("Flex Breakpoints IDs" + flexBreakpointsInfo);

  let breakPointsList = [];

  let result1 = `
    @mixin grid() {
      display: flex;
      flex-wrap: wrap;

      @supports(grid-area: auto) {
        display: grid;
        grid-gap: ${gridColGapValue}px ${gridRowGapValue}px;
      }
    }

    @mixin gridAuto() {
      margin-left: -${gridColGapValue}px;
      > * {
        margin-bottom: ${gridRowGapValue}px;
        padding-left: ${gridColGapValue}px;
      }
    `;

  for (let i = 0; i < flexBreakpoints.length; i++) {
    let result2 = `
        @include mq($from: ${flexBreakpoints[i].breakpointFrom}px) {
          > * {
            width: calc(99%/ #{${flexBreakpoints[i].numOfItems}});
            flex: 0 0 calc(99% / #{${flexBreakpoints[i].numOfItems}});
          }
        }
      `;

    breakPointsList.push(result2);
  }

  let grid = `
    @supports(grid-area: auto) {
      grid-template-columns: repeat(auto-fit, minmax(${minColWidth}, 1fr));
      margin-left: 0;
      > * {
          width: auto;
          padding-left: 0;
          margin-bottom: 0;
      }
    }
  }`;

  console.log(result1 + "\n" + breakPointsList + "\n" + grid);
});

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

  flexBreakpointsInfo.push({
    firstInput: firstInput.getAttribute('id'),
    secondInput: secondInput.getAttribute('id')
  });

  return mainDiv;

}

function updateBreakpoints() {
  let listLength = breakPointsList.children.length;
  let breakpointsItem = document.querySelectorAll('.flex-breakpoints-item');

  for(let i = 0; i < listLength; i++) {
      let breakpointsTitle = breakpointsItem[i].querySelector('h3');
      breakpointsTitle.innerHTML = `Breakpoint ${i+1}`;

      let breakpointsFirstLabel = breakpointsItem[i].querySelector('.grid--2 > div:first-child label');
      let breakpointsFirstInput = breakpointsItem[i].querySelector('.grid--2 > div:first-child input');

      breakpointsFirstLabel.setAttribute("for", `fromWidth-${i+1}`);
      breakpointsFirstInput.setAttribute("id", `fromWidth-${i+1}`);

      let breakpointsSecondLabel = breakpointsItem[i].querySelector('.grid--2 > div:last-child label');
      let breakpointsSecondInput = breakpointsItem[i].querySelector('.grid--2 > div:last-child input');

      breakpointsSecondLabel.setAttribute("for", `itemsToShow-${i+1}`);
      breakpointsSecondInput.setAttribute("id", `itemsToShow-${i+1}`);
  }
}


function getBreakpoints() {
  for(let i = 0; i < flexBreakpointsInfo.length; i++) {
    let fromWidthID = flexBreakpointsInfo[i].firstInput;
    let numOfItemsID = flexBreakpointsInfo[i].secondInput;

    console.log(fromWidthID);
    console.log(numOfItemsID);

    let fromWidthValue = document.querySelector("#"+fromWidthID).value;
    let numOfItemsValue = document.querySelector("#"+numOfItemsID).value;

    flexBreakpoints.push({
      breakpointFrom: fromWidthValue,
      numOfItems: numOfItemsValue
    });
  }
}
