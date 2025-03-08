// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const chatButton = document.querySelector('.chat-button');
const chatWindow = document.querySelector('.chat-window');
const closeChat = document.querySelector('.close-chat');
const collegeSelect = document.getElementById('college-select');
const chatCollegeSelect = document.getElementById('chat-college-select');
const loadingSpinner = document.querySelector('.loading-spinner');
const chatLoadingSpinner = document.querySelector('.chat-loading-spinner');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.chat-input button');
const currentYear = document.getElementById('current-year');

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Sample college data (to replace database)
const colleges = [
  { id: 1, name: "Indian Institute of Technology Delhi" },
  { id: 2, name: "Indian Institute of Technology Bombay" },
  { id: 3, name: "Indian Institute of Technology Madras" },
  { id: 4, name: "Indian Institute of Technology Kanpur" },
  { id: 5, name: "Indian Institute of Technology Kharagpur" },
  { id: 6, name: "Delhi University" },
  { id: 7, name: "Anna University" },
  { id: 8, name: "Jadavpur University" },
  { id: 9, name: "Banaras Hindu University" },
  { id: 10, name: "Vellore Institute of Technology" }
];

// Sample college details (to replace database)
const collegeDetails = {
  1: {
    location: "New Delhi",
    website: "https://home.iitd.ac.in/",
    ranking: 1,
    facilities: "Library, Sports Complex, Labs, Hostels, Cafeteria",
    courses: [
      { name: "B.E. - Computer Science and Engineering", duration: "4 years", eligibility: "10+2 with PCM, minimum 60%", fees: 150000 },
      { name: "B.E. - Computer Science with AI", duration: "4 years", eligibility: "10+2 with PCM, minimum 60%", fees: 175000 },
      { name: "B.E. - Computer Science with Data Science", duration: "4 years", eligibility: "10+2 with PCM, minimum 60%", fees: 180000 },
      { name: "B.E. - Electronics and Communication", duration: "4 years", eligibility: "10+2 with PCM, minimum 60%", fees: 140000 },
      { name: "B.E. - Mechanical Engineering", duration: "4 years", eligibility: "10+2 with PCM, minimum 60%", fees: 130000 },
      { name: "M.Tech - Computer Science", duration: "2 years", eligibility: "B.E./B.Tech with minimum 60%", fees: 200000 },
      { name: "M.Tech - Electronics", duration: "2 years", eligibility: "B.E./B.Tech with minimum 60%", fees: 190000 },
      { name: "Ph.D - Computer Science", duration: "3-5 years", eligibility: "M.Tech/M.E. with minimum 65%", fees: 100000 }
    ]
  },
  // Add similar data for other colleges (2-10)
  2: {
    location: "Mumbai",
    website: "https://www.iitb.ac.in/",
    ranking: 2,
    facilities: "Library, Sports Complex, Labs, Hostels, Cafeteria",
    courses: [
      { name: "B.E. - Computer Science and Engineering", duration: "4 years", eligibility: "10+2 with PCM, minimum 60%", fees: 150000 },
      { name: "B.E. - Electrical Engineering", duration: "4 years", eligibility: "10+2 with PCM, minimum 60%", fees: 140000 },
      { name: "M.Tech - Computer Science", duration: "2 years", eligibility: "B.E./B.Tech with minimum 60%", fees: 200000 }
    ]
  }
};

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Chat window toggle
chatButton.addEventListener('click', () => {
  chatWindow.classList.toggle('hidden');
});

closeChat.addEventListener('click', () => {
  chatWindow.classList.add('hidden');
});

// Populate college dropdowns
function populateCollegeDropdowns() {
  // Simulate loading
  loadingSpinner.classList.remove('hidden');
  chatLoadingSpinner.classList.remove('hidden');
  collegeSelect.disabled = true;
  chatCollegeSelect.disabled = true;
  
  setTimeout(() => {
    // Add colleges to dropdowns
    colleges.forEach(college => {
      const option = document.createElement('option');
      option.value = college.id;
      option.textContent = college.name;
      
      const chatOption = option.cloneNode(true);
      
      collegeSelect.appendChild(option);
      chatCollegeSelect.appendChild(chatOption);
    });
    
    // Hide loading spinners
    loadingSpinner.classList.add('hidden');
    chatLoadingSpinner.classList.add('hidden');
    collegeSelect.disabled = false;
    chatCollegeSelect.disabled = false;
  }, 1000); // Simulate network delay
}

// Handle college selection
let selectedCollege = null;

function handleCollegeSelection(selectElement) {
  const collegeId = parseInt(selectElement.value);
  
  // Update both dropdowns
  collegeSelect.value = collegeId || '';
  chatCollegeSelect.value = collegeId || '';
  
  // Clear chat messages
  chatMessages.innerHTML = '';
  
  if (collegeId) {
    selectedCollege = collegeId;
    
    // Enable chat input
    chatInput.disabled = false;
    sendButton.disabled = false;
    
    // Add welcome message
    const collegeName = colleges.find(c => c.id === collegeId).name;
    addBotMessage(`Welcome to our college admission assistant! How can I help you with information about ${collegeName}?`);
  } else {
    selectedCollege = null;
    
    // Disable chat input
    chatInput.disabled = true;
    sendButton.disabled = true;
    
    // Show empty message
    chatMessages.innerHTML = '<div class="empty-message">Please select a college to start chatting</div>';
  }
}

collegeSelect.addEventListener('change', () => handleCollegeSelection(collegeSelect));
chatCollegeSelect.addEventListener('change', () => handleCollegeSelection(chatCollegeSelect));

// Chat functionality
function addUserMessage(text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user-message';
  
  messageDiv.innerHTML = `
    <div class="message-content">${text}</div>
    <div class="message-info">You</div>
  `;
  
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

function addBotMessage(text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot-message';
  
  messageDiv.innerHTML = `
    <div class="message-content">${text}</div>
    <div class="message-info">Assistant</div>
  `;
  
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

function showTypingIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'typing-indicator';
  indicator.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  
  chatMessages.appendChild(indicator);
  scrollToBottom();
  return indicator;
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Process user message and generate response
function processMessage(message) {
  if (!selectedCollege) return;
  
  const userMessage = message.toLowerCase();
  const college = collegeDetails[selectedCollege];
  let response = '';
  
  // Check for different query types
  if (userMessage.match(/fee|cost|price|tuition/)) {
    response = `The fee structure for ${colleges.find(c => c.id === selectedCollege).name} varies by program:\n\n`;
    college.courses.forEach(course => {
      response += `- ${course.name}: ₹${course.fees} per year\n`;
    });
  }
  else if (userMessage.match(/course|program|degree|branch/)) {
    response = `${colleges.find(c => c.id === selectedCollege).name} offers the following courses:\n\n`;
    college.courses.forEach(course => {
      response += `- ${course.name} (${course.duration})\n`;
    });
  }
  else if (userMessage.match(/eligibility|criteria|requirement|qualify/)) {
    response = `Eligibility criteria for courses at ${colleges.find(c => c.id === selectedCollege).name}:\n\n`;
    college.courses.forEach(course => {
      response += `- ${course.name}: ${course.eligibility}\n`;
    });
  }
  else if (userMessage.match(/location|address|place|city/)) {
    response = `${colleges.find(c => c.id === selectedCollege).name} is located in ${college.location}.`;
  }
  else if (userMessage.match(/rank|ranking|position/)) {
    response = `${colleges.find(c => c.id === selectedCollege).name} has a national ranking of ${college.ranking}.`;
  }
  else if (userMessage.match(/facility|facilities|amenities|infrastructure/)) {
    response = `Facilities available at ${colleges.find(c => c.id === selectedCollege).name} include: ${college.facilities}`;
  }
  else if (userMessage.match(/website|site|link|url/)) {
    response = `You can visit the official website of ${colleges.find(c => c.id === selectedCollege).name} at: ${college.website}`;
  }
  else if (userMessage.match(/duration|years|time|period/)) {
    response = `Course durations at ${colleges.find(c => c.id === selectedCollege).name}:\n\n`;
    college.courses.forEach(course => {
      response += `- ${course.name}: ${course.duration}\n`;
    });
  }
  else {
    response = `Welcome to ${colleges.find(c => c.id === selectedCollege).name} information service! You can ask about:\n\n` +
               "- Courses offered\n" +
               "- Fee structure\n" +
               "- Eligibility criteria\n" +
               "- Location\n" +
               "- Ranking\n" +
               "- Facilities\n" +
               "- Website\n" +
               "- Course duration";
  }
  
  return response.replace(/\n/g, '<br>');
}

// Send message
function sendMessage() {
  const message = chatInput.value.trim();
  if (!message || !selectedCollege) return;
  
  // Add user message
  addUserMessage(message);
  chatInput.value = '';
  
  // Show typing indicator
  const indicator = showTypingIndicator();
  
  // Process message and respond (with delay for natural feel)
  setTimeout(() => {
    // Remove typing indicator
    indicator.remove();
    
    // Add bot response
    const response = processMessage(message);
    addBotMessage(response);
  }, 1000);
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  populateCollegeDropdowns();
});