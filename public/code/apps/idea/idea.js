import {ClientApp} from "../../core/client_app.js";
import {ElementBuilder} from "../../ui/elements/element_builder";
import {TextAreaInputBuilder, TextInputBuilder} from "../../ui/elements/input_builder";
import {ButtonBuilder} from "../../ui/elements/button_builder";

function LimitString(str, amo){
    if (str.length > amo){
        return str.slice(0, amo) + '...'
    } else {
        return str
    }
}

function RenderIdea(idea){
    return new ElementBuilder()
        .withChildBuilder(new ElementBuilder('h3')
            .withInnerHtml(idea.title))
        .withChildBuilder(new ElementBuilder('p')
            .withInnerHtml(idea.content) /*add date*/)
        .withClass('Idea');
}

function RenderIdeaLite(){
    return new ElementBuilder()
        .withChildBuilder(new ElementBuilder('h4')
            .withInnerHtml(idea.title))
        .withChildBuilder(new ElementBuilder('p')
            .withInnerHtml(LimitString(idea.content, 50)) /*add date*/)
        .withClass('Idea');
}

function RenderIdeaAdder(on_submit){
    let title_input = new TextInputBuilder();
    let content_input = new TextAreaInputBuilder();
    let e = () => {on_submit(title_input.value, content_input.value)
    }

    return new ElementBuilder()
        .withChildBuilder(new ElementBuilder('h5')
            .withInnerHtml("New"))
        .withChildBuilder(new ElementBuilder('label')
            .withInnerHtml("Title")
            .withChildElement(title_input))
        .withChildBuilder(new ElementBuilder('label')
            .withInnerHtml('Content')
            .withChildElement(content_input))
        .withChildBuilder(new ButtonBuilder(() => ))
}

function RenderSearch(){

}

function RenderScreen(){

}

export class IdeaApp extends ClientApp {
    constructor() {
        super('Idea');
    }

    OnStart() {

    }
}