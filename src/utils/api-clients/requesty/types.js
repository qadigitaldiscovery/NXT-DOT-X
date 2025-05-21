export class RequestyError extends Error {
    constructor(message, details) {
        super(message);
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "param", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'RequestyError';
        if (details) {
            this.type = details.type;
            this.param = details.param;
            this.code = details.code;
        }
    }
}
