"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { chat, type Message } from "./actions";
import { signOut } from "next-auth/react";

export default function Chat({ user }: { user: any }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: `Welcome to the Socratic Sparring Arena, ${user?.name || "Seeker"}. What claim or topic would you like to examine today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage = input.trim();
    setInput("");
    
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(newMessages);

    startTransition(async () => {
      const response = await chat(messages, userMessage);
      setMessages((prev) => [...prev, response]);
    });
  };

  return (
    <div className="flex flex-col h-screen bg-stone-50 text-stone-900 font-serif">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-800">Socratic Sparring Partner</h1>
            <p className="text-stone-500 text-sm italic">Challenge your assumptions, refine your logic.</p>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 border border-stone-200 rounded-full hover:bg-stone-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-6 py-4 rounded-2xl shadow-sm ${
                  m.role === "user"
                    ? "bg-stone-800 text-stone-50 rounded-br-none"
                    : "bg-white border border-stone-200 text-stone-800 rounded-bl-none"
                }`}
              >
                <p className="leading-relaxed text-lg whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}
          {isPending && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 px-6 py-4 rounded-2xl rounded-bl-none shadow-sm animate-pulse">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-stone-200 bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="State your claim..."
              className="w-full bg-stone-100 border-none rounded-full py-4 px-6 pr-14 focus:ring-2 focus:ring-stone-800 focus:bg-white transition-all text-lg outline-none"
              disabled={isPending}
            />
            <button
              type="submit"
              disabled={!input.trim() || isPending}
              className="absolute right-2 p-2 rounded-full bg-stone-800 text-stone-50 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </form>
          <p className="text-center text-stone-400 text-xs mt-4">
            A philosophical exercise powered by Gemini. Signed in as {user?.email}
          </p>
        </div>
      </footer>
    </div>
  );
}
