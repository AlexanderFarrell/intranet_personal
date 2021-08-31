export class ElementBuilder {
    constructor(tag = 'div') {
        this._element = document.createElement(tag);
        return this;
    }
    withClass(i){
        this._element.classList.add(i);
        return this;
    }
    withClasses(classes){
        if (classes.forEach !== undefined){
            classes.forEach(i => {
                this._element.classList.add(i);
                return this;
            })
        }
    }
    withId(id){
        this._element.id = id;
        return this;
    }
    withInnerHtml(innerHtml){
        this._element.innerHTML = innerHtml;
        return this;
    }
    withAttribute(qualifiedName, value){
        this._element.setAttribute(qualifiedName, value);
        return this;
    }
    withEvent(eventName, onEvent) {
        this._element.addEventListener(eventName, onEvent);
        return this;
    }
    withEntireStyle(styleInfo) {
        this._element.setAttribute('style', styleInfo);
        return this;
    }
    withChildElement(element){
        this._element.appendChild(element)
        return this;
    }
    withChildBuilder(builder){
        this._element.appendChild(builder._element)
        return this;
    }
    withCss(name, value){
        this._element.style[name] = value
        return this;
    }
    withTabIndex(tabIndex){
        this._element.setAttribute('tabIndex', tabIndex)
        return this;
    }
    withRowFlexContainerCss(){
        this._element.style.display = 'flex';
        this._element.style.justifyContent = 'space-evenly';
        return this;
    }
    withButtonPressEvent(onPress){
        this.withEvent('mouseup', onPress)
            .withEvent('touchend', onPress)
            .withEvent('keyup', ev => {
                if (ev.key === "Enter" || ev.key === ' ') {
                    onPress();
                }
            });
        return this;
    }

    build(){
        return this._element;
    }
}