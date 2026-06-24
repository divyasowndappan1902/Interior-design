const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace href="service.html" with href="404.html" for the 5 footer service links
    content = content.replace(/<li><a href="service\.html">Residential Architecture<\/a><\/li>/g, '<li><a href="404.html">Residential Architecture</a></li>');
    content = content.replace(/<li><a href="service\.html">Commercial Interiors<\/a><\/li>/g, '<li><a href="404.html">Commercial Interiors</a></li>');
    content = content.replace(/<li><a href="service\.html">Bespoke Furniture Curation<\/a><\/li>/g, '<li><a href="404.html">Bespoke Furniture Curation</a></li>');
    content = content.replace(/<li><a href="service\.html">Space Optimization<\/a><\/li>/g, '<li><a href="404.html">Space Optimization</a></li>');
    content = content.replace(/<li><a href="service\.html">3D Visualization<\/a><\/li>/g, '<li><a href="404.html">3D Visualization</a></li>');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Footer dummy links updated to 404.');
