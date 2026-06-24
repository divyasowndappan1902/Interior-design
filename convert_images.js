const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processDirectory(dirPath) {
    try {
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.webp' || ext === '.webp' || ext === '.webp') {
                const inputPath = path.join(dirPath, file);
                const outputPath = path.join(dirPath, file.replace(ext, '.webp'));
                
                let quality = 80;
                let sizeKb = Infinity;
                let buffer = null;

                while (sizeKb > 100 && quality > 10) {
                    buffer = await sharp(inputPath)
                        .resize({ width: 1200, withoutEnlargement: true })
                        .webp({ quality: quality })
                        .toBuffer();
                    
                    sizeKb = buffer.length / 1024;
                    quality -= 5;
                }

                fs.writeFileSync(outputPath, buffer);
                console.log(`Converted: ${file} -> ${path.basename(outputPath)} (${sizeKb.toFixed(2)} KB)`);
                
                // Optionally delete original
                fs.unlinkSync(inputPath);
            }
        }
    } catch (error) {
        console.error('Error processing directory:', error);
    }
}

const assetsDir = path.join(__dirname, 'assets');
processDirectory(assetsDir);
