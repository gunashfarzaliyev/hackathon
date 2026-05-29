# Socratic Sparring Partner

![Socratic Sparring Partner Screenshot](https://i.imgur.com/7anidJ8.png)

> An AI-powered sparring partner that uses the Socratic method to challenge your assumptions, test your arguments, and help you refine your critical thinking skills.

## 📖 Overview

In an era where echo chambers and confirmation bias are the norm on the internet, it's becoming harder to find environments that truly challenge our thinking. The Socratic Sparring Partner is a web application that acts as a relentless intellectual debater. 

Powered by Google's Gemini AI, this tool doesn't just give answers or validate opinions. Instead, it forces you to think deeper by continuously asking probing questions, exposing logical fallacies, and stress-testing your ideas.

## ✨ Features

- **Philosophical Starter Topics:** Quick-start buttons featuring classic questions paired with the famous philosophers who championed them (e.g., Sartre, Kant, Aristotle, Descartes).
- **Socratic Questioning:** The AI is strictly prompted to avoid giving direct answers, forcing you to articulate and defend your claims.
- **Fallacy Detection:** Subtle identification of logical missteps (ad hominem, straw man, etc.) embedded in the AI's follow-up questions.
- **Minimalist "Arena" UI:** A clean, distraction-free chat interface designed to keep focus purely on the intellectual debate.
- **Real-time Streaming:** Fast, responsive interactions powered by Next.js Server Actions and the Gemini API.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Frontend:** React, Tailwind CSS
- **AI Brain:** Google Gemini API (`gemini-2.5-flash`)
- **Deployment:** Docker, Google Cloud Run

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd hackaton
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## ☁️ Deployment (Google Cloud Run)

This project includes a `Dockerfile` optimized for Next.js standalone builds.

1. **Build and push the container to Google Artifact Registry:**
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/hackaton
   ```

2. **Deploy the container to Google Cloud Run:**
   ```bash
   gcloud run deploy hackaton-app \
     --image gcr.io/YOUR_PROJECT_ID/hackaton \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars="GEMINI_API_KEY=your_gemini_api_key_here"
   ```

## 🧠 What's Next

- **Debate Grading:** End-of-session summaries scoring logical consistency.
- **Topic Modules:** Pre-loaded historical or philosophical debates to practice defending specific stances.
- **Voice Integration:** Practice verbal debating skills with Text-to-Speech and Speech-to-Text.

---
*Built during a Hackathon. Challenge your assumptions, refine your logic.*