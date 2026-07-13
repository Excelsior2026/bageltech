import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    tenant_id?: string;
    access_token?: string;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id?: string;
      role?: string;
      tenant_id?: string;
      access_token?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    tenant_id?: string;
    access_token?: string;
  }
}
