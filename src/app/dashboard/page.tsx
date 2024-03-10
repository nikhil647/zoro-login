import React from 'react'
import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
const SECRET = process.env.YOUR_SECRET_KEY || "secret";
const UserModel = require("@/db/schema/user.schema");
import { redirect } from 'next/navigation';
// import { Button } from '@/components/ui/button';
import MyCard from '@/components/MyCard';

// Server Component
async function Dashboard() {

  const cookieStore = cookies();
  const token = cookieStore.get('token');
  let user;

  try {
    const userId = jwt.verify(token?.value, SECRET);
    user = await UserModel.findById({ _id: userId?.id }).select("_id email");
  }
  catch (err) {
    console.log('err -->', err)
    return redirect('/');
  }
  
  return (
    <div className="flex justify-center items-center h-screen">
      Hello {user?.email}
      <MyCard />
    </div>
  )
}

export default Dashboard