import {ClientApp} from "../../core/client_app.js";
import {client} from "../../core/client_engine.js";
import {SwapContents} from "../../ui/view_helper.js";
import {ElementBuilder} from "../../ui/elements/element_builder.js";
import {ButtonBuilder} from "../../ui/elements/button_builder.js";
import {LoginApp} from "./loginApp.js";
import {CreateAccountApp} from "./createAccountApp.js";

export class AuthApp extends ClientApp {
    constructor(onSuccess) {
        super('Auth');
        this.View = null
        this.OnSuccess = onSuccess

        client.load_apps(
            new LoginApp(onSuccess),
            new CreateAccountApp(onSuccess)
        )
    }

    OnStart() {
        SwapContents(document.body,
            new ElementBuilder()
                .withId('Auth')
                .withChildBuilder(new ElementBuilder('h1')
                    .withInnerHtml('Welcome to the Intranet'))
                .withChildBuilder(new ElementBuilder()/*image goes here*/)

                .withChildBuilder(new ButtonBuilder(() => {
                    client.Apps.get('Create').Start()
                })
                    .withInnerHtml('Create'))
                .withChildBuilder(new ButtonBuilder(() => {
                    client.Apps.get('Login').Start()
                })
                    .withInnerHtml('Login'))
                .build())
    }
}