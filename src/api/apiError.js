class Apierror extends Error {
    constructor(status, errorMessage, errorTitle = null) {
      super(errorMessage);
      this.status = status;
      this.errorMessage = errorMessage;
      this.errorTitle = errorTitle;
    }
  }
  
  module.exports = Apierror;
  