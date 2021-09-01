import {ElementBuilder} from "../../ui/elements/element_builder";

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