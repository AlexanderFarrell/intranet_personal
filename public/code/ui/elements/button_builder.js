///Gets a div which can be used as a button!
import {ElementBuilder} from "./element_builder.js";

export class ButtonBuilder extends ElementBuilder {
    constructor(onPress) {
        super();
        this.withEvent('mouseup', onPress)
            .withEvent('touchend', onPress)
            .withEvent('keyup', ev => {
                if (ev.key === "Enter" || ev.key === ' ') {
                    onPress();
                }
            });
        return this;
    }
}
