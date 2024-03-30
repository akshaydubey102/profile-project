class ApiError {
  constructor(errorMsg, errorCode) {
    this.isError = true;
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }
}

export default ApiError;
