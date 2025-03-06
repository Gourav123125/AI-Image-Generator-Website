document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("input-value");
    const generateButton = document.querySelector(".image-generate-btn");
    const imageContainerText = document.getElementById("imageContainerText");
    const generatedImage = document.getElementById("generated-image");

    async function generateImage() {
        const userInput = inputField.value.trim();
        if (!userInput) {
            alert("Please enter some text to generate an image.");
            return;
        }

        imageContainerText.textContent = "Generating image...";
        generatedImage.style.display = "none";

        const apiUrl = "https://api.starryai.com/v1/generate"; // Confirm with StarryAI documentation

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": "ed40803f28258c6e9e6dc4ea0404f0dc2a5e7b5be19a6b43e056a393570262b1" // Replace with your actual API Key
                },
                body: JSON.stringify({
                    prompt: userInput, // Assuming 'prompt' is the correct field
                    model: "artistic", // Change based on available models
                    resolution: "1024x1024"
                })
            });

            const data = await response.json();
            console.log("API Response:", data); // Debugging

            if (data.image_url) {
                generatedImage.src = data.image_url;
                generatedImage.style.display = "block";
                imageContainerText.textContent = "";
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Error generating image:", error);
            imageContainerText.textContent = "Error: Unable to generate image. Please try again.";
        }
    }

    generateButton.addEventListener("click", function (event) {
        event.preventDefault();
        generateImage();
    });
});
