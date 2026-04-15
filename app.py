"""AI Lawyer Assistant — Flask application entry point."""

import os
from flask import Flask, render_template
from config import Config
from routes.chat import chat_bp


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Register blueprints
    app.register_blueprint(chat_bp)

    @app.route("/")
    def index():
        return render_template("index.html")

    return app


if __name__ == "__main__":
    application = create_app()
    debug_mode = os.environ.get("FLASK_ENV", "production") == "development"
    port = int(os.environ.get("PORT", "5000"))
    application.run(debug=debug_mode, host="0.0.0.0", port=port)
