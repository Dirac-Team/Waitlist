import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

    const { error } = await supabase
      .from("waitlist")
      .insert({ email: email.toLowerCase() });

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

    return NextResponse.json(
      { message: "You're in!", count: count ?? 0 },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
