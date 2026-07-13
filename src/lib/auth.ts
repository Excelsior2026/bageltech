import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface LoginResponse {
  access_token: string;
  user: {
    id: string | number;
    email: string;
    name: string;
    role: string;
    tenant_id: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://verify.bageltech.net";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) return null;

          const data: LoginResponse = await res.json();
          return {
            id: String(data.user.id),
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            tenant_id: data.user.tenant_id,
            access_token: data.access_token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.tenant_id = user.tenant_id;
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = typeof token.role === "string" ? token.role : undefined;
        session.user.tenant_id = typeof token.tenant_id === "string" ? token.tenant_id : undefined;
        session.user.access_token = typeof token.access_token === "string" ? token.access_token : undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/dashboard/login",
  },
  session: { strategy: "jwt" },
});
