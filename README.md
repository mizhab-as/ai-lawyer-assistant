# ⚖️ AI Lawyer Assistant

AI-powered legal guidance assistant that answers legal questions and explains relevant **Indian laws** using large language models.

> **Disclaimer:** This tool provides general informational guidance only and does **not** constitute legal advice. Always consult a qualified advocate for your specific situation.

---

## Features

- 💬 Chat-style web interface for asking legal questions in natural language
- 🇮🇳 Specialised in Indian legal frameworks:
  - Indian Penal Code (IPC) & CrPC
  - Consumer Protection Act, 2019
  - Tenancy & Rent Control Laws
  - Employment & Labour Rights
  - Cyber Laws (IT Act 2000)
  - Family Law & Property Rights
  - RTI Act & more
- ⚠️ Prominent disclaimer on every response
- 📦 Modular backend — ready to extend with document analysis or case law retrieval

---

## Project Structure

```
ai-lawyer-assistant/
├── app.py               # Flask application entry point
├── config.py            # Configuration & LLM system prompt
├── requirements.txt     # Python dependencies
├── .env.example         # Environment variable template
├── .gitignore
├── README.md
├── routes/
│   ├── __init__.py
│   └── chat.py          # /api/chat endpoint
├── templates/
│   └── index.html       # Chat UI (Jinja2 template)
└── static/
    ├── css/
    │   └── style.css    # Styles
    └── js/
        └── main.js      # Frontend chat logic
```

---

## Prerequisites

- Python 3.9+
- An [OpenAI API key](https://platform.openai.com/api-keys) (or a compatible API key)

---

## Setup & Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/mizhab-as/ai-lawyer-assistant.git
cd ai-lawyer-assistant
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv
# macOS / Linux
source venv/bin/activate
# Windows
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and set your values:

```env
OPENAI_API_KEY=sk-...your-key...
FLASK_SECRET_KEY=some-random-secret-string
FLASK_ENV=development
# OPENAI_MODEL=gpt-4o-mini   # optional override
```

### 5. Run the development server

```bash
python app.py
```

Open your browser at **http://localhost:5000**.

---

## Example Questions to Try

- *"My landlord is refusing to return my security deposit. What are my rights?"*
- *"I bought a defective product online. What can I do under the Consumer Protection Act?"*
- *"My employer hasn't paid my salary for two months. What legal action can I take?"*
- *"Someone is harassing me on social media. Which sections of the IT Act apply?"*
- *"What are my rights if I am arrested by police in India?"*
- *"How do I file an RTI application?"*

---

## API Reference

### `POST /api/chat`

**Request body:**
```json
{ "message": "Your legal question here" }
```

**Success response (`200`):**
```json
{ "reply": "AI-generated legal guidance..." }
```

**Error response (`400` / `500` / `502`):**
```json
{ "error": "Description of the error" }
```

---

## Extending the Project

The modular structure makes it easy to add new capabilities:

| Module | File to add |
|---|---|
| Legal document analysis | `routes/documents.py` |
| Case law retrieval | `routes/caselaw.py` |
| Multi-turn conversation | Extend `routes/chat.py` with session history |
| Alternative LLM provider | Update `config.py` and `routes/chat.py` |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python / Flask |
| LLM Integration | OpenAI API (`openai` Python SDK) |
| Frontend | HTML5 / CSS3 / Vanilla JavaScript |
| Configuration | `python-dotenv` |
| Production server | Gunicorn |

---

## License

MIT
