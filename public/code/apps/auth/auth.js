import {ClientApp} from "../../core/client_app.js";
import {SwapContents} from "../../ui/view_helper.js";
import {ElementBuilder} from "../../ui/elements/element_builder.js";
import {PasswordInputBuilder, TextInputBuilder} from "../../ui/elements/input_builder.js";
import {ConsoleHtml} from "../../ui/elements/console_html.js";
import {ButtonBuilder} from "../../ui/elements/button_builder.js";
import {post} from "../../api/api_helper.js";

//CreateApp

class CreateAccountApp extends ClientApp {
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
            if (password_input.value !== confirm_input.value){
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
                })
        })
            .withInnerHtml('Create')

        ele.withChildBuilder(username_label)
            .withChildBuilder(password_label)
            .withChildBuilder(confirm_label)
            .withChildElement(console_l.View)
            .withChildBuilder(new ElementBuilder()
                .withRowFlexContainerCss()
                .withChildBuilder(back_button)
                .withChildBuilder(start_button)
            );


        this.View = ele.build();
        SwapContents(document.body, this.View)
    }

}

class LoginApp extends ClientApp {
    constructor(onSuccess) {
        super('Login');
        this.OnSuccess = onSuccess
    }

    OnStart() {
        let ele = new ElementBuilder()
            .withId('Login')
            .withChildBuilder(new ElementBuilder('h1')
                .withInnerHtml('Login to Intranet'))


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


        let console_l = new ConsoleHtml()


        let back_button = new ButtonBuilder(() => {
            this.Stop()
        })
            .withInnerHtml('Back')

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
                })
        })
            .withInnerHtml('Login')

        ele.withChildBuilder(username_label)
            .withChildBuilder(password_label)
            .withChildElement(console_l.View)
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


class AuthApp extends ClientApp {
    constructor(onSuccess) {
        super('Auth');
        this.View = null
        this.OnSuccess = onSuccess
    }

    OnStart() {
        SwapContents(document.body,
            new ElementBuilder()
                .withId('Auth')
                .withChildBuilder(new ElementBuilder('h1')
                    .withInnerHtml('Welcome to the Intranet'))
                .withChildBuilder(new ElementBuilder()/*image goes here*/)

                .withChildBuilder(new ButtonBuilder(() => {
                    Create.Start()
                })
                    .withInnerHtml('Create'))
                .withChildBuilder(new ButtonBuilder(() => {
                    Login.Start()
                })
                .withInnerHtml('Login'))
                .build())
    }
}

export const Create = new CreateAccountApp()
export const Login = new LoginApp()
export const Auth = new AuthApp()