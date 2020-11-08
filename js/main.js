let minCol = document.querySelector('#itemWidth');
let gridColGap = document.querySelector('#gridColGap');
let gridRowGap = document.querySelector('#gridRowGap');
let unifyGap = document.querySelector('#unifyGap');
let gridWrapper = document.querySelector('.js-grid');

let breakPointsList = document.querySelector('.flex-breakpoints-list');
let addBreakpointBtn = document.querySelector('#addBreakpoint');
let generateCSS = document.querySelector('#generateCSS');

let minColWidth = 200;
let gridColGapValue = 16;
let gridRowGapValue = 16;

let isUnify = false;

// Flexbox breakpoints
let flexBreakpoints = [];

let flexBreakpointsInfo = [];

// Add three breakpoints by default
for(let i = 0; i < 3; i++) {
  let breakpoint = addBreakpoint(i);
  let breakpointTitle = breakpoint.querySelector('h3');

  breakPointsList.appendChild(breakpoint);

  if(i === 0) {
      breakpointTitle.innerHTML = "Phone";
  }
  if(i === 1) {
      breakpointTitle.innerHTML = "Tablet";
  }
  if(i === 2) {
      breakpointTitle.innerHTML = "DeskTop";
  }
}

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
  gridColGapValue = 16;
  gridRowGapValue = 16;

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

  let breakPointsList = [];

  let result1 = `@mixin grid() {
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
          margin-left: ${gridColGapValue}px;
      }
  `;


  for(let i = 0; i < flexBreakpoints.length; i++) {
      if(flexBreakpoints[i].breakpointFrom != "") {
          let result2 = `
          @media (min-width: ${flexBreakpoints[i].breakpointFrom}px) {
              > * {
                  width: calc((99%/ #{${flexBreakpoints[i].numOfItems}}) - ${gridColGapValue}px);
                  flex: 0 0 calc((99% / #{${flexBreakpoints[i].numOfItems}}) - ${gridColGapValue}px);
              }
          }
              `;

          breakPointsList.push(result2);
      }
  }

  let grid = `
  @supports(grid-area: auto) {
      grid-template-columns: repeat(auto-fit, minmax(${minColWidth}px, 1fr));
      margin-left: 0;
      > * {
          width: auto;
          margin-left: 0;
          margin-bottom: 0;
      }
  }
}`;

  let resultModal = document.querySelector('#resultModal');
  let modalBody = document.querySelector('#modalBody');
  let resultCode = document.querySelector('#resultCode');
  let copyCSS = document.querySelector('#copyCSS');
  let closeModal = document.querySelector('#close');

  let code = result1 + "\n" + breakPointsList.join("\n") + "\n" + grid;

  resultCode.innerHTML = code;

  resultModal.classList.add('is-active');

  copyCSS.addEventListener('click', function(e){
      e.preventDefault();
      resultCode.select();
      document.execCommand("copy");
  });

  closeModal.addEventListener('click', function(e){
      e.preventDefault();
      resultModal.classList.remove('is-active');
  });

});

generateGridItems();

/********************** Functions ***********************/
function generateGridItems() {
  if(unifyGap.checked) {
    isUnify = true;
  } else {
    isUnify = false;
  }

  if(isUnify) {
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

  let prevCode = "display: grid \n" + "grid-template-columns: "+
  `repeat(auto-fit, minmax(<span>${minColWidth}px</span>, 1fr))` + "\n" + `grid-gap: <span>${gridRowGapValue}px ${gridColGapValue}px</span>;`;

    document.querySelector('#gridCodePreview').innerHTML = prevCode;

  gridWrapper.style.gridTemplateColumns = `repeat(auto-fit, minmax(${minColWidth}px, 1fr))`;
  gridWrapper.style.gridColumnGap = `${gridColGapValue}px`;
  gridWrapper.style.gridRowGap = `${gridRowGapValue}px`;
}

function addBreakpoint(defaultLength = 0) {
  let listLength = (defaultLength > 0) ? defaultLength : breakPointsList.children.length;

  let mainDiv = document.createElement('div');
  mainDiv.classList.add('flex-breakpoints-item');

  let deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = "remove";
  deleteBtn.setAttribute('aria-label', 'Remove Breakpoint');
  deleteBtn.addEventListener('click', function(e){
    e.preventDefault();
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);

    // Update the number, IDs of the breakpoints
    updateBreakpoints();

    let parentElm = e.target.parentNode;
    let parentLabel = parentElm.querySelector('.label');
    let labelFor = parentLabel.getAttribute('for');
    let index = parseInt(labelFor.replace(/[^0-9]/g, ''), 10);

    flexBreakpointsInfo.splice(index-1, 1);
      // Rename the array IDs to match the inputs
      renameFlexbreakpointsInfo(flexBreakpointsInfo.length);
      console.log(flexBreakpointsInfo);
  });

function renameFlexbreakpointsInfo(arrayLength) {
  flexBreakpointsInfo = [];

  console.log(arrayLength);

  for (var i = 0; i < arrayLength; i++) {
    flexBreakpointsInfo.push({
      firstInput: `fromWidth-${i+1}`,
      secondInput: `itemsToShow-${i+1}`
    });
  }
}

  let bpTitle = document.createElement('h3');
  bpTitle.innerHTML = `Breakpoint ${listLength+1}`;

  let gridDiv = document.createElement('div');
  gridDiv.classList.add('grid--2');

  let firstInputDiv = document.createElement('div');

  let firstInputLabel = document.createElement('label');
  firstInputLabel.classList.add('label');
  firstInputLabel.setAttribute('for', `fromWidth-${listLength+1}`);
  firstInputLabel.innerHTML = "幅から";

  let firstInput = document.createElement('input');
  firstInput.classList.add('input');
  firstInput.setAttribute('type', 'number');
  firstInput.setAttribute('id', `fromWidth-${listLength+1}`);
  firstInput.setAttribute('placeholder', 'e.g: 500px');
  firstInput.setAttribute('required', '');

  let secondInputDiv = document.createElement('div');

  let secondInputLabel = document.createElement('label');
  secondInputLabel.classList.add('label');
  secondInputLabel.setAttribute('for', `itemsToShow-${listLength+1}`);
  secondInputLabel.innerHTML = "Itemの数";

  let secondInput = document.createElement('input');
  secondInput.classList.add('input');
  secondInput.setAttribute('type', 'number');
  secondInput.setAttribute('id', `itemsToShow-${listLength+1}`);
  secondInput.setAttribute('placeholder', 'e.g: 3');
  secondInput.setAttribute('required', '');

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

  if (flexBreakpointsInfo.length > 0) {
    generateCSS.removeAttribute('disabled');
  }

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
      breakpointsSecondInput.setAttribute("id", `itemsToShow-${i + 1}`);

    }
}

function getBreakpoints() {

  console.log("Test:" + flexBreakpointsInfo.length);

  flexBreakpoints = [];

  for(let i = 0; i < flexBreakpointsInfo.length; i++) {
    let fromWidthID = flexBreakpointsInfo[i].firstInput;
    let numOfItemsID = flexBreakpointsInfo[i].secondInput;

    let fromWidthValue = document.querySelector("#"+fromWidthID).value;
    let numOfItemsValue = document.querySelector("#"+numOfItemsID).value;

    flexBreakpoints.push({
        breakpointFrom: fromWidthValue,
        numOfItems: numOfItemsValue
    });
  }
}
