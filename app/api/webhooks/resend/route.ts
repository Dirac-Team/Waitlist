import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;

export async function POST(req: NextRequest) {
  const { type, data } = await req.json();

  if (type !== "email.delivered") {
    return NextResponse.json({ received: true });
  }

  const email = Array.isArray(data.to) ? data.to[0] : data.to;

  await resend.contacts.create({
    audienceId: AUDIENCE_ID,
    email,
    unsubscribed: false,
  });

  return NextResponse.json({ success: true });
}
