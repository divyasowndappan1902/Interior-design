const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace Unsplash URLs with local WEBP images
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1573496359142-b8d87734a5a2[^"]*/g, 'assets/team_elena.webp');
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1560250097-0b93528c311a[^"]*/g, 'assets/team_marcus.webp');
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1580489944761-15a19d654956[^"]*/g, 'assets/team_sarah.webp');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Team images updated in HTML files.');
