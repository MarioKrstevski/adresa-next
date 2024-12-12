import { googleOAuthClient } from "@/lib/googleOAuth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prismadb from "@/lib/db";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserRoles } from "@/lib/data/user/importantData";
import { AccountType } from "@prisma/client";
import { generateUniqueToken } from "@/lib/utils";
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/sessions";

export async function GET(req: NextRequest) {
  console.log(req);
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    console.error("No code or state");
    return new Response("Invalid Request", { status: 400 });
  }

  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("codeVerifier")?.value;
  const savedState = cookieStore.get("state")?.value;

  if (!codeVerifier || !savedState) {
    console.error("No code verifier or state");
    return new Response("Invalid Request", { status: 400 });
  }
  if (state !== savedState) {
    console.error("state mismatch");
    return new Response("Invalid Request", { status: 400 });
  }

  const { accessToken } = await googleOAuthClient.validateAuthorizationCode(
    code,
    codeVerifier,
  );

  const googleResponse = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const googleData = (await googleResponse.json()) as {
    id: string;
    email: string;
    name: string;
    picture: string;
  };

  let accountId: number;
  let accountUuid: string;

  // if the email exists in our record we can create a cookie for them and sign the in

  // if the email doesn't exist we create a new user, then create a cookie to sign them in

  const existingUser = await prismadb.account.findUnique({
    where: {
      email: googleData.email,
    },
  });

  if (existingUser) {
    accountId = existingUser.id;
    accountUuid = existingUser.uuid;
  } else {
    const [firstName, lastName] = googleData.name.split(" ");
    const account = await prismadb.account.create({
      data: {
        role: AccountType.USER,
        email: googleData.email,
        user: {
          create: {
            uuid: "accountId",
            firstName,
            lastName,
          },
        },
      },
    });
    accountId = account.id;
    accountUuid = account.uuid;
  }

  const token = await generateSessionToken();
  const session = await createSession(token, accountId);
  await setSessionTokenCookie(token, session.expiresAt, accountUuid);

  // const session = await lucia.createSession(userId, {});
  // const sessionCookie = await lucia.createSessionCookie(session.id);
  // cookieStore.set(
  //   sessionCookie.name,
  //   sessionCookie.value,
  //   sessionCookie.attributes,
  // );
  // cookieStore.set("auth-cookie-exists", userId, {
  //   ...sessionCookie.attributes,
  //   httpOnly: false,
  // });

  redirect("/");
}
