export class UnAuthentificatedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnAuthentificatedError';
  }
}
