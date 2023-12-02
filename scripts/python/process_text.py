import json
import nltk
from nltk.tokenize import sent_tokenize
import spacy

nltk.download("punkt")

nlp = spacy.load("en_core_web_sm")


def load_text(file_path):
    with open(file_path, "r") as file:
        text = file.read()
        paragraphs = text.split("\n\n")
    return paragraphs


def segment_sentences(paragraphs):
    return [sent_tokenize(paragraph) for paragraph in paragraphs]


def tag_pos(setences):
    pos_tagged = []
    for paragraph in sentences:
        paragraph_pos = []
        for sentence in paragraph:
            doc = nlp(sentence)
            sentence_tags = [(token.text, token.pos_) for token in doc]
            paragraph_pos.append(sentence_tags)
        pos_tagged.append(paragraph_pos)
    return pos_tagged


file_path = "../../placards_brass-jewelers_truck-horses_and_steamers.txt"
paragraphs = load_text(file_path)
sentences = segment_sentences(paragraphs)
pos_tagged = tag_pos(sentences)

output = json.dumps(
    {"paragraphs": paragraphs, "sentences": sentences, "pos_tagged": pos_tagged},
    indent=4,
)

with open("output.json", "w") as json_file:
    json_file.write(output)

print("JSON data saved to 'output.json'")
