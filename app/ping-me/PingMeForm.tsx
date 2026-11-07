"use client";

import { type FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

export default function PingMeForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/ping-me", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          reply: formData.get("reply"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Could not send message right now.");
      }

      form.reset();
      setState("sent");
    } catch (caughtError) {
      setState("error");
      setError(
        caughtError instanceof Error ? caughtError.message : "Could not send message right now.",
      );
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        aria-hidden="true"
        autoComplete="off"
        className="honeypot"
        name="company"
        tabIndex={-1}
        type="text"
      />

      <label className="field">
        <span>Name</span>
        <input maxLength={80} name="name" placeholder="Your name" type="text" />
      </label>

      <label className="field">
        <span>Where can I reply? Email, or an X / LinkedIn / GitHub handle or link</span>
        <input
          maxLength={160}
          name="reply"
          placeholder="you@example.com or @username"
          required
          type="text"
        />
      </label>

      <label className="field">
        <span>Message</span>
        <textarea
          maxLength={1600}
          name="message"
          placeholder="What are you building, asking, or thinking about?"
          required
          rows={6}
        />
      </label>

      <div className="form-footer">
        <button className="button" disabled={state === "sending"} type="submit">
          {state === "sending" ? "Sending…" : "Send message"}
        </button>

        {state === "sent" ? (
          <p className="status" role="status">
            Sent. I&apos;ll get back to you soon.
          </p>
        ) : null}

        {state === "error" ? (
          <p className="status status-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
