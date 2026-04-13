/* AI Lawyer Assistant — Frontend Chat Logic */

(function () {
  "use strict";

  const chatMessages  = document.getElementById("chatMessages");
  const chatForm      = document.getElementById("chatForm");
  const userInput     = document.getElementById("userInput");
  const sendBtn       = document.getElementById("sendBtn");
  const charCount     = document.getElementById("charCount");
  const examplePrompts = document.getElementById("examplePrompts");

  /* ── Auto-resize textarea ── */
  userInput.addEventListener("input", () => {
    userInput.style.height = "auto";
    userInput.style.height = Math.min(userInput.scrollHeight, 140) + "px";
    charCount.textContent = userInput.value.length + " / 2000";
  });

  /* ── Example prompt buttons ── */
  examplePrompts.querySelectorAll(".example-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      userInput.value = btn.dataset.prompt;
      userInput.dispatchEvent(new Event("input"));
      userInput.focus();
    });
  });

  /* ── Submit on Enter (Shift+Enter = newline) ── */
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chatForm.requestSubmit();
    }
  });

  /* ── Form submit ── */
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (!text) return;

    // Hide example prompts after first message
    examplePrompts.style.display = "none";

    appendMessage("user", text);
    userInput.value = "";
    userInput.style.height = "auto";
    charCount.textContent = "0 / 2000";
    setLoading(true);

    const typingEl = appendTypingIndicator();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      typingEl.remove();

      if (!response.ok || data.error) {
        appendMessage("error", data.error || "An unexpected error occurred. Please try again.");
      } else {
        appendMessage("bot", data.reply);
      }
    } catch (err) {
      typingEl.remove();
      appendMessage("error", "Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
      userInput.focus();
    }
  });

  /* ── Helpers ── */

  function setLoading(state) {
    sendBtn.disabled = state;
    userInput.disabled = state;
  }

  function appendMessage(role, text) {
    const isBot   = role === "bot";
    const isUser  = role === "user";
    const isError = role === "error";

    const row = document.createElement("div");
    row.className = "message" + (isUser ? " message--user" : isError ? " message--error" : " message--bot");

    const avatar = document.createElement("div");
    avatar.className = "message__avatar";
    avatar.textContent = isUser ? "You" : "⚖️";

    const bubble = document.createElement("div");
    bubble.className = "message__bubble";
    bubble.innerHTML = formatText(text);

    // Add inline disclaimer to every bot response
    if (isBot) {
      const disc = document.createElement("p");
      disc.className = "inline-disclaimer";
      disc.textContent = "⚠️ This is general information only and not legal advice. Consult a qualified advocate for your specific situation.";
      bubble.appendChild(disc);
    }

    row.appendChild(avatar);
    row.appendChild(bubble);
    chatMessages.appendChild(row);
    scrollToBottom();
    return row;
  }

  function appendTypingIndicator() {
    const row = document.createElement("div");
    row.className = "message message--bot";

    const avatar = document.createElement("div");
    avatar.className = "message__avatar";
    avatar.textContent = "⚖️";

    const bubble = document.createElement("div");
    bubble.className = "message__bubble typing-indicator";
    bubble.innerHTML = "<span></span><span></span><span></span>";

    row.appendChild(avatar);
    row.appendChild(bubble);
    chatMessages.appendChild(row);
    scrollToBottom();
    return row;
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /**
   * Convert plain text to safe HTML:
   * - Escape HTML entities
   * - Convert **bold** to <strong>
   * - Convert newlines to <br> or wrap paragraphs
   * - Convert numbered/bulleted lists
   */
  function formatText(raw) {
    // 1. Escape HTML
    let text = raw
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

    // 2. Bold **text**
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // 3. Split into paragraphs by double newline
    const paragraphs = text.split(/\n{2,}/);
    const parts = paragraphs.map((para) => {
      const lines = para.split("\n");

      // Detect list items starting with -, *, •, or digit (space after marker is optional).
      if (lines.every((l) => /^\s*([-*•]|\d+[.)]) ?/.test(l))) {
        const isOrdered = /^\s*\d+[.)]/.test(lines[0]);
        const tag = isOrdered ? "ol" : "ul";
        const items = lines
          .map((l) => "<li>" + l.replace(/^\s*([-*•]|\d+[.)]) ?/, "") + "</li>")
          .join("");
        return `<${tag}>${items}</${tag}>`;
      }

      // Otherwise join with <br>
      return "<p>" + lines.join("<br>") + "</p>";
    });

    return parts.join("");
  }
})();
