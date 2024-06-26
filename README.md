
# gpt-i18n-translator

gpt-i18n-translator is a Node.js script that compares two language files and adds missing translations. It uses the OpenAI API to generate the missing translations.

## Installation

### Install Globally

To install the script globally, use the following command:

```sh
npm install -g gpt-i18n-translator
```

## Setup

1. **Create the `.env` File:**

   Create a `.env` file in the current directory by copying the provided `.env.example` file:

   ```sh
   cp $(npm root -g)/gpt-i18n-translator/.env.example .env
   ```

2. **Edit the `.env` File:**

   Open the `.env` file in a text editor and add your OpenAI API key and model information:

   ```env
   OPENAI_API_KEY=your_actual_openai_api_key
   OPENAI_MODEL=your_actual_openai_model (e.g. gpt-4o)
   ```

## Usage

Run the script with the following parameters: target language, path to the original language file, and path to the foreign language file to be updated.

```sh
gpt-i18n-translator <target_language> <original_file_path> <foreign_file_path>
```

### Example

Suppose you want to add missing translations from German to English:

```sh
gpt-i18n-translator en ./path/to/de/translation.json ./path/to/en/translation.json
```

### Parameter Explanation

- `<target_language>`: The target language for translation (e.g., `en` for English).
- `<original_file_path>`: Path to the original language file (e.g., `./path/to/de/translation.json`).
- `<foreign_file_path>`: Path to the foreign language file to be updated (e.g., `./path/to/en/translation.json`).

## Development

### Local Installation

If you want to develop or customize the script locally, you can install it in your project directory:

```sh
yarn install
```

### DEV-Mode

Use

```sh
yarn dev
```

To test local installation.

## License

This project is licensed under the MIT License.

## Author

- Bernard Teske www.bernardteske.de
