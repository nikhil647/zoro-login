import { userType } from "@/utils/types";
import to from "await-to-js";
const bcrypt = require("bcrypt");
const UserModel = require("@/db/schema/user.schema");

// Create Type
export const isEmailAndPasswordMatching = async (
  email: string,
  password: string
): Promise<userType> => {

  const [error, user]: any = await to(
    UserModel.find({ email }).select("password _id email")
  );

  if (error || !user[0]) {
    throw new Error("User non-exist");
  }

  const result = bcrypt.compareSync(password, user[0].password);

  console.log('result -->', result);

  if (!result) {
    throw new Error('Password Not Matching');
  }

  return {
    password: user[0].password,
    _id: user[0]._id.toHexString(),
    email: user[0].email,
  };
};
