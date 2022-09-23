export class AppError {
  code = undefined;
  message = undefined;

  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}
