import {ClientApp} from "../../core/client_app.js";
import {ElementBuilder} from "../../ui/elements/element_builder.js";
import {PasswordInputBuilder, TextInputBuilder} from "../../ui/elements/input_builder.js";
import {ConsoleHtml} from "../../ui/elements/console_html.js";
import {ButtonBuilder} from "../../ui/elements/button_builder.js";
import {post} from "../../api/api_helper.js";
import {SwapContents} from "../../ui/view_helper.js";

export class CreateAccountApp extends ClientApp {
    constructor(onSuccess) {
        super('Create Account');
        this.OnSuccess = onSuccess
    }

    OnStart() {
        let ele = new ElementBuilder()
            .withId('CreateAccount')
            .withChildBuilder(new ElementBuilder('h1')
                .withInnerHtml('Create Account'))


        let username_label = new ElementBuilder('label')
            .withInnerHtml('Username')
        let username_input = new TextInputBuilder('')
            .build()
        username_label.withChildElement(username_input)


        let password_label = new ElementBuilder('label')
            .withInnerHtml('Password')
        let password_input = new PasswordInputBuilder()
            .build()
        password_label.withChildElement(password_input)


        let confirm_label = new ElementBuilder('label')
            .withInnerHtml('Confirm Password')
        let confirm_input = new PasswordInputBuilder()
            .build()
        confirm_label.withChildElement(confirm_input)


        let console_l = new ConsoleHtml()


        let back_button = new ButtonBuilder(() => {
            this.Stop()
        })
            .withInnerHtml("Back")

        let start_button = new ButtonBuilder(() => {
            if (password_input.value !== confirm_input.value) {
                console_l.Error("Passwords must match")
                return;
            }

            post('/auth/create', {
                username: username_input.value,
                password: password_input.value
            })
                .then(response => {
                    if (response.ok) {
                        this.OnSuccess()
                    } else {
                        console_l.Error('Error creating account.')
                    }
                })
                .catch(err => {
                    console_l.Error("Cannot connect to server. Account not created.")
                    console.log(err)
                })
        })
            .withInnerHtml('Create')

        ele.withChildBuilder(username_label)
            .withChildBuilder(password_label)
            .withChildBuilder(confirm_label)
            .withChildBuilder(console_l.View)
            .withChildBuilder(new ElementBuilder()
                .withRowFlexContainerCss()
                .withChildBuilder(back_button)
                .withChildBuilder(start_button)
            );


        this.View = ele.build();
        SwapContents(document.body, this.View)
    }

}