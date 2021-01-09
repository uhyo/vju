import { Group } from "@prisma/client";

export type Methods = {
  get: {
    resBody: {
      group: Group;
    };
  };
};
