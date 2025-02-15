import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: { scope: "identify email guilds" },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30日
  },
  callbacks: {
    async session({ session, token }) {
      session.token = {
        id: token.id as string,
        accessToken: token.accessToken as string,
      };
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile && "id" in profile) {
        token.id = profile.id;
      }
      return token;
    },
    async redirect() {
        return "https://sakiyamamamama.github.io/horizon-atlas"; // GitHub Pages にリダイレクト
      },
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "None", 
        secure: true, 
        domain: "horizon-atlas.vercel.app"
      },
    },
  },
};

export default NextAuth(authOptions);
