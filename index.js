#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const generateTranslation = require('./gpt');
require('dotenv').config();

async function main() {

    // Read paths from arguments and convert to absolute paths
    const targetLanguage = path.resolve(process.argv[2]);
    const originalFilePath = path.resolve(process.argv[3]);
    const foreignFilePath = path.resolve(process.argv[4]);

    // Read JSON files
    let originalTranslations;
    let foreignTranslations;

    try {
        originalTranslations = JSON.parse(fs.readFileSync(originalFilePath, 'utf-8'));
        foreignTranslations = JSON.parse(fs.readFileSync(foreignFilePath, 'utf-8'));
    } catch (error) {
        console.error('Error reading files:', error.message);
        process.exit(1);
    }

    // Check which keys are present in the original file but missing in the foreign language file
    const missingKeys = Object.keys(originalTranslations).filter(key => !(key in foreignTranslations));

    // Create an object with the missing keys and their values
    const missingTranslations = {};
    missingKeys.forEach(key => {
        missingTranslations[key] = originalTranslations[key];
    });

    // Output result and update file
    if (missingKeys.length > 0) {

        // Generate Translation via GPT
        const translation = await generateTranslation(missingTranslations, process.env.OPENAI_API_KEY, targetLanguage, process.env.OPENAI_MODEL);
        const translatedTranslation = JSON.parse(translation);

        // Add missing keys to the foreign language file
        const updatedTranslations = { ...foreignTranslations, ...translatedTranslation };

        console.log('The following keys were added to the foreign language file:');
        console.log(JSON.stringify(translatedTranslation, null, 2));
        try {
            fs.writeFileSync(foreignFilePath, JSON.stringify(updatedTranslations, null, 2), 'utf-8');
            console.log('Foreign language file has been updated.');
        } catch (error) {
            console.error('Error writing file:', error.message);
            process.exit(1);
        }
    } else {
        console.log('All keys from the original file are also present in the foreign language file. No update required.');
    }
}

main();
