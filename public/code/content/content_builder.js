import {ContentApi} from "./content_api.js";
import {ElementBuilder} from "../ui/elements/element_builder.js";
import {ButtonBuilder} from "../ui/elements/button_builder.js";
import {ContentKind} from "./content_kind.js";

export const content = new Map()

export class ContentBuilder {
    constructor(name) {
        this.Name = name.toLowerCase();
        this.Api = new ContentApi(name);
        this.Properties = new Map();
        return this;
    }

    withProperty(name, setter, viewFactory, editViewFactory){
        this.Properties.set(name, {
            Setter: setter,
            CreateView: viewFactory,
            CreateEditView: editViewFactory
        })
        return this;
    }

    build(viewFactory=defaultViewFactory(this),
          formViewFactory=defaultViewEditFactory(this, 'Add')){
        return new ContentKind(
            this.Name,
            this.Api,
            this.Properties,
            viewFactory,
            formViewFactory)
    }
}

function defaultViewFactory(builder){
    return (views) => {
        let e = new ElementBuilder()
            .withClass(builder.Name);
        for (const [value, key] of views.keys()){
            e.withChildBuilder(value)
        }
        return e;
    }
}

function defaultViewEditFactory(builder){
    return (views, on_submit, op) => {
        let v = []
        for (const [value, key] of views.entries()){
            v.push(new ElementBuilder('label')
                        .withInnerHtml(key)
                        .withChildBuilder(value))
        }
        console.log(v)
        return new ElementBuilder()
            .withClass(builder.Name)
            .withChildBuilder(new ElementBuilder('h1')
                .withInnerHtml(op))
            .withManyChildBuilders(v)
            // .withManyChildBuilders(
            //     views.map((v, property_name) => {
            //         return new ElementBuilder('label')
            //             .withInnerHtml(property_name)
            //             .withChildBuilder(v)
            //     })
            // )
            .withChildBuilder(new ButtonBuilder(on_submit)
                .withInnerHtml(op))
    }
}


