const fs = require('fs');

const public_pages = ['index.html', 'home2.html', 'about.html', 'services.html', 'pricing.html', 'contact.html'];

for (const f of public_pages) {
    if (!fs.existsSync(f)) continue;
    let content = fs.readFileSync(f, 'utf8');
    
    // We want to wrap the toggles and the mobile-menu-btn in a single <div class="xl:hidden flex items-center">
    
    if (f === 'index.html' || f === 'home2.html') {
        const regex = /<div class="xl:hidden flex items-center space-x-2 rtl:space-x-reverse mr-2 border-r border-white\/20 pr-2">([\s\S]*?)<\/div>\s*<div class="xl:hidden flex items-center">\s*<button id="mobile-menu-btn"([^>]*)>([\s\S]*?)<\/button>\s*<\/div>/;
        
        content = content.replace(regex, `<div class="xl:hidden flex items-center">
                    <div class="flex items-center space-x-2 rtl:space-x-reverse mr-2 border-r border-white/20 pr-2">$1</div>
                    <button id="mobile-menu-btn"$2>$3</button>
                </div>`);
    } else {
        const regex = /<div class="xl:hidden flex items-center space-x-2 rtl:space-x-reverse mr-2 border-r border-slate-200 dark:border-slate-700 pr-2">([\s\S]*?)<\/div>\s*<div class="xl:hidden flex items-center">\s*<button id="mobile-menu-btn"([^>]*)>([\s\S]*?)<\/button>\s*<\/div>/;
        
        content = content.replace(regex, `<div class="xl:hidden flex items-center">
                    <div class="flex items-center space-x-2 rtl:space-x-reverse mr-2 border-r border-slate-200 dark:border-slate-700 pr-2">$1</div>
                    <button id="mobile-menu-btn"$2>$3</button>
                </div>`);
    }
    
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated ${f}`);
}
console.log("Done.");
