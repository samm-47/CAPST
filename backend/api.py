import os
import torch
from transformers import pipeline


# Set your Hugging Face token as an environment variable
os.environ['HUGGINGFACE_TOKEN'] = 'your_token_here'  # Replace with your actual token


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




    # Add user input to the conversation history
    conversation_history.append({"role": "user", "content": user_input})


    # Generate a prompt based on the conversation history
    prompt = "You are a knowledgeable real estate agent. Respond to the user's inquiries with accurate and helpful information.\n"
    for message in conversation_history:
        prompt += f"{message['role'].capitalize()}: {message['content']}\n"


    # Generate the response
    outputs = pipe(
        prompt,
        max_new_tokens=100,
    )


    # Get the chatbot's response
    bot_response = outputs[0]['generated_text'].split("Bot:")[-1].strip()
    print(f"Chatbot: {bot_response}")


    # Add the bot's response to the conversation history
    conversation_history.append({"role": "bot", "content": bot_response})