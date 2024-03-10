import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { createUserSignInValidationSchema } from "@/db/validators/user.joi.validator";

import { connectDB } from "@/db/init";
import to from "await-to-js";
const UserModel = require("@/db/schema/user.schema");

type CombineRequest = Request & NextApiRequest;

export async function POST(req: CombineRequest) {
  await connectDB(); // Connect to Mongo Db

  //ts-ignore
  const { email, password } = await req.json();
  const { error } = await createUserSignInValidationSchema.validate({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      {
        error: true,
      },
      {
        status: 400,
        statusText: error?.details[0].message || "Validation Error",
      }
    );
  }

  const [errordb, userDb] = await to(new UserModel({ email: email, password: password }).save());

  if(errordb) {
    console.log('error -->', errordb)
    return new Response(JSON.stringify({ error: true }), {
        status: 400,
      });
  }
  else {
    return new Response(JSON.stringify({ error: false }), {
        status: 200,
      });
  }

}
