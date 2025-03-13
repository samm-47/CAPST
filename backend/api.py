from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from flask_cors import CORS
from langdetect import detect
from dotenv import load_dotenv
import time
import subprocess
import logging

# Initialize Flask app
app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
# Function to decrypt the .env file
load_dotenv()

# Retrieve API keys from the environment variables
API_KEYS = [
    os.environ.get("GENAI_API_KEY_1"),
    os.environ.get("GENAI_API_KEY_2"),
]

# Initial API key index
current_api_key_index = 0

# Function to get the current API key
def get_current_api_key():
    return API_KEYS[current_api_key_index]

# Function to switch to the next API key
def switch_api_key():
    global current_api_key_index
    current_api_key_index = (current_api_key_index + 1) % len(API_KEYS)

# Configure the Generative AI model
def configure_genai():
    genai.configure(api_key=get_current_api_key())
    return genai.GenerativeModel("gemini-1.5-flash-8b")

# Define a route for the chatbot interaction
chat_history = [
    {"role": "user", "parts": "Hello, you are a chatbot designed to help users with sustainability related questions."},
    {"role": "model", "parts": "Hello! How can I help you with sustainability?"}  # Shortened response
]

# Language detection function
def detect_language(text):
    try:
        return detect(text)
    except:
        return 'en'  # Default to English

@app.route('/api/chat', methods=['POST'])
def chat_with_bot():
    global chat_history
    data = request.get_json()
    user_question = data.get('question') + " Please respond in no more than 200 words. Output in sentences."

    if not user_question:
        return jsonify({"error": "Question is required"}), 400

    # Detect language
    language = detect_language(user_question)
    logging.info(f"Detected language: {language}")

    # If the detected language is not English, include it in the system instructions
    if language != 'en':
        chat_history.insert(0, {"role": "system", "parts": f"Respond in {language}."})

    # Append the user's question to the chat history
    chat_history.append({"role": "user", "parts": user_question})

    logging.info(f"User question: {user_question}")

    try:
        # Create a new chat session
        model = configure_genai()  # Reconfigure the model with the current API key
        chat_session = model.start_chat(history=chat_history)

        # Generate a response from the model using send_message
        response = chat_session.send_message(user_question)
        
    except Exception as e:
        # If rate limit error (or other error), switch the API key and retry
        if 'rate limit' in str(e).lower():  # You can refine this check depending on the error message
            logging.warning(f"Rate limit reached for API Key {get_current_api_key()}. Switching to the next key.")
            switch_api_key()  # Switch to the next API key
            time.sleep(2)  # Optional: Wait a little before retrying
            return chat_with_bot()  # Retry with the new API key
        else:
            logging.error(f"Error calling chat model: {str(e)}")
            return jsonify({"error": "Failed to communicate with the model."}), 500

    response_text = response.text if hasattr(response, 'text') else "No response text available"
    logging.info(f"Model response: {response_text}")

    # Append the model's response to the chat history
    chat_history.append({"role": "model", "parts": response_text})

    return jsonify({"response": response_text})


@app.route('/api/chat/calc', methods=['POST'])
def chat():
    data = request.get_json()  # Get the data sent from the frontend
    score = data.get('score')
    print(score)

    # Ensure that the score is provided
    if not score:
        return jsonify({"error": "Score is required"}), 400

    # Construct the user's question or prompt based on the score
    user_question = f"Given the sustainability score of {score}, explain to the user, how they can improve to be more sustainable for their home and lifestyle. The ranking is A - F and S is perfect. Output in 100 words and in sentences. Spacing should be 1.5. Use sources to support your response."

    logging.info(f"User question: {user_question}")

    try:
        # Start a chat session with the AI model
        model = configure_genai()  # Reconfigure the model with the current API key
        chat_session = model.start_chat(history=[])  # You can pass an empty chat history if not needed

        # Generate a response from the model using the user question
        response = chat_session.send_message(user_question)
        
    except Exception as e:
        # Handle errors like rate limit or other issues
        if 'rate limit' in str(e).lower():
            logging.warning(f"Rate limit reached for API Key {get_current_api_key()}. Switching to the next key.")
            switch_api_key()  # Switch to the next API key
            time.sleep(2)  # Optional: Wait before retrying
            return chat()  # Retry with the new API key
        else:
            logging.error(f"Error calling chat model: {str(e)}")
            return jsonify({"error": "Failed to communicate with the model."}), 500

    # Get the response text from the model
    response_text = response.text if hasattr(response, 'text') else "No response text available"
    logging.info(f"Model response: {response_text}")

    # Return the AI-generated response
    return jsonify({"response": response_text})

@app.route('/api/generate_title', methods=['POST'])
def generate_title():
    data = request.get_json()
    user_input = data.get('input')

    if not user_input:
        return jsonify({"error": "Input is required"}), 400

    # Construct a prompt for the AI to generate a title
    prompt = f"Generate a concise and relevant title for a chat session based on the following user input: '{user_input}'. The title should be no more than 5 words."

    try:
        model = configure_genai()  # Reconfigure the model with the current API key
        chat_session = model.start_chat(history=[])  # Start a new chat session

        # Generate a response from the model using the prompt
        response = chat_session.send_message(prompt)
        
    except Exception as e:
        if 'rate limit' in str(e).lower():
            logging.warning(f"Rate limit reached for API Key {get_current_api_key()}. Switching to the next key.")
            switch_api_key()  # Switch to the next API key
            time.sleep(2)  # Optional: Wait before retrying
            return generate_title()  # Retry with the new API key
        else:
            logging.error(f"Error calling chat model: {str(e)}")
            return jsonify({"error": "Failed to communicate with the model."}), 500

    response_text = response.text if hasattr(response, 'text') else "No response text available"
    logging.info(f"Generated title: {response_text}")

    return jsonify({"title": response_text.strip()})


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

    
