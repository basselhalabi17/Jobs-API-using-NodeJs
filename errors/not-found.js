const CustomAPIError = require('./custom-error')
const {StatusCodes} = require('http-status-codes')

class notfound extends CustomAPIError {
    constructor(message) {
      super(message)
      this.statusCode = StatusCodes.NOT_FOUND
      //this.statusCode = statusCode
    }
  }
  
  module.exports = notfound