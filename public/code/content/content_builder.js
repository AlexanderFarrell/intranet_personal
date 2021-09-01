import {ContentApi} from "./content_api.js";
import {ClientApp} from "../core/client_app";
import {ElementBuilder} from "../ui/elements/element_builder";
import {ButtonBuilder} from "../ui/elements/button_builder";

export const content_kinds = new Map()

export const content_engine = {
    add: (name) => {
        let kind = new ContentKind(name)
        content_kinds.set(name, this)
        return kind;
    }
}
export class ContentBuilder {
    constructor(name) {
        this.Name = name;
        this.Api = new ContentApi(name);
        this.Setters = []
        this.PropertyViews = []
        this.EditViews = []
        return this;
    }

    get Properties(){
        return this.Setters.keys()
    }

    withProperty(name, setter, viewFactory, editViewFactory){
        this.Setters[name] = setter;
        this.PropertyViews[name] = viewFactory;
        this.EditViews[name] = editViewFactory;
        return this;
    }

    build(viewFactory=defaultViewFactory(this),
          formViewFactory=defaultViewEditFactory(this)){
        return new ContentKind(
            this.Name,
            this.Api,
            this.Setters,
            this.PropertyViews,
            this.EditViews,
            viewFactory,
            formViewFactory)
    }
}

function defaultViewFactory(builder){
    return (views) => {
        let e = new ElementBuilder()
            .withClass(builder.Name);
        views.forEach((value, key) => {
            e.withChildBuilder(value)
        })
        return e;
    }
}

/*
return new ElementBuilder()
                        .withClass('Idea')
                        .withChildBuilder(new ElementBuilder('h1')
                            .withInnerHtml(op))
                        .withChildBuilder(views['title'])
                        .withChildBuilder(views['content'])
                        .withChildBuilder(new ButtonBuilder(on_submit)
                            .withInnerHtml(op))
 */

function defaultViewEditFactory(builder, op){
    return (views, on_submit) => {
        return new ElementBuilder()
            .withClass(builder.Name)
            .withChildBuilder(new ElementBuilder('h1')
                .withInnerHtml(op))
            .withManyChildBuilders(
                views.map(v => {
                    return new ElementBuilder('label')
                        .withInnerHtml(property_name)
                        .withChildBuilder(v)
                })
            )
            .withChildBuilder(new ButtonBuilder(on_submit)
                .withInnerHtml(op))
    }
}


class ContentKind {
    constructor(name, api, setters, propertyFactories, editViewFactories, viewFactory, formViewFactory) {
        this.Name = name;
        this.Api = api;
        this.PropertyViewFactories = propertyFactories;
        this.EditViewFactories = editViewFactories;
        this.Setters = setters;
        this.ViewFactory = viewFactory;
        this.FormViewFactory = formViewFactory;
        content_kinds.set(name, this)
    }

    get Properties(){
        return this.Setters.keys()
    }

    GetView(item){
        return this.ViewFactory(
            this.PropertyViewFactories
        )
    }
}

export class ContentApp extends ClientApp {
    constructor(kind) {
        super(name);
        this.Kind = kind;
    }
}