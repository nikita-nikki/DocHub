

const fetch = require('node-fetch');

module.exports = async function generateSummaryHuggingFace(text, length = "medium") {
  let min_length = 40;
  let max_length = 150;

  // adjust lengths based on dropdown choice
  if (length === "short") {
    min_length = 20;
    max_length = 60;
  } else if (length === "long") {
    min_length = 100;
    max_length = 250;
  }

  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`, // Hugging Face token
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
        parameters: {
          min_length,
          max_length,
          do_sample: false,
        },
      }),
    }
  );

  const result = await response.json();
  return result[0]?.summary_text || "Summary not available.";
}