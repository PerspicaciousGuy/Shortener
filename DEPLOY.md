# How to Deploy Your URL Shortener for Free

We will use **Render.com** to host your Node.js app for free.

## Step 1: Put Your Code on GitHub
1.  **Create a GitHub Account**: Go to [github.com](https://github.com) and sign up (if you haven't already).
2.  **Create a New Repository**:
    *   Click the **+** icon in the top right -> **New repository**.
    *   Name it `url-shortener`.
    *   Make it **Private** (recommended since it's for your bot).
    *   Click **Create repository**.
3.  **Push Your Code**:
    *   Copy the commands under "…or push an existing repository from the command line". They look like this:
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/url-shortener.git
        git branch -M main
        git push -u origin main
        ```
    *   Run those commands in your terminal here (I can help if you paste the URL).

## Step 2: Deploy on Render
1.  Go to [render.com](https://render.com) and sign up (you can use your GitHub account).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub account and select the `url-shortener` repository.
4.  **Configure the Service**:
    *   **Name**: `my-url-shortener` (or whatever you want).
    *   **Region**: Choose one close to you.
    *   **Branch**: `main`.
    *   **Runtime**: `Node`.
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
    *   **Instance Type**: Select **Free**.
5.  **Environment Variables** (Crucial!):
    *   Scroll down to "Environment Variables" and click **Add Environment Variable**.
    *   Add these two:
        *   Key: `MONGO_URI` | Value: `mongodb+srv://shorten:shorten@shorten.fo3ioy3.mongodb.net/?appName=shorten`
        *   Key: `API_KEY` | Value: `1f9180e7c06e30e50518e1f23a988c4edeada3dc2f8403324aa7b50d135b36cd`
6.  Click **Create Web Service**.

## Step 3: Done!
Render will deploy your app. It might take a few minutes.
Once finished, it will give you a URL like `https://my-url-shortener.onrender.com`.

**Use that URL in your Telegram Bot!**
