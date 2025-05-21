// OpenAI API error types
export class OpenAIError extends Error {
    constructor(error) {
        super(error.message);
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
        this.name = 'OpenAIError';
        this.type = error.type;
        this.param = error.param;
        this.code = error.code;
    }
}
export class RateLimitError extends OpenAIError {
    constructor(error) {
        super(error);
        this.name = 'RateLimitError';
    }
}
export class InvalidRequestError extends OpenAIError {
    constructor(error) {
        super(error);
        this.name = 'InvalidRequestError';
    }
}
export class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}
