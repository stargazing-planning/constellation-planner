// Space Fact of the Day (Custom Space Fact List)
const spaceFacts = [
  "The Sun's mass takes up 99.86% of the total mass of our Solar System.",
  "There are more stars in the universe than grains of sand on Earth.",
  "A day on Venus is longer than a year on Venus.",
  "The largest volcano in the solar system, Olympus Mons, is on Mars.",
  "Neutron stars are so dense that a single teaspoon would weigh about 6 billion tons.",
  "A single teaspoon of a black hole's material would weigh more than Mount Everest.",
  "Saturn's moon Titan has lakes of liquid methane and ethane.",
  "The closest galaxy to the Milky Way is the Andromeda Galaxy, about 2.5 million light-years away.",
  "Pluto was reclassified as a dwarf planet in 2006 by the International Astronomical Union.",
  "There are more than 100 billion galaxies in the observable universe."
];

// Function to fetch a random space fact
function fetchSpaceFact() {
  const randomIndex = Math.floor(Math.random() * spaceFacts.length);
  const fact = spaceFacts[randomIndex];
  document.getElementById("fact-text").innerText = fact;
}

// Space Trivia questions array
const triviaQuestions = [
  { question: "What is the closest planet to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], answer: "Mercury" },
  { question: "What is the largest planet in our solar system?", options: ["Jupiter", "Saturn", "Neptune", "Uranus"], answer: "Jupiter" },
  { question: "Which planet is known as the Red Planet?", options: ["Mars", "Earth", "Venus", "Saturn"], answer: "Mars" },
  { question: "What is the name of our galaxy?", options: ["Andromeda", "Milky Way", "Pinwheel", "Whirlpool"], answer: "Milky Way" },
  { question: "What is the hottest planet in our solar system?", options: ["Venus", "Mercury", "Earth", "Mars"], answer: "Venus" },
  { question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: "Saturn" },
  { question: "How many moons does Earth have?", options: ["1", "2", "3", "4"], answer: "1" },
  { question: "Which planet is known for its beautiful rings?", options: ["Jupiter", "Saturn", "Neptune", "Uranus"], answer: "Saturn" }
];

// Space Trivia Question Logic
let currentQuestionIndex = 0;

function loadTriviaQuestion() {
  const questionData = triviaQuestions[currentQuestionIndex];
  document.getElementById("trivia-question").innerText = questionData.question;
  
  const optionsContainer = document.getElementById("trivia-options");
  optionsContainer.innerHTML = '';
  questionData.options.forEach(option => {
      const button = document.createElement("button");
      button.innerText = option;
      button.onclick = () => checkTriviaAnswer(option);
      optionsContainer.appendChild(button);
  });

  document.getElementById("trivia-feedback").innerText = '';
}

// Check if trivia answer is correct
function checkTriviaAnswer(selectedOption) {
  const correctAnswer = triviaQuestions[currentQuestionIndex].answer;
  if (selectedOption === correctAnswer) {
      document.getElementById("trivia-feedback").innerText = "Correct! Well done!";
  } else {
      document.getElementById("trivia-feedback").innerText = `Oops! The correct answer is: ${correctAnswer}.`;
  }

  setTimeout(() => {
      currentQuestionIndex = (currentQuestionIndex + 1) % triviaQuestions.length;
      loadTriviaQuestion();
  }, 2000);
}

// Show the planner information (location, time, constellations)
function showPlanner() {
  document.getElementById("planner-output").innerText = "Getting your location...";

  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
          position => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;

              const currentTime = new Date().toLocaleString();
              document.getElementById("planner-output").innerText = 
                `📍 Location: ${lat.toFixed(2)}, ${lon.toFixed(2)}\n🕒 Current Time: ${currentTime}`;

              // Call the function to show visible constellations
              showConstellationInfo(lat);
          },
          error => {
              document.getElementById("planner-output").innerText = "❌ Geolocation error.";
          }
      );
  } else {
      document.getElementById("planner-output").innerText = "❌ Geolocation not supported.";
  }
}

// Logic to determine which constellations are visible based on latitude and month
function getVisibleConstellations(lat, month) {
  const visible = [];

  // Simplified rules for visible constellations
  if (lat > -60 && lat < 60) {
      if (month >= 10 || month <= 2) visible.push("Orion", "Taurus", "Capella");  // Winter
      if (month >= 3 && month <= 7) visible.push("Ursa Major", "Leo", "Gemini");  // Spring/Summer
      if (month >= 6 && month <= 9) visible.push("Scorpius", "Sagittarius");      // Summer/Fall
  }

  return visible;
}

// Show constellation info based on location
function showConstellationInfo(lat) {
  const month = new Date().getMonth(); // 0 = Jan, 11 = Dec
  const visible = getVisibleConstellations(lat, month);
  const container = document.getElementById("constellation-info");
  container.innerHTML = ""; // Clear previous

  // Data for constellations
  const data = {
      "Orion": {
          title: "Orion the Hunter",
          description: "Visible in winter, Orion contains the bright stars Betelgeuse and Rigel.",
      },
      "Ursa Major": {
          title: "Ursa Major (Big Dipper)",
          description: "Visible in spring and summer, it's one of the most recognizable patterns.",
      },
      "Scorpius": {
          title: "Scorpius the Scorpion",
          description: "Visible in the summer with its bright red star Antares.",
      },
      "Leo": {
          title: "Leo the Lion",
          description: "Visible in spring, Leo is a large and distinctive constellation.",
      },
      "Taurus": {
          title: "Taurus the Bull",
          description: "Visible in winter and spring, Taurus contains the bright star Aldebaran.",
      },
      "Gemini": {
          title: "Gemini the Twins",
          description: "Visible in winter, Gemini is home to the stars Castor and Pollux.",
      },
      "Sagittarius": {
          title: "Sagittarius the Archer",
          description: "Visible in summer and fall, Sagittarius is known for its rich star fields.",
      }
  };

  // Render visible constellations
  visible.forEach(constellation => {
      const card = document.createElement("div");
      card.classList.add("constellation-card");
      card.innerHTML = `
          <h3>${data[constellation].title}</h3>
          <p>${data[constellation].description}</p>
      `;
      container.appendChild(card);
  });
}

// Fetch the Space Fact of the Day when the page loads
fetchSpaceFact();

// Load the first trivia question when the page loads
loadTriviaQuestion();
