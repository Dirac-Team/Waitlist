import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { buildWelcomeEmail } from "@/lib/emails/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const { count, error } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ count: 0 });
  }

  return NextResponse.json({ count: count ?? 0 });
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    const { error } = await supabase
      .from("waitlist")
      .insert({ email: normalizedEmail });

    if (error) {
      if (error.code === "23505") {
        const { count } = await supabase
          .from("waitlist")
          .select("*", { count: "exact", head: true });

        return NextResponse.json(
          { message: "You're already on the list!", count: count ?? 0 },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    const position = count ?? 1;

    resend.emails
      .send({
        from: "Peter from Dirac <peter@dirac.app>",
        to: normalizedEmail,
        subject: "You're on the list",
        html: buildWelcomeEmail(position),
      })
      .catch((err) => {
        console.error("Resend error:", err);
      });

    return NextResponse.json(
      { message: "You're in!", count: position },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
