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
    async redirect({ url, baseUrl }) {
      // GitHub Pagesのドメインを許可
      const githubPagesUrl = "https://sakiyamamamama.github.io";
      if (url.startsWith(githubPagesUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        path: "/",
        domain: ".vercel.app" // サブドメインを含むように修正
      },
    },
    callbackUrl: {
      name: "next-auth.callback-url",
      options: {
        sameSite: "None",
        secure: true,
        path: "/",
        domain: ".vercel.app"
      }
    },
  },
  // 追加: 信頼できるホストを設定
//   trustHost: true
};

export default NextAuth(authOptions);