import { Group } from "@prisma/client";

export type Methods = {
  get: {
    resBody: {
      paths: { ancestorId: number; descendantId: number }[];
      groups: Record<number, Group>;
    };
  };
};
