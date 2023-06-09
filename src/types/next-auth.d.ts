import NextAuth from "next-auth";
import { UserSession } from "./UserSession";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserSession;
  }
}
