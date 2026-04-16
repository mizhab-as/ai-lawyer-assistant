"""Chat route — handles user queries and proxies them to the LLM API."""

import logging
from flask import Blueprint, request, jsonify, current_app
from openai import OpenAI, OpenAIError

chat_bp = Blueprint("chat", __name__)
logger = logging.getLogger(__name__)


def _get_client():
    """Return an OpenAI client configured with the current app's API key."""
    return OpenAI(api_key=current_app.config["OPENAI_API_KEY"])


@chat_bp.route("/api/chat", methods=["POST"])
def chat():
    """Accept a JSON body ``{"message": "..."}`` and return an AI response."""
    data = request.get_json(silent=True)
    if not data or not data.get("message", "").strip():
        return jsonify({"error": "Message is required."}), 400

    user_message = data["message"].strip()

    if not current_app.config.get("OPENAI_API_KEY"):
        return jsonify({"error": "API key not configured. Please set OPENAI_API_KEY in your .env file."}), 500

    try:
        client = _get_client()
        completion = client.chat.completions.create(
            model=current_app.config["OPENAI_MODEL"],
            messages=[
                {"role": "system", "content": current_app.config["SYSTEM_PROMPT"]},
                {"role": "user", "content": user_message},
            ],
            # Lower temperature for more deterministic, consistent legal information
            temperature=0.4,
            max_tokens=1024,
        )
        reply = completion.choices[0].message.content
        return jsonify({"reply": reply})

    except OpenAIError as exc:
        current_app.logger.error("OpenAI API error: %s", exc)
        return jsonify({"error": "Failed to get a response from the AI service. Please try again later."}), 502

    except Exception as exc:  # pylint: disable=broad-except
        current_app.logger.error("Unexpected error: %s", exc)
        return jsonify({"error": "An unexpected error occurred."}), 500
