import glob

for f in glob.glob("*.html"):
    if f == "dashboard.html": continue
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    
    content = content.replace('<nav class="hidden lg:flex space-x-8 rtl:space-x-reverse">', '<nav class="hidden xl:flex space-x-8 rtl:space-x-reverse">')
    content = content.replace('<div class="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">', '<div class="hidden xl:flex items-center space-x-4 rtl:space-x-reverse">')
    content = content.replace('<div class="lg:hidden flex items-center">', '<div class="xl:hidden flex items-center">')
    content = content.replace('<div id="mobile-menu" class="hidden lg:hidden', '<div id="mobile-menu" class="hidden xl:hidden')
    
    with open(f, "w", encoding="utf-8") as file:
        file.write(content)
