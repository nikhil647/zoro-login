import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { connectDB } from "@/db/init";
import to from "await-to-js";
const jwt = require("jsonwebtoken");
const SECRET = process.env.YOUR_SECRET_KEY || "secret";
import { cookies } from "next/headers";

type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

export async function POST(req: CombineRequest, res: CombineResponse) {
  const cookieStore = cookies();
  cookieStore.delete("token");

  return new Response(JSON.stringify({ error: false, user: null }), {
    status: 200,
  });
}