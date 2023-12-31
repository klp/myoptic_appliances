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


def tag_pos(sentences):
    pos_tagged = []
    for sentence in sentences:
        doc = nlp(sentence)
        sentence_tags = [(token.text, token.pos_) for token in doc]
        pos_tagged.append(sentence_tags)
    return pos_tagged


file_paths = [
    "source_txt/placards_brass-jewelers_truck-horses_and_steamers.txt",
    "source_txt/what_redburn_saw_in_launcelott's-hey.txt",
    "source_txt/a_mysterious_night_in_london.txt",
]

for file_path in file_paths:
    paragraphs = load_text(file_path)
    structured_data = []
    for paragraph in paragraphs:
        sentences = segment_sentences([paragraph])[0]
        structured_paragraph = []
        for sentence in sentences:
            pos_data = tag_pos([sentence])  # Changed here
            structured_paragraph.append({"sentence": sentence, "pos_data": pos_data[0]})
        structured_data.append(
            {"paragraph": paragraph, "sentences": structured_paragraph}
        )

    json_file_name = "processed_txt/" + file_path.split("/")[-1].replace(
        ".txt", "_process.json"
    )
    with open(json_file_name, "w") as json_file:
        json.dump(structured_data, json_file, indent=4)
