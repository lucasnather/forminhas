export class NotAutorizedError extends Error {

    constructor() {
        super("Not authorized")
    }
}