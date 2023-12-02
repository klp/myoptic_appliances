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


file_paths = [
    "source_txt/placards_brass-jewelers_truck-horses_and_steamers.txt",
    "source_txt/what_redburn_saw_in_launcelott's-hey.txt",
]
for file_path in file_paths:
    paragraphs = load_text(file_path)
    structured_data = []
    for paragraph in paragraphs:
        sentences = segment_sentences([paragraph])
        structured_paragraph = []
        for sentence_list in sentences:
            for sentence in sentence_list:
                pos_data = tag_pos(sentence)
                structured_paragraph.append(
                    {"sentence": sentence, "pos_data": pos_data}
                )
        structured_data.append(
            {"paragraph": paragraph, "sentences": structured_paragraph}
        )

    json_file_name = "processed_txt/" + file_path.split("/")[-1].replace(
        ".txt", "_process.json"
    )
    with open(json_file_name, "w") as json_file:
        json.dump(structured_data, json_file, indent=4)
