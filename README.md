# 🎮 SDG Club Game - MBTI & Career Prediction

An interactive web game that predicts your MBTI personality type, skills, interests, and career advice based on your SDG (Sustainable Development Goals) club choices. Featuring Zootopia-style NPC dialogues.

## ✨ Features

- 🏫 **17 SDG Clubs** - Choose from clubs aligned with UN Sustainable Development Goals
- 💬 **NPC Dialogue System** - Zootopia-themed characters guide you through the game
- 🧠 **AI-Powered Prediction** - Uses Tencent CloudBase cloud functions to call Gemini securely
- 📊 **Comprehensive Results** - Get your MBTI, Skills, Interests, and Career Advice
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ☁️ **CloudBase Ready** - Supports anonymous login, server-side AI calls, and result storage

## 🚀 Quick Start (Local)

### Option 1: Open directly
Simply double-click `index.html` to open in your browser.

### Option 2: Local server (recommended)
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## 🔗 Current Project URL

The live project is currently available at:

`https://xiaomdasd.github.io/sdg-club-game/?v=df333a9`

## ☁️ Tencent CloudBase Setup

This project is designed to use:

- `GitHub repo` for source control
- `GitHub Pages` for the public static site
- `Tencent CloudBase` for anonymous auth, cloud functions, and database storage

### 1. Frontend config

Edit `cloudbase-config.js` and set your environment ID:

```js
window.CLOUDBASE_CONFIG = {
  enabled: true,
  env: "your-env-id",
  region: "ap-shanghai",
  functionName: "predictMBTI",
  collectionName: "game_results"
};
```

### 2. Cloud function

Deploy the files under `cloudbase/functions/predictMBTI/` as a CloudBase function named `predictMBTI`.

Set these environment variables for the function:

- `DEEPSEEK_API_KEY`
- `DEEPSEEK_MODEL` (optional, default: `deepseek-chat`)
- `RESULT_COLLECTION` (optional, default: `game_results`)

### 3. Database

Create a collection called `game_results` in CloudBase.

### 4. Authentication

Enable anonymous login for Web in CloudBase so the browser can call the cloud function.

## 🌐 Deploy to Public

### Option A: GitHub Pages
1. Create a GitHub repository
2. Upload all files (`index.html`, `styles.css`, `script.js`)
3. Go to **Settings** → **Pages**
4. Select **Source: Deploy from a branch** → **main** → **/ (root)**
5. Your site will be live at `https://yourusername.github.io/repo-name`

### Option B: Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **Add New** → **Project**
3. Import your GitHub repo or drag & drop the folder
4. Click **Deploy**
5. Your site will be live instantly!

### Option C: Netlify
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop your project folder to the deploy area
3. Your site will be live in seconds!

## 🔐 API Key Security

The Gemini API key should now live in the CloudBase function environment variables, not in browser code.

## 📁 Project Structure

```
demo/
├── index.html                 # Main HTML file
├── styles.css                 # All styles and animations
├── script.js                  # Game logic and CloudBase client calls
├── cloudbase-config.js        # Frontend CloudBase config
├── cloudbase-config.example.js
├── cloudbase/
│   └── functions/
│       └── predictMBTI/       # CloudBase function that calls Gemini and stores results
└── README.md                  # This file
```

## 🎯 How to Play

1. Click **Start Game**
2. Choose an SDG club that interests you
3. Answer 10 questions by selecting dialogue options
4. Get your personalized MBTI, Skills, Interests, and Career Advice!

## 📝 License

This project is for educational purposes. Feel free to modify and share!
