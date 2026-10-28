require('dotenv').config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const supabase = require("./supabase");

const app = express();
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));
app.use(express.json({ limit: "100kb" }));

// Enable CORS for local development (e.g., Live Server)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, "..", "frontend")));

function clean(v, max) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

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

app.get("/api/health", (req, res) => res.json({ ok: true, service: "bon-voyage" }));

app.get("/api/places", async (req, res, next) => {
  try {
    const search = clean(req.query.search, 100);
    let places = null;

    if (supabase) {
      try {
        let query = supabase.from("places").select("id,name,city,type,description,rating").order("name");
        if (search) query = query.or(`name.ilike.%${search}%,city.ilike.%${search}%,type.ilike.%${search}%`);
        const { data, error } = await query;
        if (error) {
          console.warn("Supabase places fetch error:", error.message);
        } else if (data && data.length > 0) {
          places = data;
        }
      } catch (err) {
        console.warn("Supabase query exception:", err.message);
      }
    }

    if (!places) {
      places = FALLBACK_PLACES.filter(p => {
        if (!search) return true;
        const s = search.toLowerCase();
        return p.name.toLowerCase().includes(s) || p.city.toLowerCase().includes(s) || p.type.toLowerCase().includes(s);
      });
    }

    res.json({ data: places });
  } catch (e) {
    next(e);
  }
});

app.post("/api/reviews", async (req, res, next) => {
  try {
    const name = clean(req.body.name, 80);
    const title = clean(req.body.title, 120);
    const content = clean(req.body.content, 1000);
    const rating = Number(req.body.rating);

    if (!name || !title || !content || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Please provide a name, title, review, and rating from 1 to 5." });
    }

    let createdReview = { id: Date.now().toString(), name, title, content, rating, created_at: new Date().toISOString() };

    if (supabase) {
      try {
        const { data, error } = await supabase.from("reviews").insert({ name, title, content, rating }).select("id,name,title,content,rating,created_at").single();
        if (error) {
          console.warn("Supabase review insert error:", error.message);
        } else if (data) {
          createdReview = data;
        }
      } catch (err) {
        console.warn("Supabase review exception:", err.message);
      }
    }

    res.status(201).json({ data: createdReview });
  } catch (e) {
    next(e);
  }
});

app.get('/{*splat}', (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ message: "Something went wrong on the server." });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`Bon Voyage running at http://localhost:${port}`));
