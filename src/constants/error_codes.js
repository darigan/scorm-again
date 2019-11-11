// @flow
export const error_codes = {
  GENERAL: 101,
  INITIALIZATION_FAILED: 101,
  INITIALIZED: 101,
  TERMINATED: 101,
  TERMINATION_FAILURE: 101,
  TERMINATION_BEFORE_INIT: 101,
  MULTIPLE_TERMINATION: 101,
  RETRIEVE_BEFORE_INIT: 101,
  RETRIEVE_AFTER_TERM: 101,
  STORE_BEFORE_INIT: 101,
  STORE_AFTER_TERM: 101,
  COMMIT_BEFORE_INIT: 101,
  COMMIT_AFTER_TERM: 101,
  ARGUMENT_ERROR: 101,
  CHILDREN_ERROR: 101,
  COUNT_ERROR: 101,
  GENERAL_GET_FAILURE: 101,
  GENERAL_SET_FAILURE: 101,
  GENERAL_COMMIT_FAILURE: 101,
  UNDEFINED_DATA_MODEL: 101,
  UNIMPLEMENTED_ELEMENT: 101,
  VALUE_NOT_INITIALIZED: 101,
  INVALID_SET_VALUE: 101,
  READ_ONLY_ELEMENT: 101,
  WRITE_ONLY_ELEMENT: 101,
  TYPE_MISMATCH: 101,
  VALUE_OUT_OF_RANGE: 101,
  DEPENDENCY_NOT_ESTABLISHED: 101,
};

export const scorm12_error_codes = {
  ...error_codes, ...{
    RETRIEVE_BEFORE_INIT: 301,
    STORE_BEFORE_INIT: 301,
    COMMIT_BEFORE_INIT: 301,
    ARGUMENT_ERROR: 201,
    CHILDREN_ERROR: 202,
    COUNT_ERROR: 203,
    UNDEFINED_DATA_MODEL: 401,
    UNIMPLEMENTED_ELEMENT: 401,
    VALUE_NOT_INITIALIZED: 301,
    INVALID_SET_VALUE: 402,
    READ_ONLY_ELEMENT: 403,
    WRITE_ONLY_ELEMENT: 404,
    TYPE_MISMATCH: 405,
    VALUE_OUT_OF_RANGE: 407,
    DEPENDENCY_NOT_ESTABLISHED: 408,
  },
};

export const scorm2004_error_codes = {
  ...error_codes, ...{
    INITIALIZATION_FAILED: 102,
    INITIALIZED: 103,
    TERMINATED: 104,
    TERMINATION_FAILURE: 111,
    TERMINATION_BEFORE_INIT: 112,
    MULTIPLE_TERMINATIONS: 113,
    RETRIEVE_BEFORE_INIT: 122,
    RETRIEVE_AFTER_TERM: 123,
    STORE_BEFORE_INIT: 132,
    STORE_AFTER_TERM: 133,
    COMMIT_BEFORE_INIT: 142,
    COMMIT_AFTER_TERM: 143,
    ARGUMENT_ERROR: 201,
    GENERAL_GET_FAILURE: 301,
    GENERAL_SET_FAILURE: 351,
    GENERAL_COMMIT_FAILURE: 391,
    UNDEFINED_DATA_MODEL: 401,
    UNIMPLEMENTED_ELEMENT: 402,
    VALUE_NOT_INITIALIZED: 403,
    READ_ONLY_ELEMENT: 404,
    WRITE_ONLY_ELEMENT: 405,
    TYPE_MISMATCH: 406,
    VALUE_OUT_OF_RANGE: 407,
    DEPENDENCY_NOT_ESTABLISHED: 408,
  },
};
