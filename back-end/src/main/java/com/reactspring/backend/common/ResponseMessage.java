package com.reactspring.backend.common;

public interface ResponseMessage {
  
  // status 200
  String SUCCESS = "Sucess";

  // status 400
  String VALIDATION_FAILED = "Validation failed";
  String DUPLICATE_EMAIL = "Duplicate email";
  String DUPLICATE_NICKNAME = "Duplicate nickname";
  String DUPLICATE_PHONE_NUMBER = "Duplicate phone number";
  String NOT_EXISTED_USER = "Not existed user";

  // status 401
  String SIGN_IN_FAILED = "Sign in failed";
  String AUTHORIZATION_FAILED = "Authorizaion failed";

  // status 403
  String NO_PERMISSION = "No permisson";

  // status 500
  String INTERNAL_SERVER_ERROR = "Internal server error";

}
