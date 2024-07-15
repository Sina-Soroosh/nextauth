import NextAuth from "next-auth/next";
import { Provider } from "next-auth/providers/index";
import credentialsProvider from "next-auth/providers/credentials";
import { randomUUID } from "crypto";
import { connectToDB } from "@/config/db";
import { compereHashedPassword } from "@/utils/auth";
import UserModel from "@/app/models/User";

type Credentials = {
  isSignUp: true | undefined;
  identifier: string;
  password: string;
};

const providers: Provider[] = [
  credentialsProvider({
    credentials: {},
    name: "Next Auth",
    authorize: async (credentials, req) => {
      await connectToDB();

      const { isSignUp, identifier, password } = credentials as Credentials;

      if (isSignUp) {
        return { id: randomUUID(), email: identifier };
      }

      const user = await UserModel.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });

      if (!user) {
        throw new Error("Notfound user !!");
      }

      const isValidPassword = await compereHashedPassword(
        password,
        user.password
      );

      if (!isValidPassword) {
        throw new Error("Username or password is not correct");
      }

      return { id: randomUUID(), email: user.email };
    },
  }),
];

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers,
});

export { handler as POST, handler as GET };
