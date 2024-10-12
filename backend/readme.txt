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

<<<<<<< HEAD
DONT RUN IN VS TERMINAL. Open command prompt as administrator, and run this command. 
pip install llama-stack


Go back to VS code terminal:
llama model list 

(IF THIS OUTPUTS, MOVE TO NEXT)

llama model download --source meta --model-id Llama3.2-90B-Vision-Instruct

After this line it will ask for link. Ask for API key


=======
After installing the required libraries, follow these steps to run the API:
>>>>>>> 9194a9f07537f3ae079181f87e84e213fc6eea00

python api.py

Testing:
Split the terminal and open Bash. Paste in this curl command below.
This an example of what to use
curl http://127.0.0.1:5000/api/records