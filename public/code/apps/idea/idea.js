import {ElementBuilder} from "../../ui/elements/element_builder.js";
import {ContentApp, ContentBuilder, ContentKind} from "../../content/content_builder.js";
import {TextAreaInputBuilder, TextInputBuilder} from "../../ui/elements/input_builder";
import {ButtonBuilder} from "../../ui/elements/button_builder";

function RenderContent(){
    return new ElementBuilder()
        .withClass('ContentContainer')
        .build();
}

export class IdeaApp extends ContentApp {
    constructor() {
        super(new ContentBuilder('idea')
            .withProperty(
                'title',
                (title) => {return title},
                (title) => {
                    return new ElementBuilder('h2')
                        .withInnerHtml(title)
                }, (title) => {
                    return new TextInputBuilder()
                        .withInnerHtml(title)
                })
            .withProperty(
                'content',
                (content) => {return content},
                (content)=> {
                    return new ElementBuilder()
                        .withInnerHtml(content)
                },
                (content) => {
                    return new TextAreaInputBuilder()
                        .withInnerHtml(content)
                })
            .build())
    }

    OnStart() {

    }
}

