# ⚾ Baseball Tournament Game v2.0

Complete 4-team playoff tournament with LCS → World Series!

## 🎮 Features

✅ 4-player tournament (LCS → World Series)
✅ Team strength seeding (1v4, 2v3 matchups)
✅ 3 starting pitchers per team (rotation)
✅ 4 relief pitchers per team (realistic bullpen usage)
✅ Defensive stats affect scoring
✅ Speed stats (stolen bases, taking extra bases)
✅ 3-5 game highlights per game with narrative
✅ Button to advance from LCS to World Series

## 📦 What's in This Package

```
baseball-tournament-v2/
├── .github/              ⚠️ HIDDEN FOLDER (starts with a dot)
│   └── workflows/
│       └── deploy.yml    (Auto-deployment for GitHub Pages)
├── .gitignore            ⚠️ HIDDEN FILE (starts with a dot)
├── src/
│   ├── App.jsx          (Your game code)
│   ├── App.css          (Styling)
│   └── main.jsx         (React entry point)
├── index.html           (HTML entry)
├── package.json         (Dependencies)
├── vite.config.js       (Build configuration)
└── README.md            (This file)
```

## ⚠️ IMPORTANT: Hidden Files

**Some files are HIDDEN (they start with a dot `.`)**

These files are:
- `.gitignore`
- `.github/` (the entire folder)

**On Mac/Linux:**
- Hidden files are invisible by default in Finder/File Explorer
- Press `Cmd+Shift+.` (Mac) or `Ctrl+H` (Linux) to show hidden files

**On Windows:**
- Open File Explorer
- Click "View" tab → Check "Hidden items"

**YOU MUST UPLOAD THESE HIDDEN FILES TO GITHUB!**

If you don't upload the `.github` folder, auto-deployment won't work.

## 🚀 Deployment Instructions

### Option 1: GitHub Pages (Recommended)

1. **Create a new GitHub repository**
   - Go to github.com
   - Click "New repository"
   - Name it: `baseball-tournament-v2` (or whatever you want)
   - Make it PUBLIC
   - Click "Create repository"

2. **⚠️ CRITICAL: Show Hidden Files First**
   - **Mac**: Press `Cmd+Shift+.` in Finder
   - **Windows**: File Explorer → View → Check "Hidden items"
   - You should now see `.gitignore` and `.github` folder

3. **Upload ALL files (including hidden ones)**
   - Extract the ZIP file
   - Make sure you can see the hidden files
   - On GitHub, click "uploading an existing file"
   - **Drag ALL files and folders** (including `.github` and `.gitignore`)
   - Commit the files

4. **⚠️ IMPORTANT: Update the repository name in vite.config.js**
   - Open `vite.config.js`
   - Change this line:
     ```javascript
     base: '/baseball-tournament-v2/',
     ```
   - To match YOUR repository name:
     ```javascript
     base: '/YOUR-REPO-NAME/',
     ```
   - Save and commit the change

5. **Enable GitHub Pages**
   - Go to your repo Settings
   - Click "Pages" (left sidebar)
   - Under "Source", select: **GitHub Actions**
   - Click Save

6. **Wait for deployment**
   - Go to the "Actions" tab
   - You should see a workflow running
   - Wait 2-3 minutes for it to complete
   - Your site will be at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Option 2: StackBlitz (Fastest for Testing)

1. Go to https://stackblitz.com
2. Click "New Project" → "Vite" → "React"
3. Delete everything in the project
4. Upload all files from this package (including hidden ones if possible)
5. Click "Open in New Window"
6. Share the URL!

## 🎯 How to Play

1. Click "Start Tournament"
2. Enter name for Team 1
3. Draft 9 position players for Team 1
4. Draft 3 starting pitchers for Team 1
5. Draft 4 relief pitchers for Team 1
6. Repeat for Teams 2, 3, and 4
7. Watch LCS results (seeded 1v4 and 2v3)
8. Click "Advance to World Series"
9. See the champion!

## 📊 Current Player Pool

**Demo version includes:**
- 12 players per position
- 20 starting pitchers  
- 20 relief pitchers

**Including stars like:**
- Steven Kwan (LF)
- Cal Raleigh (C)
- Mike Trout
- Shohei Ohtani
- Aaron Judge
- And many more legends!

## 🔧 Expanding the Player Pool

To add more players:

1. Open `src/App.jsx`
2. Find the `PLAYER_POOLS` object at the top
3. Add more players to any position array
4. Follow this format:
   ```javascript
   {name:"Player Name",ba:0.300,obp:0.400,slg:0.500,drs:10,spd:7,sb:20,cs:5,fld:0.985}
   ```
5. For pitchers:
   ```javascript
   {name:"Pitcher Name",era:3.00,whip:1.10,kper9:10.5}
   ```

The game automatically works with any number of players!

## 📝 Stats Explained

**Position Players:**
- `ba` = Batting Average
- `obp` = On-Base Percentage
- `slg` = Slugging Percentage
- `drs` = Defensive Runs Saved (higher = better defense)
- `spd` = Speed rating (1-10, affects base running)
- `sb` = Career stolen bases
- `cs` = Times caught stealing
- `fld` = Fielding percentage

**Pitchers:**
- `era` = Earned Run Average (lower = better)
- `whip` = Walks + Hits per Inning Pitched (lower = better)
- `kper9` = Strikeouts per 9 innings (higher = better)

## 🆘 Troubleshooting

**"Page not found" error:**
- Check that `vite.config.js` has the correct repository name
- Make sure GitHub Pages is set to "GitHub Actions" (not "Deploy from branch")

**Deployment not working:**
- Verify you uploaded the `.github` folder
- Check the "Actions" tab for error messages
- Make sure your repository is PUBLIC

**Can't see hidden files:**
- Mac: Press `Cmd+Shift+.`
- Windows: File Explorer → View → Check "Hidden items"

**Game not loading:**
- Clear your browser cache
- Try opening in an incognito/private window

## 🎉 Enjoy!

Have fun drafting your dream baseball teams and watching them compete!

Questions? The code has comments to help you understand how everything works.

---

**Made with ⚾ and React**
