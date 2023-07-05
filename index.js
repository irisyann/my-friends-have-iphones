const path = require('path');
const fs = require('fs');
const convert = require('heic-convert');
const { promisify } = require('util');

async function convertHEICtoPNG() {
    try {
        const inputFolderDir = path.join(__dirname, 'heic_photos');

        fs.readdir(inputFolderDir, (err, files) => {
    
            if (!files || files.length === 0) {
                console.log("No files found in the directory.")
                return;
            }

            console.log(`Found ${files.length} files in the directory. Beginning conversion...`)
    
            files.forEach(async file => {
    
                if (!file.endsWith('.HEIC')) {
                    return;
                }
    
                const inputFileDir = path.join(__dirname, 'heic_photos', file);
                const outputFileDir = path.join(__dirname, 'converted_photos', file.replace('.HEIC', '.png'));
    
                const inputBuffer = await promisify(fs.readFile)(inputFileDir);
                const outputBuffer = await convert({
                    buffer: inputBuffer, 
                    format: 'PNG',     
                    quality: 1           
                });
                
                await promisify(fs.writeFile)(outputFileDir, outputBuffer);
    
                console.log(`File converted successfully at: ${outputFileDir}`);
            });

        });
    } catch (error) {
        console.log(error);
    }
    
}

convertHEICtoPNG();