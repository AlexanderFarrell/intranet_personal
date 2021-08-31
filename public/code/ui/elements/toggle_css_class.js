import {BaseSwitcher} from "./base_switcher.js";

export class ToggleCssClass extends BaseSwitcher {
    constructor(startingElement, active, inactive, elements) {
        super(startingElement, elements, (element) => {
            try {
                element.classList.add(active)
                if (inactive != null) {
                    element.classList.remove(inactive)
                }
            } catch (e) {

            }

        }, (element) => {
            try {
                if (inactive != null) {
                    element.classList.add(inactive)
                }
                element.classList.remove(active)
            } catch (e) {

            }
        });
    }
}