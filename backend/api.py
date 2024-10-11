from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from transformers import AutoModelForCausalLM, AutoTokenizer

app = Flask(__name__)
api = Api(app)
auth = HTTPBasicAuth()

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
