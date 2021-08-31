import {BaseSwitcher} from "./elements/base_switcher.js";

export function SwapContents(container, element){
    container.innerHTML = '';
    container.appendChild(element)
}

export function HideElement(element){
    element.style.visibility = 'hidden';
}

export function ShowElement(element){
    element.style.visibility = 'visible';
}

export function ToggleElement(element){
    if (element.style.visibility === 'hidden'){
        element.style.visibility = 'visible';
    } else {
        element.style.visibility = 'hidden';
    }
}

export class ToggleSwitcher extends BaseSwitcher {
    constructor(startingElement, elements) {
        super(startingElement, elements, ShowElement, HideElement);
    }
}

