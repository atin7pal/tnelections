import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Zap,
  Brain,
  Volume2,
  Loader2,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      text: "Hello! I am your Election Analytics AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"fast" | "pro" | "think">("pro");
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_API_KEY || ""
      );

      let modelName = "gemini-1.5-pro";
      if (mode === "fast") modelName = "gemini-1.5-flash";

      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction:
          "You are an AI assistant for a political election analytics application. You help users analyze voter data, demographics, sentiment, and electoral trends. Be concise and helpful.",
      });

      const chat = model.startChat({
        history: messages.map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        })),
      });

      const result = await chat.sendMessage(userMessage.text);
      const response = await result.response;
      const text = response.text();

      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: text || "Sorry, I could not generate a response.",
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          text: "Error generating response. Please check your API key.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Browser TTS (since Gemini SDK doesn't support TTS)
  const handleTTS = (messageId: string, text: string) => {
    if (isSpeaking === messageId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(null);

    setIsSpeaking(messageId);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all z-40 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-300 z-50 overflow-hidden ${
          isOpen
            ? "scale-100 opacity-100 h-[600px] max-h-[calc(100vh-6rem)]"
            : "scale-95 opacity-0 h-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <h3 className="font-bold">Election AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="bg-slate-50 border-b px-4 py-2 flex space-x-2">
          <button
            onClick={() => setMode("fast")}
            className={`flex-1 py-1 text-xs rounded ${
              mode === "fast" ? "bg-amber-100 text-amber-700" : ""
            }`}
          >
            <Zap className="h-4 w-4 inline mr-1" />
            Fast
          </button>
          <button
            onClick={() => setMode("pro")}
            className={`flex-1 py-1 text-xs rounded ${
              mode === "pro" ? "bg-blue-100 text-blue-700" : ""
            }`}
          >
            <Bot className="h-4 w-4 inline mr-1" />
            Pro
          </button>
          <button
            onClick={() => setMode("think")}
            className={`flex-1 py-1 text-xs rounded ${
              mode === "think" ? "bg-purple-100 text-purple-700" : ""
            }`}
          >
            <Brain className="h-4 w-4 inline mr-1" />
            Think
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border shadow-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>

                {msg.role === "model" && (
                  <button
                    onClick={() => handleTTS(msg.id, msg.text)}
                    className="mt-2 text-xs text-slate-400 hover:text-blue-600 flex items-center space-x-1"
                  >
                    {isSpeaking === msg.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Volume2 className="h-3 w-3" />
                    )}
                    <span>
                      {isSpeaking === msg.id ? "Stop" : "Read aloud"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="text-sm text-slate-400 flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-white">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about election data..."
              className="w-full pl-4 pr-12 py-3 bg-slate-100 rounded-xl text-sm resize-none h-12"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-2 h-8 w-8 bg-blue-600 text-white rounded-lg flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </>
  );
}