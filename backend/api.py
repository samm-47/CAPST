from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Retrieve API key from the environment variable
API_KEY = os.environ.get("GENAI_API_KEY")
if not API_KEY:
    raise ValueError("The API key for Google Gemini is not set.")

# Configure the Generative AI model
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# Define a route for the chatbot interaction
# Store the chat history in a global variable
chat_history = [
    {"role": "user", "parts": "Hello, you are a chatbot designed to help users with real-estate related questions."},
    {"role": "model", "parts": "Hello! How can I help you with real estate?"}  # Shortened response
]


@app.route('/api/chat', methods=['POST'])
def chat_with_bot():
    global chat_history
    data = request.get_json()
    user_question = data.get('question')+ "Please respond in no more than 200 words."

    if not user_question:
        return jsonify({"error": "Question is required"}), 400

    # Append the user's question to the chat history
    chat_history.append({"role": "user", "parts": user_question})

    try:
        # Create a new chat session
        chat_session = model.start_chat(history=chat_history)

        # Generate a response from the model using send_message
        response = chat_session.send_message(user_question)
    except Exception as e:
        print("Error calling chat model:", str(e))
        return jsonify({"error": "Failed to communicate with the model."}), 500

    
    response_text = response.text if hasattr(response, 'text') else "No response text available"



    # Append the model's response to the chat history
    chat_history.append({"role": "model", "parts": response_text})

    return jsonify({"response": response_text})


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
