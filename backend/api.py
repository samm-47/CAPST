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

