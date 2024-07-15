import React from "react";
import UserModel from "@/app/models/User";
import { connectToDB } from "@/config/db";
import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "../types/User.types";

async function page() {
  await connectToDB();

  const requestForNextAuth: Partial<IncomingMessage> = {
    headers: {
      cookie: cookies().toString(),
    },
  };

  const session = await getSession({ req: requestForNextAuth });

  if (!session) {
    redirect("/signin");
  }

  const user: null | User = await UserModel.findOne({
    email: session.user?.email,
  }).lean();

  if (!user) {
    redirect("/signin");
  }

  return (
    <>
      <h1 className="text-xl m-4 text-white">
        Welcome to Dashboard , {user.firstName} - {user.lastName}{" "}
      </h1>
    </>
  );
}

export default page;
