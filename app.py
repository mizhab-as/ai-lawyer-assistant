"""AI Lawyer Assistant — Flask application entry point."""

import os
import logging
from flask import Flask, render_template
from config import Config
from routes.chat import chat_bp


def create_app(config_class=Config):
    """Create and configure the Flask application.
    
    Args:
        config_class: Configuration class to use (default: Config)
    
    Returns:
        Configured Flask application instance
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )

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
    
    if debug_mode:
        application.logger.info("Starting Flask app in DEBUG mode on port %d", port)
    else:
        application.logger.info("Starting Flask app in PRODUCTION mode on port %d", port)
    
    application.run(debug=debug_mode, host="0.0.0.0", port=port)
