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

// Algorithm for updating only the updated text of ui instead of entire ui
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }


}

