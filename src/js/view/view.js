import icons from 'url:../../img/icons.svg';

export default class View {
  _data;


  clearingAndInserting(html) {
    this.clearInput();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  clearInput(){
    this._parentElement.textContent = '';
  }

  hideSpinner() {
    const isSpinnerPresent = this._parentElement.querySelectorAll(":is(div).spinner").length;
    if (isSpinnerPresent) {
      this._parentElement.textContent = '';
    }
  }
  renderSpinner = () => {
    const spinner = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div> `;
    this.clearingAndInserting(spinner);
  }

  showError = (errorMessage = this._errorMessage) => {
    const markup = ` <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMessage}</p>
      </div>`
    this.clearingAndInserting(markup);
  }

  showSuccess(succesMessage = this._succesMessage) {
    const markup = `
        <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>
         ${succesMessage}
        </p>
      </div>`
    this.clearingAndInserting(markup);
  }




}

