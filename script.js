import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';

// Definisci generateId come funzione globale
window.generateId = nanoid;
// Function to generate a unique ID (using nanoid)
const generateId = () => nanoid();

let posts = [];
const MAX_POSTS = 7;

// current date and time as a string
const getCurrentDateTime = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Mesi da 0 a 11
    const year = now.getFullYear().toString().slice(2);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} | ${hours}:${minutes}:${seconds}`;
};

// renderizzare i post
const renderPosts = () => {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = posts.map(post => `
        <div class="p-4 bg-gray-800 rounded-md shadow-md transition duration-300 ease-in-out hover:bg-gray-700 columns-2">
            <p>${escapeHTML(post.content)}</p>
            <div id="date" class="ml-20">
                <h2 class="ml-20 decoration-dashed text-sm">${post.date}</h2>
            </div>
        </div>
    `).join('');
    // Scroll to the bottom to show the latest post
    postsContainer.scrollTop = postsContainer.scrollHeight;
    console.log('Posts rendered:', posts); // Debug log
};

// Funzione per eseguire l'escape dell'HTML per prevenire XSS
const escapeHTML = (str) => {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
};

// Function to add a new post
const addPost = (content) => {
    const newPost = { 
        id: generateId(), 
        content, 
        date: getCurrentDateTime()
    };
posts.unshift(newPost); // Add new post to the beginning of the array
    
// Remove old posts if exceeding the maximum limit
if (posts.length > MAX_POSTS) {
    posts = posts.slice(0, MAX_POSTS); // Keep only the most recent posts
}

console.log('Posts after adding:', posts); // Debug log
renderPosts();
savePostsToLocalStorage(); // Save posts to localStorage
};


// Handle form submission
document.getElementById('postForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newPostContent = document.getElementById('newPost').value.trim();
    console.log('New post content:', newPostContent); // Debug log
        if (newPostContent) {
            addPost(newPostContent); // Use addPost to handle new posts
            document.getElementById('newPost').value = '';
        }
    });
// Function to save posts to localStorage
const savePostsToLocalStorage = () => {
    localStorage.setItem('posts', JSON.stringify(posts));
    };

// Function to load posts from localStorage
const loadPostsFromLocalStorage = () => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
    };


// Carica i post dal localStorage all'inizio
posts = loadPostsFromLocalStorage();

// Render iniziale
renderPosts();

// Debug: Log quando lo script ha finito di caricarsi
console.log('Script loaded. Posts:', posts);