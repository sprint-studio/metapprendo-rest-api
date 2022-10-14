/* eslint-disable @typescript-eslint/no-explicit-any */
// import { CompanyEducationalAgenda } from "../../../models";

import { ActivityFile, ActivityFileNoShasum, DossierActivity, DossierActivityUpdate, DossierDocument, DossierDocumentUpdate, EducationalPath, User, UserDossier, UserDossierUpdate } from "../../models";

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

export const dossierUpdateRequest = new UserDossierUpdate({
  userId: "userId",
  activity: new DossierActivityUpdate({
    type: "foo",
    title: "foo",
    acceptedFunding: "foo",
    duration: 3,
    year: 2024,
    contents: "foo",
    areas: ["foo"],
    id: "activity1"
  }),
  document: new DossierDocumentUpdate({
    certification: [new ActivityFileNoShasum({
      content: "Zm9vYmFy",
      fileName: "a1.svg"
    })],
    endorsement: [new ActivityFileNoShasum({
      content: "YmFyYmF6",
      fileName: "b1.svg"
    })],
    file: [new ActivityFileNoShasum({
      content: "Zm9vYmF6",
      fileName: "c1.svg"
    })],
  })
});

export const expectedDossier = new UserDossier({
  user: new User({
    userId: "user1",
    fullName: "bar",
    gender: "M",
    username: "foo",
    birthDay: "yesterday"
  }),
  activities: [new DossierActivity({
    id: "activity1",
    type: "foo",
    title: "foo",
    acceptedFunding: "foo",
    duration: 3,
    year: 2024,
    contents: "foo",
    areas: ["foo"],
    document: new DossierDocument({
      certification: [new ActivityFile({
        content: "Y29udGVudGFzdmc=",
        sha256checksum: "a",
        fileName: "a.svg"
      })],
      endorsement: [new ActivityFile({
        content: "Y29udGVudGJzdmc=",
        sha256checksum: "b",
        fileName: "b.svg"
      })],
      file: [new ActivityFile({
        content: "Y29udGVudGNzdmc=",
        sha256checksum: "c",
        fileName: "c.svg"
      })],
    })
  })]
});
