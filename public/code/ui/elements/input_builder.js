import {ElementBuilder} from "./element_builder.js";

export class TextInputBuilder extends ElementBuilder{
    constructor(placeholder = "") {
        super('input');
        this.withAttribute("type", "text")
            .withAttribute("placeholder", placeholder);
        return this;
    }
}

export class NumberInputBuilder extends ElementBuilder {
    constructor(step = 1, initialValue=0) {
        super('input')
        this.withAttribute("type", "number");
        this.withAttribute("step", step);
        this._element.value = initialValue.toString()
        return this;
    }
}

export class PasswordInputBuilder extends ElementBuilder {
    constructor(placeholder='') {
        super('input')
        this.withAttribute("type", "password");
        this.withAttribute("placeholder", placeholder);
        return this;
    }
}
