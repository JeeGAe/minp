enum ResponseCode {
  
  // status 200
  SUCCESS = "SU",

  // status 400
  VALIDATION_FAILED = "VF",
  DUPLICATE_EMAIL = "DE",
  DUPLICATE_NICKNAME = "DN",
  DUPLICATE_PHONE_NUMBER = "DP",
  NOT_EXISTED_USER = "NU",
  NOT_EXISTED_BOARD = "NB",

  // status 401
  SIGN_IN_FAILED = "SF",
  AUTHORIZATION_FAILED = "AF",

  // status 403
  NO_PERMISSION = "NP",

  // status 500
  INTERNAL_SERVER_ERROR = "IE",

}

export default ResponseCode;