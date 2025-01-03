"use server";

export async function sendVerificationEmail(
  email: string,
  verificationLink: string,
) {
  console.log("verificationLink 2 ", verificationLink);

  const emailTemp = "macesmajli@gmail.com";
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/send/verifyuser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: emailTemp, verificationLink }),
    },
  );
  // console.log("response", response);

  if (!response.ok) {
    throw new Error("Failed to send verification email");
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }

  console.log("Verification email sent successfully");
  return true;
}
