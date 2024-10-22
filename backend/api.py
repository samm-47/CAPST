import google.generativeai as genai
import os

# Retrieve API key from the environment variable
API_KEY = os.environ.get("GENAI_API_KEY")
genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Write a story about a magic backpack.")
print(response.text)
