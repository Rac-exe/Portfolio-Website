import { NextResponse } from "next/server";

const MAX_NAME_LENGTH = 80;
const MAX_REPLY_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 1600;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidReply(value: string) {
  if (value.length < 3 || value.length > MAX_REPLY_LENGTH) {
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handlePattern = /^@?[a-zA-Z0-9._-]{2,40}$/;
  const socialUrlPattern =
    /^https:\/\/(www\.)?(x\.com|twitter\.com|linkedin\.com|github\.com|instagram\.com)\/[^\s]+$/i;

  return emailPattern.test(value) || handlePattern.test(value) || socialUrlPattern.test(value);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function textBlock(label: string, value: string) {
  return `${label}:\n${value || "Not provided"}`;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
  const name = clean(data.name).slice(0, MAX_NAME_LENGTH);
  const reply = clean(data.reply);
  const message = clean(data.message);
  const company = clean(data.company);

  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidReply(reply)) {
    return NextResponse.json(
      { error: "Add a valid email, social handle, or social profile URL." },
      { status: 400 },
    );
  }

  if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Message should be between 10 and 1600 characters." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "prabhatbajpai2005@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return NextResponse.json(
      {
        error:
          "Message API is not configured yet. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.",
      },
      { status: 503 },
    );
  }

  const body = [
    "New portfolio message",
    "",
    textBlock("Name", name),
    "",
    textBlock("Reply/social", reply),
    "",
    textBlock("Message", message),
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `Portfolio message${name ? ` from ${name}` : ""}`,
      text: body,
      reply_to: isEmail(reply) ? reply : undefined,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Message could not be sent right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
