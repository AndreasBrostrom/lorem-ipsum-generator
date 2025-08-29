#!/bin/bash

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
rm -rf "$PROJECT_ROOT/venv"

if [[ ! -d "$PROJECT_ROOT/venv" ]]; then
    python -m venv "$PROJECT_ROOT/venv"
    source "$PROJECT_ROOT/venv/bin/activate"
    pip install -r "$PROJECT_ROOT/requirements.txt"
else
    source "$PROJECT_ROOT/venv/bin/activate"
fi

python3 "$PROJECT_ROOT/src/main.py" --debug