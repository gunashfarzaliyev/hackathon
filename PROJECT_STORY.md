### 💡 Inspiration
In an era where echo chambers and confirmation bias are the norm on the internet, it's becoming harder to find environments that truly challenge our thinking. We wanted to create a tool that doesn't just give answers or validate opinions, but instead forces users to think deeper. Inspired by the ancient Socratic method—the art of asking continuous, probing questions—we set out to build an AI that acts as a relentless intellectual sparring partner. The goal was to build a space where ideas can be stress-tested, logical fallacies exposed, and critical thinking sharpened.

### 🛠️ How we built it
The Socratic Sparring Partner is built as a modern, responsive web application:
* **Frontend:** We used **Next.js (App Router)** and **React** for a fast, seamless user interface. 
* **Styling:** The clean, minimalist "arena" aesthetic was crafted using **Tailwind CSS**, designed to keep the user focused on the conversation without distractions.
* **AI Brain:** The core logic is powered by the **Google Gemini API** (specifically the `gemini-2.5-flash` model). We engineered a strict system prompt that forbids the AI from giving direct answers, forcing it to instead analyze the user's input and respond strictly with probing questions.
* **Deployment:** The application is containerized using **Docker** and deployed on **Google Cloud Run** for scalable, serverless hosting.

### ⚠️ Challenges we faced
* **Taming the LLM:** By default, Large Language Models are designed to be helpful "answer machines." It was surprisingly difficult to restrict the Gemini model from simply agreeing with the user or providing paragraphs of explanations. We had to iterate heavily on the system instructions to ensure it remained purely inquisitive and called out logical fallacies (like ad hominem or straw man arguments) effectively.
* **API Role Constraints:** We ran into strict validation rules with the Gemini API regarding conversation history. The SDK requires chat history to begin specifically with a "user" role, but our app design required the AI to speak first ("Welcome to the Socratic Sparring Arena..."). We had to implement custom logic in our Next.js Server Actions to sanitize and format the conversation array on the fly before passing it to the SDK.
* **Cloud Deployment:** Configuring Docker to play nicely with Next.js's standalone build output and ensuring our environment variables (API keys) were securely passed into our Google Cloud Run container provided a great learning curve in cloud architecture.

### 🧠 What we learned
* **Prompt Engineering is a distinct skill.** We learned how nuanced system instructions need to be when you want an LLM to behave against its base training (asking questions instead of providing answers).
* **Next.js Server Actions.** We gained valuable experience securely handling API calls on the server side to protect our Gemini API keys while keeping the client-side React code clean.
* **Google Cloud & Docker.** We learned the end-to-end process of containerizing a Node.js application, pushing it to the Google Cloud Artifact Registry, and managing environment variables securely in a serverless environment.

### 🚀 What's next for Socratic Sparring Partner
We want to expand the tool from a simple chat interface into a comprehensive learning platform. Future features include:
* **Debate Grading:** An end-of-session summary that scores the user on their logical consistency and highlights fallacies they used.
* **Topic Modules:** Pre-loaded historical or philosophical debates where users can take a specific stance and defend it.
* **Voice Integration:** Implementing Text-to-Speech and Speech-to-Text so users can practice their verbal debating skills on the fly.