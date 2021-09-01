import {ElementBuilder} from "./element_builder.js";
import {ButtonBuilder} from "./button_builder.js";

class NavBuilder extends ElementBuilder {
    constructor() {
        super();
        this.withClass('Nav')
            .withRowFlexContainerCss();
        return this;
    }

    add(name, on){
        this.withChildBuilder(new ButtonBuilder(on)
            .withInnerHtml(name));
        return this;
    }
}