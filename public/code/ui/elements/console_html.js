import {ElementBuilder} from "./element_builder.js";
import {BaseSwitcher} from "./base_switcher.js";



export class ConsoleHtml {
    constructor(builder=new ElementBuilder().withInnerHtml('&nbsp;')) {
        this.View = builder
        this._toggle = new BaseSwitcher(
            'ConsoleInfo',
            [],
            (klass) => {
                if (klass !== undefined){
                    this.View._element.classList.add(klass)
                }
        }, (klass) => {
                if (klass !== undefined){
                    this.View._element.classList.remove(klass)
                }
        })
    }

    Info(text){
        this._toggle.Switch('ConsoleInfo')
    }

    Warn(text) {
        this._toggle.Switch('ConsoleWarn')
    }

    Error(text) {
        this._toggle.Switch('ConsoleError')
    }
}
