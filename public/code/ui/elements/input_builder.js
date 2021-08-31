import {ElementBuilder} from "./element_builder.js";

export class TextInputBuilder extends ElementBuilder{
    constructor(placeholder = "") {
        super('input')
        this.setAttribute("type", "text");
        this.setAttribute("placeholder", placeholder);
        return this;
    }
}

export class NumberInputBuilder extends ElementBuilder {
    constructor(step = 1, initialValue=0) {
        super('input')
        this.setAttribute("type", "number");
        this.setAttribute("step", step);
        this._element.value = initialValue.toString()
        return this;
    }
}

export class PasswordInputBuilder extends ElementBuilder {
    constructor(placeholder='') {
        super('input')
        this.setAttribute("type", "password");
        this.setAttribute("placeholder", placeholder);
        return this;
    }
}
