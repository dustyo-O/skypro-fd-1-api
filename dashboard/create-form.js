class CreateForm {
    constructor(element, handleData) {
        this.htmlElement = element;
        this.handleData = handleData;

        this.onSubmit = this.onSubmit.bind(this);

        this.htmlElement.addEventListener('submit', this.onSubmit);
    }

    onSubmit(event) {
        event.preventDefault();
        const result = {};
        this.htmlElement.querySelectorAll('.create-form__input').forEach((input) => {
            const key = input.name;

            const value = input.value;

            result[key] = value;
        });

        this.handleData(result);
    }
}
