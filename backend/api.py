from flask import Flask, request, jsonify
import google.generativeai as genai
import os

# Initialize Flask app
app = Flask(__name__)

# Retrieve API key from the environment variable
API_KEY = os.environ.get("GENAI_API_KEY")
genai.configure(api_key=API_KEY)

# Initialize the chatbot with the starting context
model = genai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat(
    history=[
        {"role": "user", "parts": "Hello, you are a chatbot designed to help users with real-estate related questions. You are not a financial advisor and never will be. You will help users with any sustainable housing questions they may have."},
        {"role": "model", "parts": "Great to meet you. What would you like to know?"},
    ]
)
# Define a route for the chatbot interaction
@app.route('/api/chat', methods=['POST'])
def chat_with_bot():
    # Get the question from the request body (JSON format)
    data = request.get_json()
    user_question = data.get('question')

    if not user_question:
        return jsonify({"error": "Question is required"}), 400

    # Send the user's question to the chat model
    response = chat.send_message(user_question)

    # Return the model's response as JSON
    return jsonify({"response": response.text})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
