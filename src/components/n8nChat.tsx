"use client";

import { useEffect } from "react";
import "./n8n-chat.css";

export default function N8nChat() {
  useEffect(() => {
    let disposed = false;

    const closeButtonListener = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;
      if (!target.closest(".chat-close-button")) return;

      event.preventDefault();
      event.stopPropagation();

      const toggle = document.querySelector<HTMLElement>(
        "#n8n-chat .chat-window-toggle",
      );
      toggle?.click();
    };

    (async () => {
      const { createChat } = await import("@n8n/chat");
      if (disposed) return;

      createChat({
        webhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK!,
        target: '#n8n-chat',
       	mode: 'window',
       	showWindowCloseButton: true,
       	chatInputKey: 'chatInput',
       	chatSessionKey: 'sessionId',
       	loadPreviousSession: true,
       	metadata: {},
       	showWelcomeScreen: false,
        defaultLanguage: 'en',
        initialMessages: [
        	'Hi there! 👋',
        	'My name is Naim Ai. How can I assist you today?'
       	],
        i18n: {
        	en: {
       		title: 'Naim AI',
       		subtitle: "💡 This AI is hosted on a free server, so the first response may take 10–30 seconds. Thanks for your patience!",
       		footer: 'Backend • DevOps • AI Engineering',
       		getStarted: 'New Conversation',
            inputPlaceholder: 'Ask me anything...',
       		closeButtonTooltip: '',
        	},
      	},
      });

      document.addEventListener("click", closeButtonListener, true);
    })();

    return () => {
      disposed = true;
      document.removeEventListener("click", closeButtonListener, true);
    };
  }, []);

  return null;
}
