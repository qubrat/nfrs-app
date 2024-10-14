import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { GOOGLE } from "@/config/config";
import { createUser } from "./lib/actions-user";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	providers: [
		GoogleProvider({
			clientId: GOOGLE.clientId,
			clientSecret: GOOGLE.clientSecret,
			authorization: {
				params: {
					access_type: "offline",
					response_type: "code",
					prompt: "consent",
				},
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === "google") {
				try {
					await createUser(user.name!, user.email!, user.name!);
				} catch (error) {
					console.error(error);
				}
			}
			return true;
		},
	},
});
