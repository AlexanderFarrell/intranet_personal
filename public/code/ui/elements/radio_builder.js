import {ElementBuilder} from "./element_builder.js";

export class RadioBuilder extends ElementBuilder{
    constructor(name) {
        super()
        this.withClass('RadioContainer')
        this.name = name;
        return this;
    }
    withOption(value, text) {
        let subContainer = new ElementBuilder()
            .withClass('RadioValueContainer')
            .build();

        subContainer.appendChild(
            new ElementBuilder('input')
                .withAttribute('type', 'radio')
                .withAttribute('name', this.name)
                .withAttribute('value', value)
                .withClass('RadioOption')
                .build()
        )
        subContainer.appendChild(
            new ElementBuilder('label')
                .withInnerHtml(text)
                .withClass('RadioLabel')
                .build()
        )
        this._element.appendChild(subContainer);
        return this;
    }
}