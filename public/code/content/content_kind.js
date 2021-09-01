import {content_kinds} from "./content_builder.js";

export class ContentKind {
    constructor(name, api, properties, viewFactory, formViewFactory) {
        this.Name = name;
        this.Api = api;
        this.Properties = properties
        this.ViewFactory = viewFactory;
        this.FormViewFactory = formViewFactory;
        content_kinds.set(name, this)
    }

    GetView(item) {
        let i = []
        this.Properties.forEach((property, name) => {
            i[name] = property.CreateView(item[name])
        })
        return this.ViewFactory(i)
    }

    GetAddView(onAdd){
        let i = []
        this.Properties.forEach((property, name) => {
            i[name] = property.CreateEditView('')
        })
        return this.FormViewFactory(i, onAdd, 'Add')
    }

    GetEditView(item, onEdit){
        let i = []
        this.Properties.forEach((property, name) => {
            i[name] = property.CreateEditView(item[name])
        })
        return this.FormViewFactory(i, onEdit, 'Editing')
    }
}