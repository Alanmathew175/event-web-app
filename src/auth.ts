import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
type ExtendedUser = DefaultSession["user"] & {
    accessToken: any;
    refreshToken: any;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
        error?: string;
    }

    interface User {
        accessToken: any;
        refreshToken: any;
    }
}
export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Google({
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: "openid profile email https://www.googleapis.com/auth/calendar",
                },
            },
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;

            return session;
        },
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after sign in
            if (account?.access_token) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
            }
            return token;
        },
    },
});
