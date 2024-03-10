import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { createUserSignInValidationSchema } from "@/db/validators/user.joi.validator";
import { isEmailAndPasswordMatching } from "@/db/services/user.service";
import { userType } from "@/utils/types";
import { connectDB } from "@/db/init";
import to from "await-to-js";
const jwt = require("jsonwebtoken");
const SECRET = process.env.YOUR_SECRET_KEY || "secret";
import { cookies } from "next/headers";

type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;
export async function POST(req: CombineRequest) {
  await connectDB(); // Connect to Mongo Db

  //ts-ignore
  const { email, password } = await req.json();
  const { value, error } = await createUserSignInValidationSchema.validate({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({
      error: true
    }, { status: 400, statusText: error?.details[0].message || "Validation Error", });
  }
  const [errors, user] = await to(isEmailAndPasswordMatching(email, password));
  if (!!(errors || !user)) {
    return NextResponse.json({
      error: true
    }, { status: 401, statusText: errors?.message || "Login Failed" });
  }
  const token = jwt.sign({ id: user._id }, SECRET);
  
  const cookieStore = cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return new Response(JSON.stringify({ error: false, user: { _id: user._id, email: user.email  } }), {
    status: 200,
    headers: { "Set-Cookie": `token=${token}` },
  });
}