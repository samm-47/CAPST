Download the following libraries to run
For api:
pip install flask 
pip install flask-restful
pip install flask-httpauth

For LLM(This is unused currently):
pip install torch torchvision torchaudio
pip install transformers
pip install tokenizers
pip install tqdm
pip install pandas

DONT RUN IN VS TERMINAL. Open command prompt as administrator, and run this command. 
pip install llama-stack


Go back to VS code terminal:
llama model list 

(IF THIS OUTPUTS, MOVE TO NEXT)

llama model download --source meta --model-id Llama3.2-90B-Vision-Instruct

After this line it will ask for link. Ask for API key



This an example of what to use
curl http://127.0.0.1:5000/api/records