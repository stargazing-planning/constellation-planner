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
  
          // Add the best time to stargaze
          const bestTime = getBestStargazingTime();
          document.getElementById("best-time").innerText = `🌙 Best Time to Stargaze: ${bestTime}`;
  
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
  
  // Determine the best time to go stargazing (General: Midnight to 3 AM)
  function getBestStargazingTime() {
    return "Between midnight and 3 AM, when skies are darkest.";
  }
  
  // Determine visible constellations by month and location
  function getVisibleConstellations(lat, month) {
    const visible = [];
  
    if (lat > -60 && lat < 60) {
      if (month >= 10 || month <= 2) visible.push("Orion", "Taurus", "Capella", "Canis Major", "Eridanus");
      if (month >= 3 && month <= 7) visible.push("Ursa Major", "Leo", "Gemini", "Bootes", "Virgo");
      if (month >= 6 && month <= 9) visible.push("Scorpius", "Sagittarius", "Aquila", "Lyra", "Hercules");
      visible.push("Cassiopeia", "Cygnus", "Draco", "Andromeda", "Pegasus"); // Circumpolar/Year-round
    }
  
    return visible;
  }
  
  // Data for each constellation
  const constellationData = {
    "Orion": {
      title: "Orion the Hunter",
      description: "Visible in winter, Orion contains the bright stars Betelgeuse and Rigel."
    },
    "Taurus": {
      title: "Taurus the Bull",
      description: "Visible in winter and spring, it contains Aldebaran and the Pleiades cluster."
    },
    "Capella": {
      title: "Capella (The She-Goat)",
      description: "One of the brightest stars in the winter sky, part of the Auriga constellation."
    },
    "Canis Major": {
      title: "Canis Major",
      description: "Home to Sirius, the brightest star in the night sky, visible in winter."
    },
    "Eridanus": {
      title: "Eridanus",
      description: "A long winding constellation representing a river, best seen in late fall and winter."
    },
    "Ursa Major": {
      title: "Ursa Major (Big Dipper)",
      description: "One of the most recognizable patterns, visible in spring and summer."
    },
    "Leo": {
      title: "Leo the Lion",
      description: "Visible in spring, Leo is large and distinctive with Regulus as its brightest star."
    },
    "Gemini": {
      title: "Gemini the Twins",
      description: "Visible in winter, Gemini is home to the stars Castor and Pollux."
    },
    "Bootes": {
      title: "Boötes the Herdsman",
      description: "Visible in spring and summer, Arcturus is its brightest star."
    },
    "Virgo": {
      title: "Virgo the Maiden",
      description: "Visible in spring, contains the bright star Spica."
    },
    "Scorpius": {
      title: "Scorpius the Scorpion",
      description: "Visible in the summer with its bright red star Antares."
    },
    "Sagittarius": {
      title: "Sagittarius the Archer",
      description: "Visible in summer, near the center of the Milky Way."
    },
    "Aquila": {
      title: "Aquila the Eagle",
      description: "Visible in summer, Altair is its brightest star."
    },
    "Lyra": {
      title: "Lyra the Harp",
      description: "Visible in summer, home to the bright star Vega."
    },
    "Hercules": {
      title: "Hercules",
      description: "Visible in summer, contains the Great Hercules Cluster (M13)."
    },
    "Cassiopeia": {
      title: "Cassiopeia",
      description: "A W-shaped constellation, visible year-round in northern skies."
    },
    "Cygnus": {
      title: "Cygnus the Swan",
      description: "Visible in summer, contains the bright star Deneb."
    },
    "Draco": {
      title: "Draco the Dragon",
      description: "A circumpolar constellation winding around Ursa Minor."
    },
    "Andromeda": {
      title: "Andromeda",
      description: "Visible in autumn, home to the Andromeda Galaxy (M31)."
    },
    "Pegasus": {
      title: "Pegasus",
      description: "Visible in autumn, contains the Great Square of Pegasus."
    }
  };
  
  // Show constellation info boxes
  function showConstellationInfo(lat) {
    const month = new Date().getMonth();
    const visible = getVisibleConstellations(lat, month);
    const container = document.getElementById("constellation-info");
    container.innerHTML = "";
  
    visible.forEach(name => {
      const card = document.createElement("div");
      card.className = "constellation-card";
      card.innerHTML = `<h3>${constellationData[name].title}</h3><p>${constellationData[name].description}</p>`;
      container.appendChild(card);
    });
  }
  
  // Space Facts - Static and reliable
const spaceFacts = [
    "A day on Venus is longer than a year on Venus.",
    "Neutron stars can spin 600 times per second.",
    "The largest known star is over 2,000 times wider than our Sun.",
    "There are more stars in the universe than grains of sand on Earth.",
    "The Sun accounts for 99.86% of the mass in our solar system.",
    "Jupiter has at least 79 moons.",
    "The footprints on the Moon will likely remain there for millions of years.",
    "One spoonful of a neutron star would weigh about a billion tons.",
    "A year on Mercury is just 88 Earth days long.",
    "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
    "Pluto's orbit is so eccentric, it sometimes comes closer to the Sun than Neptune.",
    "The Moon is slowly drifting away from the Earth at a rate of 1.5 inches per year.",
    "Mars has the tallest mountain in the solar system — Olympus Mons.",
    "The Milky Way is on a collision course with the Andromeda galaxy.",
    "Saturn could float in water because it's mostly made of gas.",
    "Black holes can slow down time relative to outside observers.",
    "It rains diamonds on Neptune and Uranus.",
    "The Moon has quakes, called 'moonquakes'.",
    "There’s a planet that rains molten glass sideways (HD 189733b).",
    "Astronauts grow taller in space due to spinal decompression.",
    "The Sun is a nearly perfect sphere — it's only 10 km wider at the equator than at the poles.",
    "Earth is the only planet not named after a mythological god.",
    "Saturn’s rings are made mostly of ice particles with some dust and rock.",
    "Comets have two tails: one of gas and one of dust.",
    "Mercury has no atmosphere, so temperatures swing wildly from hot to cold.",
    "The Hubble Space Telescope travels around Earth at about 5 miles per second.",
    "Our galaxy, the Milky Way, is estimated to contain 100–400 billion stars.",
    "Venus spins backward compared to most planets in our solar system.",
    "There are rogue planets that float through space without orbiting a star.",
    "Sunspots are cooler areas on the Sun’s surface caused by magnetic activity.",
    "The Kuiper Belt is a region beyond Neptune filled with icy bodies and dwarf planets.",
    "A full NASA spacesuit costs around $12 million.",
    "The Voyager 1 spacecraft is the farthest human-made object from Earth.",
    "No sound can travel through space because there is no air.",
    "The James Webb Space Telescope can see light from over 13 billion years ago.",
    "Astronauts’ hearts become more spherical in microgravity.",
    "There is a giant storm on Jupiter called the Great Red Spot that’s over 300 years old.",
    "One day on Jupiter lasts about 10 Earth hours.",
    "You would weigh 1/6 as much on the Moon as you do on Earth.",
    "It takes 243 Earth days for Venus to complete one rotation on its axis."
  
  ];
  
  // Choose one based on the day of the year
  function showSpaceFact() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const fact = spaceFacts[dayOfYear % spaceFacts.length];
    document.getElementById("fact-text").innerText = fact;
  }
  
  // Run this when the page loads
  window.onload = () => {
    showSpaceFact();
    // Any other init code you want can also go here
  };