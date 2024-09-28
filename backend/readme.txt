This project is designed to demonstrate a basic RESTful API built with Flask and includes 
provisions for future expansion to integrate a Large Language Model (LLM) for natural 
language processing. Below are the instructions to install necessary libraries and test the API.

Required Libraries for the API:
pip install flask 
pip install flask-restful
pip install flask-httpauth

For LLM(This is unused currently):
Although the LLM component is not in use at the moment, you can install these libraries for future use:
pip install torch torchvision torchaudio
pip install transformers
pip install tokenizers
pip install tqdm
pip install pandas

After installing the required libraries, follow these steps to run the API:

python api.py

Testing:
Split the terminal and open Bash. Paste in this curl command below.
This an example of what to use
curl http://127.0.0.1:5000/api/records