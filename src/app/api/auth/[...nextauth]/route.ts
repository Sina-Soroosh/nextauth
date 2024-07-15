import NextAuth from "next-auth/next";
import { Provider } from "next-auth/providers/index";
import credentialsProvider from "next-auth/providers/credentials";
import { randomUUID } from "crypto";
import { connectToDB } from "@/config/db";

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

      return null;
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
