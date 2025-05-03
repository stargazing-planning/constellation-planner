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

        showConstellationInfo(lat);
        showViewingTime(lat);
      },
      error => {
        document.getElementById("planner-output").innerText = "❌ Geolocation error.";
      }
    );
  } else {
    document.getElementById("planner-output").innerText = "❌ Geolocation not supported.";
  }

  showObjectOfTheDay(); // Always show this
}

function getVisibleConstellations(lat, month) {
  const visible = [];
  if (lat > -60 && lat < 60) {
    if (month >= 10 || month <= 2) visible.push("Orion", "Taurus", "Capella");
    if (month >= 3 && month <= 7) visible.push("Ursa Major", "Leo", "Gemini");
    if (month >= 6 && month <= 9) visible.push("Scorpius", "Sagittarius");
  }
  return visible;
}

function showConstellationInfo(lat) {
  const month = new Date().getMonth();
  const visible = getVisibleConstellations(lat, month);
  const container = document.getElementById("constellation-info");
  container.innerHTML = "";

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
      description: "Visible in summer, Sagittarius is located near the center of the Milky Way.",
    },
    "Capella": {
      title: "Capella (The She-Goat)",
      description: "Visible in winter, Capella is one of the brightest stars in the night sky.",
    },
  };

  visible.forEach(name => {
    const box = document.createElement("div");
    box.className = "constellation-card";
    box.innerHTML = `<h3>${data[name].title}</h3><p>${data[name].description}</p>`;
    container.appendChild(box);
  });
}

// Rough estimate of best viewing hours (night time)
function showViewingTime(lat) {
  const date = new Date();
  const month = date.getMonth();
  let sunset = 18; // 6pm
  let sunrise = 6; // 6am

  if (lat > 40) {
    if (month >= 5 && month <= 7) { sunset = 21; sunrise = 5; } // Summer
    if (month >= 11 || month <= 1) { sunset = 17; sunrise = 7; } // Winter
  }

  document.getElementById("viewing-time").innerText = `🔭 Best Viewing Time: ~${sunset}:00 - ${sunrise}:00`;
}

// Rotating "Celestial Object of the Day"
function showObjectOfTheDay() {
  const objects = [
    "🌕 The Moon — Earth's natural satellite, causing tides and eclipses.",
    "🪐 Saturn — Known for its stunning rings, visible with a small telescope.",
    "🌟 Sirius — The brightest star in the night sky, part of Canis Major.",
    "🌌 Andromeda Galaxy — Our closest galactic neighbor, visible in dark skies.",
    "🛰️ The ISS — The International Space Station orbits Earth every 90 minutes.",
    "☄️ Halley's Comet — Only visible from Earth every 76 years.",
    "🔭 The North Star (Polaris) — Helps with navigation, always in the north.",
  ];
  const day = new Date().getDate();
  const object = objects[day % objects.length];
  document.getElementById("object-text").innerText = object;
}
