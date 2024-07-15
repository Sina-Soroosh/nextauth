import UserModel from "@/app/models/User";
import { connectToDB } from "@/config/db";
import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    await connectToDB();

    const body: { cookies: string } = await req.json();

    const requestForNextAuth: Partial<IncomingMessage> = {
      headers: {
        cookie: body.cookies,
      },
    };

    const session = await getSession({ req: requestForNextAuth });

    if (!session) {
      return Response.json(false, {
        status: 401,
      });
    }

    const user = await UserModel.findOne({ email: session.user?.email });

    if (!user) {
      return Response.json(false, {
        status: 401,
      });
    }

    return Response.json(true, {
      status: 200,
    });
  } catch (error) {
    return Response.json(
      { message: "UnKnown Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
