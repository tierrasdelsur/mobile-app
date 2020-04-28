import { TypeSnackBar } from '../enums/typesnackbar';

export class AppError extends Error {
  public typeMessage;
  constructor(message, typeMessage = TypeSnackBar.INFO) {
    super(message);
    this.name = 'UnAuthentificatedError';
    this.typeMessage = typeMessage;
  }
}
