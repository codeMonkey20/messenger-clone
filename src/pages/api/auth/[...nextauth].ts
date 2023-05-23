import User from "@/models/User";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username ? credentials?.username : "";
        const password = credentials?.password ? credentials?.password : "";
        const user = await User.findOne({ username });
        if (!user) return null;
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
          return {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.username,
            // image: "hehe",
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      const { _doc } = await User.findOne({ username: session.user.email });
      const { password, __v, ...user } = _doc;
      return {
        ...session,
        user,
      };
    },
  },
  pages: {
    signIn: "/",
  },
};
export default NextAuth(authOptions);
