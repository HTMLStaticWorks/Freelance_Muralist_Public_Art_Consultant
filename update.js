const fs = require('fs');
const glob = require('glob');

// Basic manual glob since glob package might not be installed globally
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'dashboard.html');

for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    
    content = content.replace(/<nav class="hidden lg:flex space-x-8 rtl:space-x-reverse">/g, '<nav class="hidden xl:flex space-x-8 rtl:space-x-reverse">');
    content = content.replace(/<div class="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">/g, '<div class="hidden xl:flex items-center space-x-4 rtl:space-x-reverse">');
    content = content.replace(/<div class="lg:hidden flex items-center">/g, '<div class="xl:hidden flex items-center">');
    content = content.replace(/<div id="mobile-menu" class="hidden lg:hidden/g, '<div id="mobile-menu" class="hidden xl:hidden');
    
    fs.writeFileSync(f, content, 'utf8');
}
