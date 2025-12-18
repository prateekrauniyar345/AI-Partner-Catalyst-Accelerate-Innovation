# VoiceEd Ally 🎤✨

**An inclusive, voice-driven educational companion** built for the **Google Cloud AI Partner Catalyst Hackathon** (ElevenLabs Challenge).

VoiceEd Ally is a fully voice-only Web App (WA) that empowers people with physical disabilities, motor impairments, visual impairments, or anyone who benefits from hands-free interaction to learn independently. Powered by **ElevenLabs Conversational AI Agents** and **Google Cloud Vertex AI Gemini**, it delivers adaptive, empathetic tutoring through natural speech—adjusting pace, tone, and content based on the user's emotional cues and needs.

**Live Demo**: [https://your-deployed-url-here.com](https://your-deployed-url-here.com) *(replace with actual URL after deployment)*

**Demo Video** (3 minutes): [YouTube/Vimeo link here]

## 🌟 Why VoiceEd Ally?

- **True Accessibility**: No typing, no mouse—100% voice interaction. Ideal for users with limited mobility, tremors, visual impairments, or fatigue.
- **Adaptive Learning**: Gemini detects sentiment and fatigue from voice, automatically slowing down, encouraging, or offering breaks.
- **Empathetic Voice**: ElevenLabs delivers natural, motivational voices that adapt tone (calm, energetic, supportive) to keep learners engaged.
- **Real Impact**: Teaches academic subjects (math, science, history) and practical life skills (voice-controlled tech, accessibility advocacy, independent living).
- **Community Knowledge Vault**: Users can (optionally) contribute anonymized tips to help others with similar needs.

This project addresses UN Sustainable Development Goal 4: Inclusive and equitable quality education.

## 🚀 Features

- Fully voice-driven conversation (real-time speech-to-text → AI → text-to-speech)
- Emotion & fatigue-aware adaptation using Gemini sentiment analysis
- Dynamic voice personality & pacing via ElevenLabs Agents
- Supportive visual enrichment (images & educational Shorts) with spoken descriptions for accessibility
- Interactive voice quizzes and personalized explanations
- Optional "Knowledge Vault" to save and share community tips
- Mobile-first PWA: Installable on any phone, works offline-capable

## 🛠 Tech Stack

- **Frontend**: React + Vite + TypeScript (SPA), styled with Tailwind CSS
- **Voice I/O**: ElevenLabs Web/JS SDK + Conversational AI Agents
- **AI Intelligence**: Google Vertex AI Gemini (Flash/Pro)
- **Visuals**: Pexels API (images) + YouTube Data API v3 (educational Shorts)
- **Storage**: Firebase Firestore & Storage (Knowledge Vault) *(optional)*
- **Backend**: Python + Flask REST API (for Gemini, auth, and data services)
- **Deployment**: Static hosting for frontend (e.g., Vercel, Netlify, Cloud Storage) + Google Cloud Run / similar for Flask backend
- **PWA**: Vite PWA plugin (installable app experience)

## 📦 Installation & Local Development

### Monorepo Layout

The project is structured as a simple frontend–backend monorepo:

- `frontend/` – React + Vite app (voice-only UI)
- `backend/` – Python + Flask API server (Gemini, ElevenLabs, data)

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Python 3.10+
- `pip` (and optionally `virtualenv` / `venv`)
- Google Cloud project with Vertex AI API enabled
- ElevenLabs account & API key
- Firebase project (optional, for Knowledge Vault)
- YouTube Data API v3 key (for Shorts)
- Pexels API key (free)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/voiceed-ally.git
cd voiceed-ally
```

### 2. Frontend (React + Vite)

From the repo root:

```bash
cd frontend
npm install           # or: yarn install / pnpm install
```

Create `frontend/.env`:

```env
VITE_ELEVENLABS_API_KEY=your_elevenlabs_key
VITE_ELEVENLABS_AGENT_ID=your_agent_id

VITE_YOUTUBE_API_KEY=your_youtube_key
VITE_PEXELS_API_KEY=your_pexels_key

VITE_API_BASE_URL=http://localhost:5000  # Flask backend URL
```

Run the frontend dev server:

```bash
npm run dev
# Open the printed localhost URL (typically http://localhost:5173)
```

Build for production:

```bash
npm run build
npm run preview
```

### 3. Backend (Python + Flask)

From the repo root:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Create `backend/.env` (or use your preferred config system):

```env
GOOGLE_GENAI_API_KEY=your_gemini_api_key  # or Vertex AI service account / ADC

ELEVENLABS_API_KEY=your_elevenlabs_key

YOUTUBE_API_KEY=your_youtube_key
PEXELS_API_KEY=your_pexels_key

FIREBASE_CONFIG=your_firebase_config_json  # optional
FLASK_ENV=development
FLASK_APP=app.py
```

Run the Flask API locally:

```bash
flask run --host=0.0.0.0 --port=5000
```

The frontend will talk to the backend via `VITE_API_BASE_URL` (default `http://localhost:5000`).

## 🚢 Deployment

### Frontend (React + Vite)

- **Static hosting**: Build with `npm run build` inside `frontend/`, then deploy the `frontend/dist` folder to:
  - Vercel
  - Netlify
  - GitHub Pages
  - Google Cloud Storage + Cloud CDN
- Make sure `VITE_API_BASE_URL` points to your deployed Flask backend URL.

### Backend (Flask + Python)

- Containerize the Flask app (e.g., with a `Dockerfile`) and deploy to:
  - Google Cloud Run *(recommended for Gemini integration)*
  - App Engine
  - Any container-friendly PaaS (Render, Railway, etc.)
- Configure environment variables in your deployment platform (Gemini, ElevenLabs, API keys).

## 🎨 Screenshots & Demo

*(Add actual screenshots here after building)*

- Microphone-centric mobile interface
- Visual carousel during lessons
- Adaptive response examples

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or PRs.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push and open a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- [Your Name] - Creator & Developer
- Built for Google Cloud AI Partner Catalyst Hackathon - ElevenLabs Challenge

## 🙏 Acknowledgments

- ElevenLabs for incredible voice technology and React SDK
- Google Cloud Vertex AI & Gemini team
- Pexels & YouTube for royalty-free educational media
- The accessibility community for inspiration

---

**VoiceEd Ally** — Learning should have no barriers. Let's make education truly inclusive, one voice at a time. 🌍❤️

