const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
    require.resolve('sharp');
} catch(e) {
    console.log('Installing sharp...');
    execSync('npm install sharp --no-save', { stdio: 'inherit' });
}

const sharp = require('sharp');

const files = [
    { src: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b20f1257-fa85-4992-8fca-a4588c1f8007\\team_elena_1782295785223.png', dest: 'assets/team_elena.webp' },
    { src: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b20f1257-fa85-4992-8fca-a4588c1f8007\\team_marcus_1782295808717.png', dest: 'assets/team_marcus.webp' },
    { src: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b20f1257-fa85-4992-8fca-a4588c1f8007\\team_sarah_1782295820941.png', dest: 'assets/team_sarah.webp' }
];

async function convert() {
    for (const file of files) {
        await sharp(file.src)
            .resize({ width: 600 }) // Resize to max 600px width for optimization
            .webp({ quality: 60 }) // 60 quality is usually under 100kb for a 600px image
            .toFile(file.dest);
            
        const stats = fs.statSync(file.dest);
        console.log(`Saved ${file.dest} - ${Math.round(stats.size / 1024)} KB`);
    }
}

convert().catch(console.error);
