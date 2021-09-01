import {client} from "./client_engine.js";

export class ClientApp {
    constructor(name) {
        this.Name = name
        client.add_app(this)
    }

    get IsRunning() {
        return client.ActiveApp === this
    }

    OnStart(){

    }

    OnEnd(){

    }

    Start(){
        if (!this.IsRunning){
            client.start_app(this.Name)
        } else {
            throw new Error(`Cannot start as the app is already running. Use the restart method if you'd like to reset the app. Current Running: ${client.ActiveApp.Name} Stack: ${client.AppStack}`)
        }
    }

    Restart(){
        if (this.IsRunning){
            this.Stop()
            this.Start()
        } else {
            throw new Error(`Cannot restart app. It is not running. Current running app: ${client.ActiveApp.Name}`)
        }
    }

    Stop(){
        if (this.IsRunning){
            client.close_running_app()
        } else {
            throw new Error(`Cannot stop app as it is not running. Current running app: ${client.ActiveApp.Name}`)
        }
    }
}