# 🎮 SDG Club Game - MBTI & Career Prediction

An interactive web game that predicts your MBTI personality type, skills, interests, and career advice based on your SDG (Sustainable Development Goals) club choices. Featuring Zootopia-style NPC dialogues!

## ✨ Features

- 🏫 **17 SDG Clubs** - Choose from clubs aligned with UN Sustainable Development Goals
- 💬 **NPC Dialogue System** - Zootopia-themed characters guide you through the game
- 🧠 **AI-Powered Prediction** - Uses Gemini API to analyze your choices
- 📊 **Comprehensive Results** - Get your MBTI, Skills, Interests, and Career Advice
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🚀 Quick Start (Local)

### Option 1: Open directly
Simply double-click `index.html` to open in your browser.

### Option 2: Local server (recommended)
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## 🌐 Deploy to Public (Free Options)

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

## ⚠️ Important: API Key Security

The current code contains a Gemini API key in `script.js`. For public deployment:

### Option 1: Keep it (for demo/educational use)
- Set usage limits on your API key in Google Cloud Console
- Monitor usage regularly

### Option 2: Remove AI feature (safest)
Replace the API call with static results by modifying `predictMBTI()` function.

### Option 3: Use environment variables (advanced)
For production, move the API key to a backend server.

## 📁 Project Structure

```
demo/
├── index.html      # Main HTML file
├── styles.css      # All styles and animations
├── script.js       # Game logic and Gemini API integration
└── README.md       # This file
```

## 🎯 How to Play

1. Click **Start Game**
2. Choose an SDG club that interests you
3. Answer 10 questions by selecting dialogue options
4. Get your personalized MBTI, Skills, Interests, and Career Advice!

## 📝 License

This project is for educational purposes. Feel free to modify and share!
