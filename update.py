import os
import glob
import re

files = glob.glob('*.html')
public_pages = ['index.html', 'home2.html', 'about.html', 'services.html', 'pricing.html', 'contact.html']

for f in public_pages:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Let's find the mobile menu button container
    pattern = re.compile(r'(<div class="xl:hidden flex items-center">)(\s*<button id="mobile-menu-btn")', re.DOTALL)
    
    if 'index.html' in f or 'home2.html' in f:
        # Transparent header base classes
        new_block = r'''<div class="xl:hidden flex items-center space-x-2 rtl:space-x-reverse mr-2 border-r border-white/20 pr-2">
                    <button class="rtl-toggle-btn px-2 py-1 rounded-full border border-white/30 hover:bg-white/10 transition-colors text-white/80 text-xs font-bold tracking-wider">RTL</button>
                    <button class="theme-toggle-btn p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80">
                        <i data-lucide="moon" class="w-5 h-5 dark:hidden"></i>
                        <i data-lucide="sun" class="w-5 h-5 hidden dark:block"></i>
                    </button>
                </div>
                <div class="xl:hidden flex items-center">\2'''
    else:
        # Solid header base classes
        new_block = r'''<div class="xl:hidden flex items-center space-x-2 rtl:space-x-reverse mr-2 border-r border-slate-200 dark:border-slate-700 pr-2">
                    <button class="rtl-toggle-btn px-2 py-1 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-xs font-bold tracking-wider">RTL</button>
                    <button class="theme-toggle-btn p-1.5 rounded-full text-slate-500 hover:text-primary transition-colors">
                        <i data-lucide="moon" class="w-5 h-5 dark:hidden"></i>
                        <i data-lucide="sun" class="w-5 h-5 hidden dark:block"></i>
                    </button>
                </div>
                <div class="xl:hidden flex items-center">\2'''
                
    # To prevent multiple replacements if run multiple times
    if 'theme-toggle-btn' not in content:
        content = pattern.sub(new_block, content)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated {f}")

print("Done.")
