import {BaseSwitcher} from "../ui/elements/base_switcher.js";

const app_switcher = new BaseSwitcher(null, [], (element) => {
    if (element != null){
        element.OnStart()
    }},
    (element) => {
        if (element != null){
            element.OnEnd()
        }
    }
)

class ClientEngine {
    constructor() {
        this.Apps = new Map()
        this.AppStack = []
    }

    get ActiveApp(){
        return app_switcher.Active;
    }

    load_apps(...apps){
        for (const app in apps){
            this.Apps.set(app.Name, app)
        }
    }

    add_app(app){
        if (this.Apps.has(app.Name)){
            throw new Error("App already exists")
        }
        this.Apps.set(app.Name, app)
    }

    get_app(name){
        return this.Apps.get(name)
    }

    start_app(name){
        if (this.Apps.has(name)){
            app_switcher.Switch(this.get_app(name))
            this.AppStack.push(this.ActiveApp)
        } else {
            console.error(`No such app named ${name}. Check that it was added.`)
        }
    }

    close_running_app(){
        if (this.AppStack.length > 1){
            app_switcher.Switch(this.AppStack[this.AppStack.length - 2])
            this.AppStack.pop()
        } else {
            console.error(`No more apps to close, as this is the last one.`)
        }
    }
}

export const client = new ClientEngine()