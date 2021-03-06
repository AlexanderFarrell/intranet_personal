import {ClientApp} from "../../core/client_app.js";
import {SwapContents} from "../../ui/view_helper.js";
import {ElementBuilder} from "../../ui/elements/element_builder.js";
import {ButtonBuilder} from "../../ui/elements/button_builder.js";
import {client} from "../../core/client_engine.js";

export class HomeApp extends ClientApp {
    constructor() {
        super("Home");
        this.Menu = []
    }

    OnStart() {
        let ele = new ElementBuilder()
            .withChildBuilder(new ElementBuilder('h1')
                .withInnerHtml('Home'))

        this.Menu.forEach(item => {
            ele.withChildBuilder(new ButtonBuilder(() => {
                client.start_app(item[0])
                console.log(`Running: ${client.ActiveApp.name} - Started: ${item[0]}`)
            })
                .withInnerHtml(item[0]))
        })

        SwapContents(
            document.body,
            ele.build()
        )
    }

    AddToMenu(name){
        this.Menu.push([name, client.get_app(name)])
    }
}