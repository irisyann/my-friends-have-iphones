const path = require('path');
const fs = require('fs');
const convert = require('heic-convert');
const { promisify } = require('util');

async function convertHEICtoPNG() {
    const inputFolderDir = path.join(__dirname, 'heic_photos');

    fs.readdir(inputFolderDir, (err, files) => {
        files.forEach(async file => {
            const inputFileDir = path.join(__dirname, 'heic_photos', file);
            const outputFileDir = path.join(__dirname, 'converted_photos', file.replace('.HEIC', '.png'));

            const inputBuffer = await promisify(fs.readFile)(inputFileDir);
            const outputBuffer = await convert({
                buffer: inputBuffer, 
                format: 'PNG',     
                quality: 1           
            });
            
            await promisify(fs.writeFile)(outputFileDir, outputBuffer);
        });
    });
}

convertHEICtoPNG();