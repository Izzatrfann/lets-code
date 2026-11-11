LET'S CODE WEBSITE - HOW TO PUT IT ON GITHUB PAGES
===================================================

What this is
------------
A small website (plain HTML, CSS and JavaScript). No build step, no server, no tracking.
English and Bahasa Malaysia. Open index.html to see the home page.

IMPORTANT: free GitHub Pages needs a PUBLIC repository. Everything inside the folder
becomes public, so do not add school names, pupil names, photos or the collaboration letter.

Option A: upload in the browser (easiest, no Git needed)
--------------------------------------------------------
1. Sign in at github.com. Click the "+" at the top right, then "New repository".
2. Repository name: for example  lets-code   (this becomes part of the web address).
   Choose "Public". Click "Create repository".
3. On the new repository page click "uploading an existing file".
4. Unzip LetsCode-website.zip on your computer. Open the "lets-code" folder.
   Select EVERYTHING INSIDE it (index.html, css, js, img, downloads, vendor, ...)
   and drag it into the GitHub page. Do not drag the outer "lets-code" folder itself,
   or the address will have an extra folder name in it.
   If the file ".nojekyll" is hidden on your computer, that is okay; it is optional.
5. Wait for the upload to finish, then click "Commit changes".
   (GitHub allows about 100 files per drag-and-drop. If it complains, upload in two or
   three batches, one folder at a time, keeping the same folder names.)
6. Go to Settings > Pages. Under "Build and deployment", Source = "Deploy from a branch".
   Branch = "main", folder = "/ (root)". Click Save.
7. Wait 1 to 2 minutes. The page shows your address:
       https://YOUR-USERNAME.github.io/lets-code/
   Open it and test: Play page, Build page, language buttons (EN / BM).

Option B: with Git (if you already use it)
------------------------------------------
    cd lets-code
    git init
    git add .
    git commit -m "Let's Code website"
    git branch -M main
    git remote add origin https://github.com/YOUR-USERNAME/lets-code.git
    git push -u origin main
Then do step 6 above.

After it is live - checklist
----------------------------
- Open the Play page and press "Start game". The game must run and the arrow keys must work.
- On the Play page press "Play on Scratch" under each of the 3 other games. They load from
  scratch.mit.edu. If one does not load, check the game's page is still public.
- Check the language buttons on every page.
- Print the Bug Cards page once to see the print layout.
- Make the QR code / poster only after you know the final web address.

Changing things later
---------------------
- Replace a picture: put a new file with the SAME name in the same folder (for example
  img/game.png) and upload it again. GitHub asks to replace it. Press Commit.
- Text is written in the HTML files. English and Malay text for each line is kept in
  js/dict.js (the Malay version replaces the English when the BM button is pressed).
- Do not delete the "vendor" folder. It runs the Play page game. Its licence file must stay.

Credits to keep
---------------
- Scratch is a project of the Scratch Foundation, in collaboration with the Lifelong
  Kindergarten Group at the MIT Media Lab. https://scratch.mit.edu
- The Play page uses TurboWarp Scaffolding (Mozilla Public License 2.0).
- Asteroid Dodge, Flappy Bird and Pong belong to their Scratch creators. Check the
  creator names on each project page before the session.
