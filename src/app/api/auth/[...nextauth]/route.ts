import NextAuth from "next-auth/next";
import { Provider } from "next-auth/providers/index";
import credentialsProvider from "next-auth/providers/credentials";

const providers: Provider[] = [
  credentialsProvider({
    credentials: {},
    name: "Next Auth",
    async authorize(credentials, req) {
      console.log(credentials);

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
