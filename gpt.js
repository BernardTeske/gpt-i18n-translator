const OpenAI = require('openai');

async function generateTranslation(text, apiKey, language, gptModel) {
    
    const openai = new OpenAI({
        apiKey: apiKey,
    });

    const userPrompt = {
        language: language,
        text: text
    };

    const systemPrompt = `You are a translation assistant. Your task is to translate a JSON object containing key-value pairs where the key is a unique identifier and the value is a text string that needs to be translated. The translations should be accurate and contextually appropriate for the target language. Preserve the JSON structure and only translate the values, not the keys.

Example input:
{
  "language": de" (language code e.g., 'de' for German)",
  text: {
    "greeting": "Hello, how are you?",
    "farewell": "Goodbye and see you soon!"
  }
}

Example output (translated to German):
{
  "greeting": "Hallo, wie geht es dir?",
  "farewell": "Auf Wiedersehen und bis bald!"
}

Translate the following JSON to the target language specified by the user.
`;

    try {
        const chatCompletion = await openai.chat.completions.create({
            response_format: { type: "json_object" },
            n: 1,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: JSON.stringify(userPrompt)
                }
            ],
            model: gptModel,
        });
        return chatCompletion.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}

module.exports = generateTranslation;
