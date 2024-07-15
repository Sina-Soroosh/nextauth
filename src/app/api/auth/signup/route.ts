import UserModel from "@/app/models/User";
import { User } from "@/app/types/User.types";
import { connectToDB } from "@/config/db";
import { hashPassword } from "@/utils/auth";
import patterns from "@/utils/patterns";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    connectToDB();

    const body: User = await req.json();

    // Validation
    if (
      !body.firstName?.trim() ||
      !body.lastName?.trim() ||
      !body.username?.trim() ||
      !patterns.email.test(body.email?.trim()) ||
      !body.password?.trim()
    ) {
      return Response.json(
        { message: "Data is not valid !!" },
        {
          status: 422,
        }
      );
    }

    const isUserExist = await UserModel.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (isUserExist) {
      return Response.json(
        { message: "This username or email exist already !!" },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await hashPassword(body.password);

    await UserModel.create({
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });

    return Response.json(
      { message: "User Created Successfully :))" },
      {
        status: 201,
      }
    );
  } catch (err) {
    return Response.json(
      { message: "UnKnown Internal Server Error !!", err },
      { status: 500 }
    );
  }
};
