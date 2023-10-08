import NextAuth, { AuthOptions } from "next-auth";
import Discord from "next-auth/providers/discord";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID ?? "";
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET ?? "";

export const authOptions: AuthOptions = {
  providers: [
    Discord({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    })
  ]
}

const handler = NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
}
