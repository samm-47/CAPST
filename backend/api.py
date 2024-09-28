from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__)
api = Api(app)
auth = HTTPBasicAuth()

# Sample user data for demonstration (username: 'user', password: 'password')
users = {
    "user": "password"
}

# Simple record storage
records = []

# Dummy function for user authentication
@auth.verify_password
def verify_password(username, password):
    if username in users and users[username] == password:
        return username
    return None

class RecordList(Resource):
    def get(self):
        return {"records": records}

    def post(self):
        new_record = request.get_json()

        # Validation of input data
        if not new_record or 'name' not in new_record:
            return {"error": "Invalid data"}, 400  # 400 Bad Request

        new_record['id'] = len(records) + 1
        records.append(new_record)
        return new_record, 201

class Record(Resource):
    def get(self, record_id):
        record = next((r for r in records if r['id'] == record_id), None)
        if record:
            return record
        return {"message": "Record not found"}, 404  # 404 Not Found

    @auth.login_required  # Require authentication for PUT and DELETE
    def put(self, record_id):
        record = next((r for r in records if r['id'] == record_id), None)
        if not record:
            return {"message": "Record not found"}, 404  # 404 Not Found

        updated_data = request.get_json()
        if not updated_data or 'name' not in updated_data:
            return {"error": "Invalid data"}, 400  # 400 Bad Request

        record.update(updated_data)
        return record

    @auth.login_required  # Require authentication for DELETE
    def delete(self, record_id):
        global records
        record = next((r for r in records if r['id'] == record_id), None)
        if not record:
            return {"message": "Record not found"}, 404  # 404 Not Found
        
        records = [r for r in records if r['id'] != record_id]
        return {"message": "Record deleted"}

# Add API resource routing
api.add_resource(RecordList, '/api/records')
api.add_resource(Record, '/api/records/<int:record_id>')

if __name__ == '__main__':
    app.run(debug=True)
