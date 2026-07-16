"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="font-mono text-xs text-muted">
          Name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-mono text-xs text-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-mono text-xs text-muted">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start rounded-md bg-accent px-4 py-2 font-mono text-sm text-background transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
      {status === "success" && (
        <p className="font-mono text-xs text-accent">
          Message sent — I&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="font-mono text-xs text-red-500">
          Something went wrong. Try emailing me directly instead.
        </p>
      )}
    </form>
  );
}
