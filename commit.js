export class Commit {
    parent = null;

    constructor (id, parent, message) {
        this.id = id
        this.parent = parent
        this.message = message
    }
}