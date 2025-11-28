# Custom URL Shortener

A simple, custom URL shortener with an interstitial page for monetization, built with Node.js, Express, and MongoDB.

## Features
- **Shorten URLs**: API to generate short links.
- **Interstitial Page**: Shows a timer and ad placeholders before redirecting to the destination.
- **Click Tracking**: Basic click counting.

## Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [MongoDB](https://www.mongodb.com/) installed and running locally (or a cloud instance like MongoDB Atlas).

## Installation

1.  Clone the repository or download the files.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory (if not already present) with the following content:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/urlshortener
    API_KEY=mysecretapikey123
    ```
    *Replace `mysecretapikey123` with a strong key.*

## Running the Server

Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`.

## Usage

### Shorten a Link (API)
Send a POST request to `/api/shorten`:

**Endpoint:** `POST http://localhost:3000/api/shorten`
**Headers:** `Content-Type: application/json`
**Body:**
```json
{
  "originalUrl": "https://www.example.com/my-book-pdf",
  "apiKey": "mysecretapikey123"
}
```

**Response:**
```json
{
  "originalUrl": "https://www.example.com/my-book-pdf",
  "shortCode": "AbCd123",
  "clicks": 0,
  "_id": "...",
  "createdAt": "..."
}
```

### Access a Link
Go to `http://localhost:3000/AbCd123` in your browser. You will see the interstitial page with the timer, and then be able to continue to the original URL.

## Monetization (Ads)
To add ads, edit `views/interstitial.ejs`.
Look for the `<!-- Insert Ad Code Here -->` comments and paste your ad network's script tags there.

**Recommended Ad Networks for Link Shorteners:**
- **PropellerAds**: Good for interstitial/pop-under ads.
- **PopCash**: Another popular option for pop-under ads.
- **Adsterra**: Offers various ad formats.

*Note: Google AdSense is often strict about interstitial pages, so check their policies carefully if you choose to use them.*
