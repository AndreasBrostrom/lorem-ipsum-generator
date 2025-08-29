# Lorem Ipsum Generator

## Build Instructions

1. Create and activate a Python virtual environment:
	```bash
	python -m venv venv
	source venv/bin/activate
	```

2. Install dependencies:
	```bash
	pip install -r requirements.txt
	```

3. (Optional) Prepare a build directory:
	```bash
	mkdir build
	cp -R ./src ./build/.
	cp -R ./venv ./build/.
	```

4. For production, use Gunicorn:
	```bash
	source venv/bin/activate
	gunicorn --bind 0.0.0.0:8000 src.main:app
	```

## Running the App

For development (with live reload):
```bash
python src/main.py --debug
```

For production:
```bash
gunicorn --bind 0.0.0.0:8000 src.main:app
```

## API Arguments

### HTTP GET Parameters

- `paragraphs`: Number of sentences to generate (default: 5)
- `min`: Minimum number of words per sentence (default: 3)
- `max`: Maximum number of words per sentence (default: 25)

Example:
```
http://localhost:5000/?paragraphs=3&min=5&max=10
```

### Command Line Arguments

- `--debug`: Run the Flask app in debug mode (auto-reload on code changes)

## Notes

- For production, always use Gunicorn or another WSGI server.
- The app will randomly add commas, exclamation marks, and question marks to sentences for more natural output.
