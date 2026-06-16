"use client";

import { useRef } from "react";

import SayHiForm from "./SayHiForm";

export default function SayHiContent() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="say-hi-layout">
      <section className="say-hi-intro">
        <p className="text-lg tracking-[0.18em] text-[var(--accent)]">
          EMAIL / X / BUILDING THINGS
        </p>
        <h1 className="manga-title mt-3 text-5xl leading-tight md:text-6xl">
          Say Hi
        </h1>
        <p>
          Best way to connect with me is through{" "}
          <button
            className="say-hi-inline-action"
            onClick={() => nameInputRef.current?.focus()}
            type="button"
          >
            email
          </button>{" "}
          or{" "}
          <button
            className="say-hi-inline-action"
            onClick={() => replyInputRef.current?.focus()}
            type="button"
          >
            X
          </button>
          . Send context, a link, or just the thing you want to talk about.
        </p>
      </section>

      <section className="say-hi-panel">
        <h2>Drop a message</h2>
        <p>Add one valid social/contact link so I know where to reply.</p>
        <SayHiForm nameInputRef={nameInputRef} replyInputRef={replyInputRef} />
      </section>
    </div>
  );
}
