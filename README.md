# How to Run

## Step 1: Create a virtual environment and install dependencies

I am using miniconda to manage virtual environments. Other alternatives like venv, virtualenv or pipenv can be used instead.

```
conda create --name flask-rest python=3.8
```

```
conda activate flask-rest
```

```
pip install -r requirements.txt
```

## Step 2: Export variables

Git Bash:

```
export FLASK_APP=api
export FLASK_ENV=development
```

Powershell:

```
$env:FLASK_APP = "api"
$env:FLASK_ENV = "development"
```

## Step 3: Start server

```
cd server
```

```
flask run
```

## Step 4: Install dependencies and run frontend

```
cd ../client
```

Use npm or yarn to install the dependencies

```
yarn install
```

```
yarn start
```
