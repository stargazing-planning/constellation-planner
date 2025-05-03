// Get the user's location and show planner info
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
    if (month >= 10 || month <= 2) visible.push("Orion", "Taurus", "Capella", "Canis Major");  // Winter
    if (month >= 3 && month <= 7) visible.push("Ursa Major", "Leo", "Gemini", "Lyra", "Cygnus");  // Spring/Summer
    if (month >= 6 && month <= 9) visible.push("Scorpius", "Sagittarius", "Cygnus", "Lyra"); // Summer/Fall
    if (month >= 8 && month <= 11) visible.push("Andromeda", "Cassiopeia"); // Fall
    visible.push("Cassiopeia"); // Cassiopeia is circumpolar for most northern latitudes
  }

  return [...new Set(visible)]; // Remove duplicates
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
      description: "Visible in summer, Sagittarius is located near the center of the Milky Way.",
    },
    "Capella": {
      title: "Capella (The She-Goat)",
      description: "Visible in winter, Capella is one of the brightest stars in the night sky.",
    },
    "Cassiopeia": {
      title: "Cassiopeia the Queen",
      description: "Visible year-round in the northern hemisphere. Recognizable by its W shape.",
    },
    "Cygnus": {
      title: "Cygnus the Swan",
      description: "Visible in summer, Cygnus flies through the Milky Way and includes the star Deneb.",
    },
    "Canis Major": {
      title: "Canis Major (Great Dog)",
      description: "Visible in winter, it includes Sirius, the brightest star in the night sky.",
    },
    "Andromeda": {
      title: "Andromeda the Princess",
      description: "Visible in the fall, home to the Andromeda Galaxy.",
    },
    "Lyra": {
      title: "Lyra the Harp",
      description: "Visible in summer, Lyra contains the bright star Vega.",
    }
  };

  // Display the info for visible constellations
  visible.forEach(name => {
    if (data[name]) {
      const box = document.createElement("div");
      box.className = "constellation-card";
      box.innerHTML = `<h3>${data[name].title}</h3><p>${data[name].description}</p>`;
      container.appendChild(box);
    }
  });
}