import View from "./view";


class AddRecipeView extends View {

    _overlay = document.querySelector('.overlay');
    _addModal = document.querySelector('.add-recipe-window');
    _closeBtn = document.querySelector('.btn--close-modal');
    _openBtn = document.querySelector('.nav__btn--add-recipe');
    _form = document.querySelector('.upload');

    constructor() {
        super()
        this._attachOpenHandler();
        this._attachCloseHandler();
    }

    _toggleModal() {
        this._overlay.classList.toggle('hidden');
        this._addModal.classList.toggle('hidden');

    }

    _attachOpenHandler() {
        this._openBtn.addEventListener('click', this._toggleModal.bind(this));
    }

    _attachCloseHandler() {
        this._closeBtn.addEventListener('click', this._toggleModal.bind(this));
        this._overlay.addEventListener('click', this._toggleModal.bind(this));
    }

    _formSubmit(formCallback){
        this._form.addEventListener('submit',function(e){
            e.preventDefault();
            
            const formDataArray = [...new FormData(this)];
            formCallback(Object.fromEntries(formDataArray));
        });
    }
    
    addHandler(formCallback){
       this._formSubmit(formCallback);
    }

}

export default new AddRecipeView()