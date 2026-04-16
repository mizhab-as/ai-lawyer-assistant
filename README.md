# ⚖️ AI Lawyer Assistant

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/flask-3.0-green.svg)](https://flask.palletsprojects.com/)

AI-powered legal guidance assistant that answers legal questions and explains relevant **Indian laws** using large language models. Powered by OpenAI's GPT API for intelligent, context-aware legal information.

> **⚠️ IMPORTANT DISCLAIMER**  
> This tool provides **general informational guidance only** and does **NOT** constitute professional legal advice. Always consult a qualified advocate or licensed attorney for specific legal matters affecting your rights or obligations.

---

## 🎯 Overview

The AI Lawyer Assistant is a modern web application designed to provide accessible legal information about Indian legal frameworks. It combines a clean, intuitive chat interface with powerful LLM capabilities to help users understand their legal rights and obligations.

**Key Strengths:**
- Expert knowledge base covering major Indian legal frameworks
- Real-time responses powered by OpenAI's advanced language models
- Professional dark-themed UI with responsive design
- Emphasis on legal disclaimers and user protection
- Easily extensible architecture for future enhancements

---

## ✨ Features

### Core Features
- **💬 Intelligent Chat Interface** — Natural language Q&A for legal questions
- **🇮🇳 Indian Law Expertise** — Comprehensive coverage of:
  - Indian Penal Code (IPC) & Code of Criminal Procedure (CrPC)
  - Consumer Protection Act, 2019
  - Residential Tenancy & Rent Control Laws
  - Employment & Labour Rights (Industrial Disputes Act, Shops & Establishment Acts)
  - Cyber Laws (Information Technology Act, 2000)
  - Family Law (Hindu Marriage Act, Muslim Personal Law, Special Marriage Act)
  - Motor Vehicles Act
  - Right to Information (RTI) Act

### User Experience
- **⚠️ Safety-First Design** — Prominent disclaimer on every response
- **📱 Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- **🎨 Professional Dark Theme** — Easy on the eyes with elegant gold accents
- **⚡ Real-time Responses** — Streaming chat with typing indicators
- **🔤 Character Counter** — Track message length (max 2000 characters)

### Technical Features
- **🔒 Secure Configuration** — Environment-based secrets management
- **📦 Modular Architecture** — Flask blueprints for easy extension
- **🧪 Production-Ready** — Configurable for development and production
- **📝 Comprehensive Logging** — Better debugging and monitoring
- **⚙️ Environment Variables** — Flexible model and API key configuration

---

## 📋 Prerequisites

- **Python 3.9+** (recommended: Python 3.10 or newer)
- **OpenAI API Key** — Get one at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **pip** (comes with Python)
- **Git** (for cloning the repository)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/mizhab-as/ai-lawyer-assistant.git
cd ai-lawyer-assistant
```

### 2. Create Virtual Environment

```bash
# macOS / Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your settings
```

Edit `.env` and add your configuration:

```env
# Required: Your OpenAI API key
OPENAI_API_KEY=sk-your-actual-key-here

# Required: Flask secret key (use a random string)
FLASK_SECRET_KEY=your-secure-random-string-here

# Optional: Flask environment (development or production)
FLASK_ENV=development

# Optional: OpenAI model (defaults to gpt-4o-mini)
OPENAI_MODEL=gpt-4o-mini

# Optional: Server port (defaults to 5000)
PORT=5000
```

**To generate a secure Flask secret key:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### 5. Run the Application

```bash
# Start the development server
python app.py

# The app will be available at http://localhost:5000
```

---

## 📁 Project Structure

```
ai-lawyer-assistant/
├── app.py                    # Flask application factory and entry point
├── config.py                 # Configuration class with system prompts
├── requirements.txt          # Python dependencies (pip format)
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── README.md                 # This file
├── routes/
│   ├── __init__.py           # Routes package marker
│   └── chat.py               # /api/chat endpoint handler
├── templates/
│   └── index.html            # Main chat UI (Jinja2 template)
└── static/
    ├── css/
    │   └── style.css         # Styling (dark professional theme)
    └── js/
        └── main.js           # Frontend chat logic and interactions
```

### File Descriptions

| File | Purpose |
|------|---------|
| `app.py` | Flask application factory; initializes app, registers blueprints, configures logging |
| `config.py` | Config class with API keys, system prompt for legal AI, and model parameters |
| `routes/chat.py` | Handles `/api/chat` POST requests; manages OpenAI API communication |
| `templates/index.html` | Single-page chat interface with disclaimer and example prompts |
| `static/css/style.css` | Complete styling for dark theme with gold accents |
| `static/js/main.js` | Chat logic, message formatting, textarea auto-resize, error handling |

---

## 🔧 Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | Yes | — | Your OpenAI API key for GPT access |
| `FLASK_SECRET_KEY` | Yes | — | Secret key for Flask session security |
| `FLASK_ENV` | No | `production` | Set to `development` for debug mode |
| `OPENAI_MODEL` | No | `gpt-4o-mini` | Model to use (gpt-4, gpt-4o, etc.) |
| `PORT` | No | `5000` | Server port |

### System Prompt Customization

Edit the `SYSTEM_PROMPT` in `config.py` to customize the AI's legal expertise or add new practice areas.

---

## 💻 API Endpoints

### POST /api/chat

**Request:**
```json
{
  "message": "My landlord is refusing to return my security deposit. What are my rights?"
}
```

**Response (Success):**
```json
{
  "reply": "Under Indian law, specifically the Indian Contract Act..."
}
```

**Response (Error):**
```json
{
  "error": "API key not configured. Please set OPENAI_API_KEY in your .env file."
}
```

**Status Codes:**
- `200` — Success
- `400` — Bad request (missing or empty message)
- `500` — Server error (missing API key or config issue)
- `502` — OpenAI API error (rate limit, service issue, etc.)

---

## 🎨 Design & Theme

**Dark Professional Theme:**
- **Background**: Deep black (#0f0f0f) for reduced eye strain
- **Primary Color**: Elegant gold (#d4af37) for professional appearance
- **Text**: Light gray (#e8e8e8) for optimal contrast
- **Accent**: Premium gold borders and highlights
- **Responsive**: Mobile-first design works on all screen sizes

---

## 🏗️ Development & Extensibility

### Running in Development Mode

```bash
FLASK_ENV=development python app.py
```

Benefits:
- Debug mode enabled (auto-reload on file changes)
- Detailed error messages
- Interactive Flask debugger

### Production Deployment

```bash
FLASK_ENV=production python app.py
```

Or use a WSGI server like Gunicorn:

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:application
```

### Adding New Routes

Create a new blueprint in `routes/` and register it in `app.py`:

```python
from routes.new_feature import new_bp
app.register_blueprint(new_bp)
```

### Customizing the Legal Knowledge Base

Edit the `SYSTEM_PROMPT` in `config.py` to:
- Add new areas of Indian law
- Adjust response style
- Update disclaimers
- Refine legal reasoning approach

---

## 🧪 Testing

Run Python syntax checks:

```bash
python -m py_compile app.py config.py routes/chat.py
```

Test Flask app initialization:

```bash
python -c "from app import create_app; app = create_app(); print('✓ App initialized')"
```

---

## 📦 Dependencies

See `requirements.txt` for complete list:

- **Flask 3.0.3** — Web framework
- **OpenAI 1.30.1** — LLM API client
- **httpx 0.27.2** — HTTP client (compatible with OpenAI)
- **python-dotenv 1.0.1** — Environment variable management
- **Gunicorn 22.0.0** — WSGI production server

**Important:** httpx is pinned to 0.27.2 for compatibility with OpenAI 1.30.1.

---

## 🚢 Deployment

### Heroku

```bash
heroku create your-app-name
heroku config:set OPENAI_API_KEY=sk-...
heroku config:set FLASK_SECRET_KEY=your-secret
git push heroku main
```

### Docker (Optional)

See `Dockerfile` (to be added) for containerized deployment.

### Environment-Specific Configuration

The app automatically detects and adapts to:
- **Development** (`FLASK_ENV=development`) — Debug mode, detailed logs
- **Production** (`FLASK_ENV=production`) — Error handling, optimized performance

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## ⚖️ Legal Notice

This application is provided as-is for educational and informational purposes. Users are responsible for verifying any information obtained through this tool with qualified legal professionals. The developers and maintainers of this project assume no liability for the accuracy or completeness of legal information provided.

**Always consult a licensed attorney for:**
- Specific legal advice
- Contract review
- Court representation
- Official legal filings
- Complex legal matters

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mizhabas** — AI & Software Development  
[GitHub](https://github.com/mizhab-as) | [LinkedIn](https://linkedin.com)

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- Open an [issue on GitHub](https://github.com/mizhab-as/ai-lawyer-assistant/issues)
- Check existing documentation
- Review the project's GitHub discussions

---

## 🎓 Learning Resources

**Indian Legal System:**
- [Indian Penal Code](https://www.ipc.gov.in/)
- [Supreme Court of India](https://main.sci.gov.in/)
- [Consumer Protection Act, 2019](https://consumeraffairs.gov.in/)
- [RTI Portal](https://rtionline.gov.in/)

**Development:**
- [Flask Documentation](https://flask.palletsprojects.com/)
- [OpenAI API Guide](https://platform.openai.com/docs/)
- [Python Docs](https://docs.python.org/3/)

---

**Last Updated:** April 2026  
**Version:** 1.0.0

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
