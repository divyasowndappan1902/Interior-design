const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace href="..." with href="404.html" for the 5 footer explore links
    content = content.replace(/<li><a href="index\.html">Home<\/a><\/li>/g, '<li><a href="404.html">Home</a></li>');
    content = content.replace(/<li><a href="about\.html">About\s*<\/a><\/li>/g, '<li><a href="404.html">About</a></li>');
    content = content.replace(/<li><a href="service\.html">Services<\/a><\/li>/g, '<li><a href="404.html">Services</a></li>');
    content = content.replace(/<li><a href="blog\.html">Blog<\/a><\/li>/g, '<li><a href="404.html">Blog</a></li>');
    content = content.replace(/<li><a href="contact\.html">Contact\s*<\/a><\/li>/g, '<li><a href="404.html">Contact</a></li>');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Footer Explore links updated to 404.');
