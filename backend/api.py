<<<<<<< HEAD
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from transformers import AutoModelForCausalLM, AutoTokenizer
=======
import os
import torch
from transformers import pipeline
>>>>>>> 9194a9f07537f3ae079181f87e84e213fc6eea00

# Set your Hugging Face token as an environment variable
os.environ['HUGGINGFACE_TOKEN'] = 'your_token_here'  # Replace with your actual token

<<<<<<< HEAD
# Load the model and tokenizer when the app starts
tokenizer = AutoTokenizer.from_pretrained("Llama-3.2-3B")
model = AutoModelForCausalLM.from_pretrained("Llama-3.2-3B")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get("input")
    
    # Generate response from Llama model
    response = generate_response(user_input)
    
    return jsonify({"response": response})

def generate_response(input_text):
    inputs = tokenizer(input_text, return_tensors="pt")
    outputs = model.generate(**inputs)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# Sample user data for demonstration (username: 'user', password: 'password')
users = {
    "user": "password"
}

# Simple record storage
records = {
    "GreenExpectations Capstone Team": ["Diego", "Ethan", "Samir", "Jared"]
}

class Record(Resource):
    def get(self, record_id):
        record = next((r for r in records if r['id'] == record_id), None)
        if record:
            return record
        return {"message": "Record not found"}, 404  # 404 Not Found

    @auth.login_required  # Require authentication for PUT and DELETE

# Add API resource routing
api.add_resource(RecordList, '/api/records')
api.add_resource(Record, '/api/records/<int:record_id>')

if __name__ == '__main__':
    app.run(debug=True)
=======
# Define the model ID for LLaMA
model_id = "meta-llama/Llama-3.2-3B-Instruct"

# Set up the text generation pipeline
pipe = pipeline(
    "text-generation",
    model=model_id,
    torch_dtype=torch.bfloat16,
    device=-1,
)
# Initialize a conversation context
conversation_history = []


# Start the conversation loop
print("Welcome to the Real Estate Chatbot! You can ask me anything about real estate. Type 'exit' to stop.")

while True:
    user_input = input("You: ")
   
    if user_input.lower() == 'exit':
        print("Chatbot: Goodbye! If you have more questions, feel free to ask.")
        break
>>>>>>> 9194a9f07537f3ae079181f87e84e213fc6eea00
