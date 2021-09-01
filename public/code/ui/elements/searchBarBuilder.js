import {ElementBuilder} from "./element_builder";
import {TextInputBuilder} from "./input_builder";
import {ButtonBuilder} from "./button_builder";

class SearchBarBuilder extends ElementBuilder {
    constructor(onSearch) {
        super();
        let search_text = new TextInputBuilder();
        this.withChildBuilder(new ElementBuilder('label')
            .withInnerHtml('Search')
            .withChildBuilder(search_text)
        )
            .withChildBuilder(new ButtonBuilder(
                onSearch(search_text.value)
            )
                .withInnerHtml('Search'))
    }
}