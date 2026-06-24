const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace .webp and .webp references in the content with .webp
    // This is a simple regex that looks for standard asset paths
    let newContent = content.replace(/\.webp/g, '.webp');
    newContent = newContent.replace(/\.webp/g, '.webp');
    newContent = newContent.replace(/\.webp/g, '.webp');

    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated references in ${path.basename(filePath)}`);
    }
}

files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.html' || ext === '.css' || ext === '.js') {
        processFile(path.join(dir, file));
    }
});
