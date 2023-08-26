import icons from 'url:../img/icons.svg';


const showSpinner = (targetElement) => {
    const spinner = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> 
    `
    targetElement.textContent = '';
    targetElement.insertAdjacentHTML("afterbegin", spinner);
}

const hideSpinner = (targetElement) => {
    const isSpinnerPresent = targetElement.querySelectorAll(":is(div).spinner").length;
    if (isSpinnerPresent) {
        targetElement.textContent = '';
    }
}


const showError = (errorMessage = 'Something went wrong',targetElement) => {
    const errorHtml = ` <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${errorMessage}</p>
  </div>`
  targetElement.insertAdjacentHTML("afterbegin", errorHtml);

}

module.exports = { showSpinner, hideSpinner ,showError}
