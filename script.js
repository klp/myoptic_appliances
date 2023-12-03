async function loadAndDisplayJSON() {
  const placardsJsonPath =
    "processed_txt/a_mysterious_night_in_london_process.json";

  try {
    const response = await fetch(placardsJsonPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Randomly select a paragraph
    const selectedParagraphIndex = Math.floor(Math.random() * data.length);
    const selectedParagraphData = data[selectedParagraphIndex];

    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = ""; // clear previous content

    const paraElement = document.createElement("p");
    paraElement.id = "selected-paragraph";

    selectedParagraphData.sentences.forEach((sentenceData, index) => {
      const sentenceElement = document.createElement("span");
      sentenceElement.textContent = sentenceData.sentence + " ";
      // store sentence metadata
      sentenceElement.dataset.sentenceMetadata = JSON.stringify(sentenceData);
      // store POS data
      sentenceElement.dataset.pos = JSON.stringify(sentenceData.pos);
      sentenceElement.id = `sentence-${index}`; // assign an ID later

      paraElement.appendChild(sentenceElement);
    });

    contentDiv.appendChild(paraElement);
  } catch (error) {
    console.error("Error fetching the JSON file:", error);
  }
}

loadAndDisplayJSON();
