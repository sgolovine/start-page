import { v4 as uuidv4 } from "uuid";

export const getGuid = () => {
  const guid = uuidv4();
  return guid;
};
