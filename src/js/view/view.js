import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    renderSpinner = () => {
        const spinner = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div> `;
        this._parentElement.textContent = '';
        this._parentElement.insertAdjacentHTML("afterbegin", spinner);
    }

    hideSpinner = () => this._parentElement.textContent = '';

    showError = (errorMessage = this._errorMessage) => {
        const markup = ` <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMessage}</p>
      </div>`
        this._parentElement.textContent = '';
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
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
        this._parentElement.textContent = '';
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

}

