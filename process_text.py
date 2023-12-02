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


placards_path = "source_txt/placards_brass-jewelers_truck-horses_and_steamers.txt"
paragraphs = load_text(placards_path)

structured_data = []
for paragraph in paragraphs:
    sentences = segment_sentences([paragraph])
    structured_paragraph = []
    for sentence_list in sentences:
        for sentence in sentence_list:
            pos_data = tag_pos(sentence)
            structured_paragraph.append({"sentence": sentence, "pos_data": pos_data})
    structured_data.append({"paragraph": paragraph, "sentences": structured_paragraph})

with open("processed_txt/placards_process.json", "w") as json_file:
    json.dump(structured_data, json_file, indent=4)
