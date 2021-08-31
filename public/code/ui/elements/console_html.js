import {ElementBuilder} from "./element_builder.js";
import {BaseSwitcher} from "./base_switcher";



export class ConsoleHtml {
    constructor(builder=new ElementBuilder().withInnerHtml('&nbsp;')) {
        this.View = builder.build()
        this._toggle = new BaseSwitcher(
            'ConsoleInfo',
            [],
            (klass) => {
            this.View.classList.remove(klass)
        }, (klass) => {
            this.View.classList.add(klass)
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
