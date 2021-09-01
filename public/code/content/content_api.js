export class ContentApi {
    constructor(name /*properties*/) {
        this.Name = name;
        // this.Properties = properties;
    }

    async add(item) {
        try {
            return (await post(`/${this.Name}`, item)).ok
        } catch (e) {
            throw new Error("Unable to connect to server.")
        }
    }

    async get(id) {
        let m = "Error getting item"
        try {
            let response = await fetch(`/${this.Name}/id/${id}`);
            if (response.ok) {
                return await response.json();
            } else {
                m = ""
                throw new Error()
            }
        } catch (e) {
            throw new Error(m)
        }
    }

    async get_tagged(tag) {
        try {
            let response = await fetch(`/${this.Name}/search_tag/${tag}`)
            if (response.ok) {
                return await response.json();
            } else {
                return []
            }
        } catch (e) {
            throw new Error(m)
        }
    }

    async get_tags_for(id) {
        try {
            let response = await fetch(`/${this.Name}/tags/id/${id}`);
            if (response.ok) {
                return await response.json();
            } else {
                return []
            }
        } catch (e) {
            throw new Error(m)
        }
    }

    async
}