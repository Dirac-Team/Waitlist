import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { buildWelcomeEmail } from "@/lib/emails/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

type SurveyPayload = {
  reply_pct?: string;
  frustration?: string;
  professional_role?: string;
  inbox_role?: string;
  cost_of_miss?: string;
  email_types?: string[];
};

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
    const body = await request.json();
    const { email, ...rest } = body as { email?: string } & SurveyPayload;

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

    const survey: SurveyPayload = {
      reply_pct: typeof rest.reply_pct === "string" ? rest.reply_pct : undefined,
      frustration:
        typeof rest.frustration === "string" ? rest.frustration : undefined,
      professional_role:
        typeof rest.professional_role === "string"
          ? rest.professional_role
          : undefined,
      inbox_role:
        typeof rest.inbox_role === "string" ? rest.inbox_role : undefined,
      cost_of_miss:
        typeof rest.cost_of_miss === "string" ? rest.cost_of_miss : undefined,
      email_types: Array.isArray(rest.email_types)
        ? rest.email_types.filter((x) => typeof x === "string")
        : undefined,
    };

    const missing =
      !survey.reply_pct ||
      !survey.frustration ||
      !survey.professional_role ||
      !survey.inbox_role ||
      !survey.cost_of_miss ||
      !survey.email_types?.length;

    if (missing) {
      return NextResponse.json(
        { error: "Please answer all questions" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    const { error } = await supabase.from("waitlist").insert({
      email: normalizedEmail,
      reply_pct: survey.reply_pct,
      frustration: survey.frustration,
      role: survey.professional_role,
      inbox_role: survey.inbox_role,
      cost_of_miss: survey.cost_of_miss,
      email_types: survey.email_types!.join(" | "),
    });

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

      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    const position = count ?? 1;

    const { error: resendError } = await resend.emails.send({
      from: "Peter from Dirac <peter@dirac.app>",
      to: normalizedEmail,
      subject: "You're on the list",
      html: buildWelcomeEmail(position),
    });

    if (resendError) {
      console.error("Resend error:", resendError);
    }

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
