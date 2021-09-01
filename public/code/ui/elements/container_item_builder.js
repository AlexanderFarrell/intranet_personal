import {ElementBuilder} from "./element_builder.js";

export class ContainerItemBuilder extends ElementBuilder {
    constructor(custom_tag='div') {
        super(custom_tag);
        this.ElementMap = new Map();
    }

    add(id, view){
        this.ElementMap.add(id, view)
        this._element.append(view._element)
    }

    remove(id){
        if (this.has(id)){
            this.get().remove()
            this.ElementMap.delete(id)
        }
    }

    addMany(ids_views){
        ids_views.forEach(pair => {
            this.add(pair[0], pair[1])
        })
    }

    removeMany(ids){
        ids_views.forEach(id => {
            this.remove(id)
        })
    }

    clear(){
        this._element.innerHTML = ""
    }

    has(id){
        return this.ElementMap.has(id)
    }

    get(id){
        return this.ElementMap.get(id) | null
    }

    withChildBuilder(builder) {
        throw new Error("Use the add method for item containers");
    }

    withChildElement(element) {
        throw new Error("Use the add method for item containers");
    }

    withManyChildBuilders(builders) {
        throw new Error("Use the add method for item containers");
    }

    withManyChildElements(elements) {
        throw new Error("Use the add method for item containers");
    }
}