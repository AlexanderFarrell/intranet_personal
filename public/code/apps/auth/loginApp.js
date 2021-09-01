import {ClientApp} from "../../core/client_app.js";
import {ElementBuilder} from "../../ui/elements/element_builder.js";
import {PasswordInputBuilder, TextInputBuilder} from "../../ui/elements/input_builder.js";
import {ConsoleHtml} from "../../ui/elements/console_html.js";
import {ButtonBuilder} from "../../ui/elements/button_builder.js";
import {post} from "../../api/api_helper.js";
import {SwapContents} from "../../ui/view_helper.js";

export class LoginApp extends ClientApp {
    constructor(onSuccess) {
        super('Login');
        this.OnSuccess = onSuccess;
    }

    OnStart() {
        let ele = new ElementBuilder()
            .withId('Login')
            .withChildBuilder(new ElementBuilder('h1')
                .withInnerHtml('Login to Intranet'))


        let username_label = new ElementBuilder('label')
            .withInnerHtml('Username')
        let username_input = new TextInputBuilder('')
            .withTabIndex(1)
            .build()
        username_label.withChildElement(username_input)


        let password_label = new ElementBuilder('label')
            .withInnerHtml('Password')
        let password_input = new PasswordInputBuilder()
            .withTabIndex(2)
            .build()
        password_label.withChildElement(password_input)


        let console_l = new ConsoleHtml()


        let back_button = new ButtonBuilder(() => {
            this.Stop()
        })
            .withInnerHtml('Back')
            .withTabIndex(4)

        let start_button = new ButtonBuilder(() => {
            post('/auth/login', {
                username: username_input.value,
                password: password_input.value
            })
                .then(response => {
                    if (response.ok) {
                        this.OnSuccess()
                    } else {
                        console_l.Error('Incorrect username or password')
                    }
                })
                .catch(err => {
                    console_l.Error("Cannot connect to server")
                    console.log(err)
                })
        })
            .withInnerHtml('Login')
            .withTabIndex(3)

        ele.withChildBuilder(username_label)
            .withChildBuilder(password_label)
            .withChildBuilder(console_l.View)
            .withChildBuilder(new ElementBuilder()
                .withRowFlexContainerCss()
                .withChildBuilder(back_button)
                .withChildBuilder(start_button)
            );
        SwapContents(document.body, ele.build())
    }

    OnEnd() {

    }
}