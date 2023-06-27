"use strict";
// class ApiError extends Error {
//   statusCode: number
Object.defineProperty(exports, "__esModule", { value: true });
//   constructor(statusCode: number, message: string | undefined, stack = '') {
//     super(message)
//     this.statusCode = statusCode
//     if (stack) {
//       this.stack = stack
//     } else {
//       Error.captureStackTrace(this, this.constructor)
//     }
//   }
// }
// export default ApiError
class ApiError extends Error {
    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
