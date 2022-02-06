import os

from flask import Flask, flash, request, redirect, url_for
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage

app = Flask(__name__)
api = Api(app)


UPLOAD_FOLDER = '/home/karan/python-projects/flask-react-test/server/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app, support_credentials=True)

TODOS = {
    'todo1': {'id': 'todo1', 'task': 'This is task 1'},
    'todo2': {'id': 'todo2', 'task': 'This is task 2'},
    'todo3': {'id': 'todo3', 'task': 'This is task 3'},
}

FILES = {
    'file1': {'title': 'Test title'}
}


def abort_if_todo_doesnt_exist(todo_id):
    if todo_id not in TODOS:
        abort(404, message="Todo {} doesn't exist".format(todo_id))


parser = reqparse.RequestParser()
parser.add_argument('task')


class Todo(Resource):
    def get(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)

        del TODOS[todo_id]
        return TODOS, 200

    def put(self, todo_id):
        args = parser.parse_args()

        task = {'id': todo_id, 'task': args['task']}
        TODOS[todo_id] = task
        return TODOS, 201


class TodoList(Resource):
    def get(self):
        return TODOS

    def post(self):
        args = parser.parse_args()

        todo_id = int(max(TODOS.keys()).lstrip('todo')) + 1
        todo_id = 'todo%i' % todo_id

        TODOS[todo_id] = {'id': todo_id, 'task': args['task']}
        return TODOS, 201


class FileUpload(Resource):
    def post(self):
        parser.add_argument("file", type=FileStorage, location='files')
        parser.add_argument('title')

        args = parser.parse_args()

        file = args.get("file")
        print(file)
        file_id = int(max(FILES.keys()).lstrip('file')) + 1
        file_id = 'file%i' % file_id
        FILES[file_id] = {'title': args['title']}

        file.save(os.path.join(UPLOAD_FOLDER, secure_filename(file.filename)))
        return FILES, 201


api.add_resource(TodoList, '/todos')
api.add_resource(Todo, '/todos/<todo_id>')
api.add_resource(FileUpload, '/upload')


if __name__ == '__main__':
    app.run(debug=True)
