# AI Web App – Text Generator

![Uploading image.png…]()


## Project Overview
This is simple -to-use web application based on creation of AI texts using the Node.js (Express) and HTML/CSS/JavaScript.  .  
It allows users to:
- Enter a prompt
- Send it to an AI API (Hugging Face)
- Display the generated response on the page  

This project was created for the challenge:  
**“Build an AI-integrated web app with clean UI and solid architecture.”**

---

## Tech Stack
- Frontend:HTML, CSS, JavaScript  
- Backend:Node.js with Express  
- API: Hugging Face Inference API  
- Editor:Visual Studio Code  

---

##  How to Run This Project
### Install Node.js
If you don’t already have it:
- Go to [https://nodejs.org](https://nodejs.org)
To confirm installation, open **VS Code terminal** and run:
```bash
node -v
npm -v
```
You should see version numbers appear (e.g., `v20.x.x`).

---

### Open the Project in Visual Studio Code
1. Open Visual Studio Code
2. Go to File → Open Folder
3. Choose your project folder (the one containing `index.html`, `app.js`, and `server.js`)

---

### Open the Terminal in VS Code
From the top menu:  
 **View → Terminal**
---
### Initialize Node.js (only once)
Run this command:
```bash
npm init -y
```
This creates a `package.json` file.

---

### Install Dependencies
Run the following command to install everything needed:
```bash
npm install express cors node-fetch
```
---

### Start the Backend Server
Run:
```bash
node server.js
```
If successful, you’ll see this message:
```
Server running at http://localhost:4000
```

---
### Open the App in Your Browser
Now open your browser and go to:
```
http://localhost:4000
```
You should see your **AI Text Generator** interface.
---
### Use the App
- Type a prompt into the textbox (for example: *“Write a short poem about the ocean”*)  
- Click **Submit a response will be generated**
- Wait for the response from the AI model  
- Click **Clear** to reset the text area  

## 💡 Commands Summary
| Initialize Node -`npm init -y` 
| Install packages -`npm install express cors node-fetch` 
| Start the server -`node server.js` 
| Open in browser -`http://localhost:4000` 

---

##Files You Should Have
```
project-folder/
│
├── index.html     # Frontend UI (HTML)
├── app.js         # Handles frontend button clicks and fetch
├── server.js      # Node.js backend (Express + Hugging Face)
├── package.json   # Created automatically
└── README.md      # Setup instructions (this file)
```
---

##Features ()
Added chat history to show past responses  
Included a “Clear” button (already included)  
Style with CSS for a modern clean UI  

---
**Author:**Jaswanthi  
**Editor:** Visual Studio Code  
**Stack Used:** HTML, CSS, JavaScript, Node.js  
**Challenge Deadline:** 7 days  
