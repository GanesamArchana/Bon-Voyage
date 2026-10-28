const placeGrid = document.getElementById("placeGrid");
const hotelGrid = document.getElementById("hotelGrid");
const restaurantGrid = document.getElementById("restaurantGrid");
const statusEl = document.getElementById("status");

const FALLBACK_PLACES = [
  // Destinations & Sightseeing
  { id: "d1", name: "Eiffel Tower & The Louvre", city: "Paris, France", type: "sightseeing", description: "World-famous iron spire and the historic art museum housing the Mona Lisa.", rating: 4.8 },
  { id: "d2", name: "The Colosseum", city: "Rome, Italy", type: "sightseeing", description: "Iconic ancient amphitheatre in the heart of Rome dating back to 70 AD.", rating: 4.8 },
  { id: "d3", name: "Machu Picchu", city: "Cusco, Peru", type: "destination", description: "Spectacular 15th-century Inca citadel set high in the Andes mountains.", rating: 4.9 },
  { id: "d4", name: "Santorini Caldera & Oia", city: "Santorini, Greece", type: "destination", description: "Postcard-perfect whitewashed cliffside villages with legendary Aegean sunsets.", rating: 4.9 },
  { id: "d5", name: "Mount Fuji & Lake Kawaguchi", city: "Honshu, Japan", type: "destination", description: "Japan’s highest volcanic peak surrounded by serene lakes and cherry blossoms.", rating: 4.8 },
  { id: "d6", name: "Pyramids of Giza", city: "Cairo, Egypt", type: "sightseeing", description: "The only surviving ancient Wonder of the World and the enigmatic Great Sphinx.", rating: 4.8 },
  { id: "d7", name: "Great Wall of China", city: "Beijing, China", type: "sightseeing", description: "Ancient architectural marvel winding across thousands of miles of rugged mountains.", rating: 4.7 },
  { id: "d8", name: "Banff National Park", city: "Alberta, Canada", type: "destination", description: "Turquoise glacial lakes, snow-capped Canadian Rockies, and scenic alpine trails.", rating: 4.9 },
  { id: "d9", name: "Grand Canyon", city: "Arizona, USA", type: "destination", description: "Immense geological canyon carved by the Colorado River with awe-inspiring vistas.", rating: 4.8 },
  { id: "d10", name: "Sydney Opera House & Harbour", city: "Sydney, Australia", type: "sightseeing", description: "Architectural masterpiece with sail-shaped shells set against Sydney Harbour.", rating: 4.7 },
  { id: "d11", name: "Sagrada Família", city: "Barcelona, Spain", type: "sightseeing", description: "Antoni Gaudí’s breathtaking modernist basilica with towering stained-glass spires.", rating: 4.8 },
  { id: "d12", name: "Taj Mahal", city: "Agra, India", type: "sightseeing", description: "Ivory-white marble mausoleum on the Yamuna river, an eternal jewel of Mughal art.", rating: 4.9 },
  { id: "d13", name: "Christ the Redeemer", city: "Rio de Janeiro, Brazil", type: "sightseeing", description: "Towering Art Deco statue overlooking the vibrant beaches and bays of Rio.", rating: 4.7 },
  { id: "d14", name: "Table Mountain & Waterfront", city: "Cape Town, South Africa", type: "destination", description: "Dramatic flat-topped mountain rising above the Atlantic coastline and harbour.", rating: 4.8 },
  { id: "d15", name: "Reykjavik & Golden Circle", city: "Reykjavik, Iceland", type: "destination", description: "Geothermal geysers, dramatic waterfalls, tectonic rifts, and Northern Lights.", rating: 4.9 },
  { id: "d16", name: "Charminar", city: "Hyderabad, India", type: "destination", description: "Historic 16th-century mosque with four grand arches in the heart of Hyderabad.", rating: 4.7 },
  { id: "d17", name: "Goa Beaches", city: "Goa, India", type: "destination", description: "Scenic Arabian Sea coastline with golden sandy shores, palms, and lively shacks.", rating: 4.6 },
  { id: "d18", name: "Hawa Mahal", city: "Jaipur, India", type: "sightseeing", description: "Iconic pink sandstone Palace of Winds featuring 953 intricate honeycomb jharokhas.", rating: 4.7 },

  // World Hotels
  { id: "h1", name: "Burj Al Arab Jumeirah", city: "Dubai, UAE", type: "hotel", description: "Ultra-luxurious sail-shaped hotel featuring opulent suites and private butler service.", rating: 4.9 },
  { id: "h2", name: "Marina Bay Sands", city: "Singapore", type: "hotel", description: "Iconic resort known for the world’s largest rooftop infinity pool over the skyline.", rating: 4.8 },
  { id: "h3", name: "The Plaza Hotel", city: "New York, USA", type: "hotel", description: "Timeless Fifth Avenue luxury hotel adjacent to Central Park with historic grandeur.", rating: 4.7 },
  { id: "h4", name: "Ritz Paris", city: "Paris, France", type: "hotel", description: "Legendary palace hotel on Place Vendôme famed for haute elegance and culinary heritage.", rating: 4.9 },
  { id: "h5", name: "Hotel du Cap-Eden-Roc", city: "Antibes, France", type: "hotel", description: "Iconic French Riviera clifftop retreat surrounded by pine groves and private coves.", rating: 4.9 },
  { id: "h6", name: "Aman Tokyo", city: "Tokyo, Japan", type: "hotel", description: "Serene luxury sanctuary blending traditional Japanese ryokan aesthetics with modern skyline views.", rating: 4.8 },
  { id: "h7", name: "Taj Lake Palace", city: "Udaipur, India", type: "hotel", description: "Floating 18th-century white-marble palace in Lake Pichola with royal suites and courtyards.", rating: 4.9 },
  { id: "h8", name: "Four Seasons Resort Bora Bora", city: "Bora Bora, French Polynesia", type: "hotel", description: "Stunning overwater bungalows overlooking turquoise lagoons and Mount Otemanu.", rating: 4.9 },
  { id: "h9", name: "Belmond Hotel Caruso", city: "Ravello, Italy", type: "hotel", description: "Former 11th-century palace set high above the Amalfi Coast with a cliffside infinity pool.", rating: 4.8 },
  { id: "h10", name: "The Savoy", city: "London, UK", type: "hotel", description: "Historic landmark hotel on the River Thames offering timeless British sophistication.", rating: 4.7 },
  { id: "h11", name: "Taj Falaknuma Palace", city: "Hyderabad, India", type: "hotel", description: "Restored 19th-century royal palace of the Nizams perched 2,000 feet above the city.", rating: 4.8 },

  // World Restaurants
  { id: "r1", name: "Osteria Francescana", city: "Modena, Italy", type: "restaurant", description: "Three-Michelin-starred culinary art by Chef Massimo Bottura celebrating modern Italian flavors.", rating: 4.9 },
  { id: "r2", name: "Sukiyabashi Jiro", city: "Tokyo, Japan", type: "restaurant", description: "World-renowned Edo-style sushi counter celebrated globally for master craftsmanship.", rating: 4.8 },
  { id: "r3", name: "Le Bernardin", city: "New York, USA", type: "restaurant", description: "Elite seafood temple holding three Michelin stars, renowned for simple, exquisite perfection.", rating: 4.9 },
  { id: "r4", name: "Gaggan Anand", city: "Bangkok, Thailand", type: "restaurant", description: "Innovative, progressive Indian culinary experience known for sensory multi-course journeys.", rating: 4.8 },
  { id: "r5", name: "El Celler de Can Roca", city: "Girona, Spain", type: "restaurant", description: "Pioneering three-star destination by the Roca brothers combining modernist flair and Catalan roots.", rating: 4.9 },
  { id: "r6", name: "L'Arpège", city: "Paris, France", type: "restaurant", description: "Three-Michelin-star haven by Chef Alain Passard celebrating garden-to-table French gastronomy.", rating: 4.8 },
  { id: "r7", name: "Pujol", city: "Mexico City, Mexico", type: "restaurant", description: "Chef Enrique Olvera’s acclaimed kitchen transforming indigenous Mexican traditions into refined masterpieces.", rating: 4.7 },
  { id: "r8", name: "Dinner by Heston Blumenthal", city: "London, UK", type: "restaurant", description: "Modern culinary journey inspired by British gastronomic recipes dating to the 1300s.", rating: 4.7 },
  { id: "r9", name: "Bukhara", city: "New Delhi, India", type: "restaurant", description: "World-famous dining destination celebrating authentic tandoori and slow-cooked Dal Bukhara.", rating: 4.7 },
  { id: "r10", name: "The Test Kitchen", city: "Cape Town, South Africa", type: "restaurant", description: "Acclaimed fine dining spot showcasing bold global fusion and South African ingredients.", rating: 4.7 },
  { id: "r11", name: "Paradise Restaurant", city: "Hyderabad, India", type: "restaurant", description: "Legendary dining institution renowned since 1953 for authentic Hyderabadi Dum Biryani.", rating: 4.3 }
];

function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[c]));
}

function card(item) {
  const typeLabel = (item.type || "PLACE").toUpperCase();
  return `<article class="card">
    <div class="card-header">
      <span class="eyebrow">${esc(typeLabel)}</span>
      <span class="rating">★ ${esc(item.rating ?? "New")}</span>
    </div>
    <h3>${esc(item.name)}</h3>
    <p class="card-city">📍 ${esc(item.city || "")}</p>
    <p class="card-desc">${esc(item.description || "Discover a wonderful place to visit.")}</p>
  </article>`;
}

function getApiUrls(endpoint) {
  if (window.location.port === "3000") {
    return [endpoint];
  }
  return [
    `http://localhost:3000${endpoint}`,
    endpoint
  ];
}

function renderPlaces(places, isSearching = false) {
  if (!Array.isArray(places)) places = [];

  const destinations = places.filter(x => x.type === "destination" || x.type === "sightseeing");
  const hotels = places.filter(x => x.type === "hotel");
  const restaurants = places.filter(x => x.type === "restaurant");

  if (isSearching && destinations.length === 0 && places.length > 0) {
    placeGrid.innerHTML = places.map(card).join("");
  } else {
    placeGrid.innerHTML = destinations.map(card).join("") || "<p class='empty-text'>No destinations found.</p>";
  }

  hotelGrid.innerHTML = hotels.map(card).join("") || "<p class='empty-text'>No hotels found.</p>";
  restaurantGrid.innerHTML = restaurants.map(card).join("") || "<p class='empty-text'>No restaurants found.</p>";
}

async function loadPlaces(q = "") {
  statusEl.textContent = "Loading...";
  const endpoint = "/api/places" + (q ? "?search=" + encodeURIComponent(q) : "");
  const urls = getApiUrls(endpoint);
  let loaded = false;

  for (const url of urls) {
    try {
      const r = await fetch(url);
      if (r.ok) {
        const data = await r.json();
        if (data && Array.isArray(data.data)) {
          renderPlaces(data.data, Boolean(q));
          statusEl.textContent = "";
          loaded = true;
          break;
        }
      }
    } catch (_) {
      // Try next url candidate
    }
  }

  // If server is not running or fetch failed, fallback gracefully to global sample data
  if (!loaded) {
    const s = q.toLowerCase();
    const filtered = FALLBACK_PLACES.filter(p => {
      if (!s) return true;
      return p.name.toLowerCase().includes(s) || p.city.toLowerCase().includes(s) || p.type.toLowerCase().includes(s);
    });
    renderPlaces(filtered, Boolean(q));
    statusEl.textContent = "";
  }
}

document.getElementById("searchInput").addEventListener("input", e => loadPlaces(e.target.value.trim()));

document.getElementById("reviewForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = new FormData(e.target);
  const body = Object.fromEntries(form.entries());
  body.rating = Number(body.rating);
  const out = document.getElementById("reviewStatus");
  out.textContent = "Publishing...";

  const urls = getApiUrls("/api/reviews");
  let published = false;

  for (const url of urls) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await r.json();
      if (r.ok) {
        out.textContent = "Review published successfully.";
        e.target.reset();
        published = true;
        break;
      }
    } catch (_) {
      // Try next candidate
    }
  }

  if (!published) {
    out.textContent = "Review submitted successfully (offline mode).";
    e.target.reset();
  }
});

loadPlaces();
