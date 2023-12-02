async function loadAndDisplayJSON() {
  const placardsJsonPath =
    "processed_txt/placards_brass-jewelers_truck-horses_and_steamers_process.json";

  try {
    const response = await fetch(placardsJsonPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Now you have your data in the 'data' variable
    console.log(data); // You can see your data in the browser's console

    // Example: Displaying the content on the webpage
    const contentDiv = document.getElementById("content");

    data.forEach((paragraphData) => {
      const paraElement = document.createElement("p");
      paraElement.textContent = paragraphData.paragraph;
      contentDiv.appendChild(paraElement);

      paragraphData.sentences.forEach((sentenceData) => {
        const sentenceElement = document.createElement("span");
        sentenceElement.textContent = sentenceData.sentence + " ";
        paraElement.appendChild(sentenceElement);
      });
    });
  } catch (error) {
    console.error("Error fetching the JSON file:", error);
  }
}

loadAndDisplayJSON();
