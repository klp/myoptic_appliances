async function loadAndDisplayJSON() {
  const placardsJsonPath =
    "processed_txt/a_mysterious_night_in_london_process.json";

  try {
    const response = await fetch(placardsJsonPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const contentDiv = document.getElementById("content");

    data.forEach((paragraphData) => {
      const paraElement = document.createElement("p");

      // loop through each sentence in the paragraph
      paragraphData.sentences.forEach((sentenceData) => {
        const sentenceElement = document.createElement("span");
        sentenceElement.textContent = sentenceData.sentence + " ";
        paraElement.appendChild(sentenceElement);
      });

      contentDiv.appendChild(paraElement);
    });
  } catch (error) {
    console.error("Error fetching the JSON file:", error);
  }
}

loadAndDisplayJSON();
