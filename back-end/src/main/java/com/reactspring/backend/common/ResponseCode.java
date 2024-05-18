package com.reactspring.backend.common;

public interface ResponseCode {

  // status 200
  String SUCCESS = "SU";

  // status 400
  String VALIDATION_FAILED = "VF";
  String DUPLICATE_EMAIL = "DE";
  String DUPLICATE_NICKNAME = "DN";
  String DUPLICATE_PHONE_NUMBER = "DP";
  String NOT_EXISTED_USER = "NU";
  String NOT_EXISTED_BOARD = "NB";

  // status 401
  String SIGN_IN_FAILED = "SF";
  String AUTHORIZATION_FAILED = "AF";

  // status 403
  String NO_PERMISSION = "NP";

  // status 500
  String INTERNAL_SERVER_ERROR = "IE";

}