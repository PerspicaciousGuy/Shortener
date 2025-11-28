const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/links.json');

// Ensure data directory and file exist
if (!fs.existsSync(path.dirname(DATA_FILE))) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

function getLinks() {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
}

function saveLink(link) {
    const links = getLinks();
    links.push(link);
    fs.writeFileSync(DATA_FILE, JSON.stringify(links, null, 2));
}

function findLink(query) {
    const links = getLinks();
    return links.find(l => {
        for (let key in query) {
            if (l[key] !== query[key]) return false;
        }
        return true;
    });
}

function updateLink(link) {
    const links = getLinks();
    const index = links.findIndex(l => l.shortCode === link.shortCode);
    if (index !== -1) {
        links[index] = link;
        fs.writeFileSync(DATA_FILE, JSON.stringify(links, null, 2));
    }
}

module.exports = {
    findLink,
    saveLink,
    updateLink
};
