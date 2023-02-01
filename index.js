const fs = require('fs');
const path = require('path');
const convert = require('heic-convert');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);


//TODO: Change filepath here
const inputFolder = "./Input";
const outputFolder = "./Output";

fs.readdir(inputFolder, async (err, files) => {
    if (err) {
        console.error(err);
        return;
    }
    let i = 0;
    for (const file of files) {
        const inputPath = path.join(inputFolder, file);
        const outputPath = path.join(outputFolder, path.parse(file).name + ".png");

        try {
            const inputBuffer = await readFile(inputPath)
            const outputBuffer = await convert({
                buffer: inputBuffer,
                format: 'PNG',
                quality: 1
            })
            await writeFile(outputPath, outputBuffer);
            console.log(`${file} wurde zu ${outputPath} konvertiert`);
            i++;
        } catch (err) {
            console.error(err);
        }
        
    }

    console.log(`${i} Dateien fertig konvertiert.`);

})