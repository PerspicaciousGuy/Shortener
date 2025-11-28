const axios = require('axios');

async function createLink() {
    try {
        const response = await axios.post('http://localhost:3000/api/shorten', {
            originalUrl: 'https://google.com',
            apiKey: 'mysecretapikey123'
        });
        console.log('Short Link Created:', response.data);
    } catch (error) {
        console.error('Error creating link:', error.response ? error.response.data : error.message);
    }
}

createLink();
