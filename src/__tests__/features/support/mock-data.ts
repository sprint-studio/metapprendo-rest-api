/* eslint-disable @typescript-eslint/no-explicit-any */
// import { CompanyEducationalAgenda } from "../../../models";

import { EducationalPath, User } from "../../../models";

// export const COMPANY_EDUCATIONAL_AGENDA: CompanyEducationalAgenda = {};

export const USER: Partial<User> = {
  userId: "test-user",
  fullName: "TestUser",
};

export const COMPANY: any = {
  companyId: "test-user",
  companyName: "Acme Test",
  PIVA: "TestUser",
  CUA: "",
  CF: "",
};

export const COMPANY_EDUCATIONAL_AGENDA = {
  idTask: "33433",
  idPill: "1234",
  idWorker: "5678",
};

export const EDUCATIONAL_PATH: Partial<EducationalPath> = {
  idPath: "1234",
  idCompany: "5678",
  title: "Lorem",
  description: "Impus",
  data: {},
};

export const ERRORS = {
  missingBody: {
    statusCode: 400,
    name: "BadRequestError",
    message: "Request body is required",
    code: "MISSING_REQUIRED_PARAMETER",
  },
  missingBodyParameter: {
    statusCode: 422,
    name: "UnprocessableEntityError",
    message:
      "The request body is invalid. See error object `details` property for more info.",
    code: "VALIDATION_FAILED",
    details: [],
  },
  jsonSintaxError: {
    statusCode: 400,
    name: "SyntaxError",
    message: "Unexpected token } in JSON at position 77",
  },
  missingParameter: {
    statusCode: 400,
    name: "BadRequestError",
    message: "Required parameter transactionId is missing!",
    code: "MISSING_REQUIRED_PARAMETER",
  },
};
