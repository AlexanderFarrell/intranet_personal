import {ElementBuilder} from "./element_builder.js";
import {TextInputBuilder} from "./input_builder.js";
import {ButtonBuilder} from "./button_builder.js";

export class SearchBarBuilder extends ElementBuilder {
    constructor(onSearch) {
        super();
        this.withCss('display', 'grid')
        this.withCss('grid-template-columns', '3fr 1fr')
        let search_text = new TextInputBuilder('Search...');
        this.withChildBuilder(new ElementBuilder('label')
            ///.withInnerHtml('Search')
            .withChildBuilder(search_text)
        )
            .withChildBuilder(new ButtonBuilder(
                () => {
                    onSearch(search_text.value)
                }
            )
                .withInnerHtml('Search'))
        return this;
    }
}