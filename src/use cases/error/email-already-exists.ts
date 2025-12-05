export class EmailAlreadyExists extends Error {
    constructor() {
        super('The email already exists...')
    }
}