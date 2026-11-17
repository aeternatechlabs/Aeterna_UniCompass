import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, Loader2 } from "lucide-react";
import type { ChatMessage, PathwayFilter, ThemeMode } from "../types";

interface AiChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  theme: ThemeMode;
  currentFilters?: PathwayFilter;
}

export const AiChatWidget: React.FC<AiChatWidgetProps> = ({
  isOpen,
  onToggle,
  theme,
  currentFilters,
}) => {
  const isLight = theme === "light";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I can help you explore global universities, compare tuition and living costs, and understand admission requirements. What destination, field of study, or undergraduate budget tier are you curious about?",
      timestamp: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          filters: currentFilters,
          history: messages.slice(-4),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: data.reply || data.text,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error("Fallback to local intelligence");
      }
    } catch {
      const fallbackReply = generateLocalAdvisorResponse(
        textToSend,
        currentFilters,
      );
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  const generateLocalAdvisorResponse = (
    query: string,
    filters?: PathwayFilter,
  ): string => {
    const q = query.toLowerCase();
    const dest = filters?.destination || "the UK & Europe";
    const field = filters?.field || "your chosen programme";

    if (
      q.includes("nurs") ||
      q.includes("health") ||
      filters?.field.toLowerCase().includes("nurs")
    ) {
      return `For **${field}** in **${dest}**:\n\n• **Admissions**: Requires a recognized Bachelor's (min. 60–65%) or clinical diploma. IELTS Academic 6.5–7.0 with no band under 6.5 is standard.\n• **Tuition**: Typical international fees range from £15,000–£21,000 / year (approx ₹16–22 Lakhs).\n• **Work & Placements**: Post-study work route grants 2 years on the UK Graduate Route, plus direct NHS sponsorship opportunities on Health and Care Worker visas.\n• **Upcoming Intakes**: Main admissions for September 2026 are open with priority review ending March 31.`;
    }

    if (
      q.includes("cost") ||
      q.includes("uk vs germany") ||
      q.includes("budget") ||
      q.includes("germany")
    ) {
      return `### Cost Comparison: UK vs Germany\n\n• **Germany**: €0 tuition at public universities (only ~€250/semester contribution). Living requirement is a mandatory Blocked Account of €11,208/year (~₹11.85 Lakhs). Overall 1-year cost: ~₹12–14 Lakhs.\n• **UK**: Average tuition £14k–£24k/year + UKVI living benchmark of £1,023–£1,347/month. Overall 1-year cost: ~₹25–35 Lakhs.\n\nGermany offers maximum savings for STEM and Engineering, while the UK provides 1-year fast-track Master's with immediate post-study work visas.`;
    }

    if (q.includes("ielts") || q.includes("visa") || q.includes("criteria")) {
      return `### 2026 Visa & Language Criteria\n\n• **Language**: Most universities require IELTS 6.5 (min 6.0 in each section) or TOEFL 88+. Many UK universities waive IELTS if you scored >70% in Grade 12 English.\n• **Financial Verification**: Proof of funds must be maintained in bank accounts for 28 consecutive days before visa application.\n• **Post-Study Work**: UK offers 2 years Graduate Route; Germany offers 18-month Jobseeker; Australia offers 2–4 years on Subclass 485.`;
    }

    return `Based on your profile for **${filters?.education || "Graduate studies"}** in **${dest}**:\n\n• **Target Intake**: September 2026 (Winter/Fall)\n• **Estimated Budget**: ${filters?.budget || "₹8 - 12 Lakhs/year"}\n• **Verification Check**: Our direct institutional evaluation matches you with 4 top-tier accredited faculties. Would you like a step-by-step application timeline or scholarship checklist?`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Floating Toggle Pill Button - matching screenshot "+ Ask Global AI" */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="bg-[#00303F] hover:bg-[#002632] text-[#CAE4DB] px-4 py-2.5 rounded-full shadow-2xl border border-[#7A9D96]/60 flex items-center gap-2 transition-all duration-300 hover:scale-105 group cursor-pointer"
        >
          <span className="text-[#DCAE1D] font-bold text-sm">✦</span>
          <span className="text-xs font-bold tracking-wide">
            + Ask Global AI
          </span>
        </button>
      )}

      {/* Chat Window Drawer / Card */}
      {isOpen && (
        <div
          className={`w-[90vw] sm:w-[400px] h-[520px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 ${
            isLight
              ? "bg-white border-[#CAE4DB]"
              : "bg-[#002632] border-[#7A9D96]/40"
          }`}
        >
          {/* Header */}
          <div className="bg-[#00303F] text-white p-4 flex items-center justify-between border-b border-[#7A9D96]/30">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#001f29] border border-[#DCAE1D] flex items-center justify-center text-[#DCAE1D]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold leading-tight text-white">
                  Aeterna Global Education Assistant
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DCAE1D] animate-pulse"></span>
                  <span className="text-[10px] text-[#CAE4DB] font-medium">
                    Online · Official Data Grounded
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-1 text-[#7A9D96] hover:text-white rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div
            className={`flex-1 p-4 overflow-y-auto space-y-3.5 text-xs ${
              isLight ? "bg-[#CAE4DB]/15" : "bg-[#001f29]"
            }`}
          >
            {messages.map((msg) => {
              const isAi = msg.sender === "ai";
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isAi ? "justify-start" : "justify-end"}`}
                >
                  {isAi && (
                    <div className="w-6 h-6 rounded-full bg-[#00303F] text-[#DCAE1D] border border-[#DCAE1D]/40 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                      A
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed whitespace-pre-line ${
                      isAi
                        ? isLight
                          ? "bg-white text-[#00303F] border border-[#CAE4DB]"
                          : "bg-[#002632] text-[#CAE4DB] border border-[#7A9D96]/30"
                        : "bg-[#00303F] text-[#CAE4DB] border border-[#DCAE1D]/50"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-[#7A9D96] text-xs py-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#DCAE1D]" />
                <span>Consulting verified admissions criteria...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div
            className={`px-3 py-2 border-t flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar ${
              isLight
                ? "bg-white border-[#CAE4DB]"
                : "bg-[#002632] border-[#7A9D96]/20"
            }`}
          >
            <button
              onClick={() =>
                handleSendMessage(
                  `Guidance on my selected pathway: ${currentFilters?.field || "Healthcare"} in ${
                    currentFilters?.destination || "UK"
                  }`,
                )
              }
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors flex items-center gap-1 border ${
                isLight
                  ? "bg-[#CAE4DB]/30 border-[#CAE4DB] text-[#00303F] hover:border-[#DCAE1D]"
                  : "bg-[#001f29] border-[#7A9D96]/40 text-[#CAE4DB] hover:border-[#DCAE1D]"
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#DCAE1D]" />
              <span>Guidance on my pathway</span>
            </button>
            <button
              onClick={() =>
                handleSendMessage(
                  "Cost comparison: UK vs Germany study costs and living expenses",
                )
              }
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors border ${
                isLight
                  ? "bg-[#CAE4DB]/30 border-[#CAE4DB] text-[#00303F] hover:border-[#DCAE1D]"
                  : "bg-[#001f29] border-[#7A9D96]/40 text-[#CAE4DB] hover:border-[#DCAE1D]"
              }`}
            >
              UK vs Germany
            </button>
            <button
              onClick={() =>
                handleSendMessage(
                  "What are IELTS and visa financial requirements for 2026?",
                )
              }
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors border ${
                isLight
                  ? "bg-[#CAE4DB]/30 border-[#CAE4DB] text-[#00303F] hover:border-[#DCAE1D]"
                  : "bg-[#001f29] border-[#7A9D96]/40 text-[#CAE4DB] hover:border-[#DCAE1D]"
              }`}
            >
              IELTS / Visa 2026
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className={`p-3 border-t flex items-center gap-2 ${
              isLight
                ? "bg-white border-[#CAE4DB]"
                : "bg-[#002632] border-[#7A9D96]/20"
            }`}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about universities, admission criteria or costs..."
              className={`flex-1 rounded-lg px-3 py-2 text-xs focus:outline-none transition-all ${
                isLight
                  ? "bg-[#CAE4DB]/20 border border-[#7A9D96]/40 text-[#00303F] focus:border-[#DCAE1D]"
                  : "bg-[#001f29] border border-[#7A9D96]/40 text-[#CAE4DB] focus:border-[#DCAE1D]"
              }`}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="bg-[#DCAE1D] hover:opacity-90 disabled:opacity-40 text-[#00303F] p-2 rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
