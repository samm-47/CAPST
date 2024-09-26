from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

records = ["Example 1"]

class RecordList(Resource):
    def get(self):
        return {"records": records}

    def post(self):
        new_record = request.get_json()
        new_record['id'] = len(records) + 1
        records.append(new_record)
        return new_record, 201

class Record(Resource):
    def get(self, record_id):
        record = next((r for r in records if r['id'] == record_id), None)
        if record:
            return record
        return {"message": "Record not found"}, 404

    def put(self, record_id):
        record = next((r for r in records if r['id'] == record_id), None)
        if record:
            updated_data = request.get_json()
            record.update(updated_data)
            return record
        return {"message": "Record not found"}, 404

    def delete(self, record_id):
        global records
        records = [r for r in records if r['id'] != record_id]
        return {"message": "Record deleted"}

# Add API resource routing
api.add_resource(RecordList, '/api/records')
api.add_resource(Record, '/api/records/<int:record_id>')

if __name__ == '__main__':
    app.run(debug=True)
