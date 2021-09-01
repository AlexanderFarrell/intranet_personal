import {ElementBuilder} from "../../ui/elements/element_builder";
import {TextAreaInputBuilder, TextInputBuilder} from "../../ui/elements/input_builder";
import {ButtonBuilder} from "../../ui/elements/button_builder";

function RenderIdeaAdder(on_submit){
    let title_input = new TextInputBuilder();
    let content_input = new TextAreaInputBuilder();
    let on_press = () => {on_submit(title_input.value, content_input.value)}

    return new ElementBuilder()
        .withChildBuilder(new ElementBuilder('h5')
            .withInnerHtml("New"))
        .withChildBuilder(new ElementBuilder('label')
            .withInnerHtml("Title")
            .withChildElement(title_input))
        .withChildBuilder(new ElementBuilder('label')
            .withInnerHtml('Content')
            .withChildElement(content_input))
        .withChildBuilder(new ButtonBuilder(on_press)
            .withInnerHtml('Add'));
}
class AddScreen {
    constructor() {

    }

    Render(container) {
        container.appendChild(
            new ElementBuilder()
        )
    }
}