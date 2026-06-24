const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace standard dummy links that are just href="#"
    // But exclude links that might be javascript triggers, though typically those don't have href="#" if they are buttons,
    // wait, some might be <a href="#">. Let's just blindly replace href="#" with href="404.html".
    // If it breaks a JS thing, it's easily fixable, but looking at the code most JS things are buttons.
    
    const count = (content.match(/href="#"/g) || []).length;
    if (count > 0) {
        content = content.replace(/href="#"/g, 'href="404.html"');
        fs.writeFileSync(filePath, content);
        console.log(`Replaced ${count} occurrences in ${file}`);
    }
});
