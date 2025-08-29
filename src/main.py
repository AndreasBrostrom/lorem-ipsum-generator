#!/usr/bin/env python3
import sys
import random
from flask import Flask, request, Response

app = Flask(__name__)

WORDS = [
    "ex", "ea", "ut", "eu", "in", "do", "et", "sit", "non", "qui", "cum", "per", "sed", "duis", "quis",
    "ex", "ea", "ut", "eu", "in", "do", "et", "sit", "non", "qui", "cum", "per", "sed", "duis", "quis",
    "elit", "anim", "odio", "nisi", "nulla", "dicta", "fames", "arcu", "erat", "vitae", "porta", "fusce",
    "elit", "anim", "odio", "nisi", "nulla", "dicta", "fames", "arcu", "erat", "vitae", "porta", "fusce",
    "morbi", "mauris", "turpis", "lectus", "finibus", "finibusque", "dictum", "cubilia", "class", "aptent",
    "taciti", "litora", "torquent", "nostra", "sunt", "culpa", "velit", "esse", "cillum", "sint", "amet",
    "magna", "enim", "veniam", "tempor", "laboris", "aliqua", "aliquip", "aute", "irure", "eiusmod",
    "labore", "dolore", "dolor", "lorem", "ipsum", "consectetur", "adipisci", "adipiscing", "placerat",
    "mattis", "rutrum", "sagittis", "accumsan", "soluta", "pulvinar", "claritas", "praesentia",
    "praesentium", "praesentibus", "praesentiumque", "dictumst", "lacus", "felis", "tortor", "aliquet",
    "mollis", "elementa", "integerum", "volutpatum", "imperium", "magnificus", "maximus", "auctor",
    "semper", "vivamus", "luctus", "pretium", "sodales", "magnam", "expedita", "distinctio", "sapien",
    "gravida", "pharetra", "bibendum", "facilisis", "tincidunt", "sollicitudin", "ullamco", "officia",
    "deserunt", "mollit", "conubia", "placerat", "porttitor", "ullamcorper", "hendrerit", "viverra",
    "fringilla", "varius", "suscipit", "blandit", "aliquam", "volutpat", "integer", "metus", "ultrices",
    "congue", "risus", "curabitur", "tempus", "nunc", "quisque", "ornare", "convallis", "auctoritas",
    "dignissim", "ornatus", "voluptas", "perspiciatis", "sapientia"
]


def random_sentence(min_words, max_words):
    word_count = random.randint(min_words, max_words)
    words = [random.choice(WORDS) for _ in range(word_count)]
    # 30% chance to add a comma in the middle if longer than 3 words
    if word_count > 3 and random.random() < 0.3:
        if word_count - 3 > 2:
            comma_pos = random.randint(2, word_count - 3)
            words[comma_pos] += ","
    # Assemble sentence and add ! ? or .
    sentence = " ".join(words).capitalize()
    rnd = random.random()
    if rnd < 0.2:
        sentence += "!"
    elif rnd < 0.5:
        sentence += "?"
    else:
        sentence += "."
    return sentence


@app.route("/")
def lorem():
    try:
        paragraphs = int(request.args.get("paragraphs", 5))
        min_words = int(request.args.get("min", 3))
        max_words = int(request.args.get("max", 25))
    except ValueError:
        return Response("Invalid parameters", status=400)
    if min_words > max_words:
        return Response("min cannot be greater than max", status=400)
    paragraphs = [random_sentence(min_words, max_words)
                  for _ in range(paragraphs)]
    text = " ".join(paragraphs)
    return Response(text, mimetype="text/plain")


if __name__ == "__main__":
    debug = False
    if "--debug" in sys.argv:
        debug = True
    app.run(host="0.0.0.0", port=5000, debug=debug)
