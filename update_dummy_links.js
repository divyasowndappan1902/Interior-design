const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace hrefs inside buttons
    content = content.replace(/href="[^"]*"(?=\s+class="btn[^"]*")/g, 'href="404.html"');
    
    // Replace hrefs inside project-link-btn
    content = content.replace(/href="[^"]*"(?=\s+class="project-link-btn")/g, 'href="404.html"');
    
    // Replace specific "View Full Project" links
    content = content.replace(/href="[^"]*"(?=[^>]*>View Full Project)/g, 'href="404.html"');

    // Make sure we didn't accidentally break nav links. Nav links don't use 'class="btn... "' mostly, except login.
    // Wait, let's fix login link if we broke it. Login is class="nav-link nav-btn-login" not class="btn".
    // "Read Our Story"
    content = content.replace(/href="[^"]*"(?=[^>]*>Read Our Story)/g, 'href="404.html"');
    content = content.replace(/href="[^"]*"(?=[^>]*>Our Studio Philosophy)/g, 'href="404.html"');
    content = content.replace(/href="[^"]*"(?=[^>]*>Free Estimate)/g, 'href="404.html"');
    content = content.replace(/href="[^"]*"(?=[^>]*>Start Your Project)/g, 'href="404.html"');
    content = content.replace(/href="[^"]*"(?=[^>]*>Select Plan)/g, 'href="404.html"');
    content = content.replace(/href="[^"]*"(?=[^>]*>Explore Services)/g, 'href="404.html"');
    content = content.replace(/href="[^"]*"(?=[^>]*>Work With Us)/g, 'href="404.html"');
    content = content.replace(/href="[^"]*"(?=[^>]*>See Portfolio)/g, 'href="404.html"');
    content = content.replace(/href="[^"]*"(?=[^>]*>Let's Talk)/g, 'href="404.html"');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Dummy button links updated.');
