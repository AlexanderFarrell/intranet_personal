export class BaseSwitcher {
    constructor(starting_element, elements, activate, deactivate) {
        this.Elements = elements;
        this.Elements.forEach(element => {
            deactivate(element)
        })
        activate(starting_element)
        this.Active = starting_element

        this.ElementActivate = activate;
        this.ElementDeactivate = deactivate;
    }

    Switch(element) {
        this.ElementDeactivate(this.Active)
        this.Active = element;
        this.ElementActivate(element)
    }
}