const { createClient } = require('../backend/node_modules/@supabase/supabase-js');
require('../backend/node_modules/dotenv').config({ path: '../backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in backend/.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const globalPlaces = [
  // Top World Destinations & Sightseeing
  { name: "Eiffel Tower & The Louvre", city: "Paris, France", type: "sightseeing", description: "World-famous iron spire and the historic art museum housing the Mona Lisa.", rating: 4.8 },
  { name: "The Colosseum", city: "Rome, Italy", type: "sightseeing", description: "Iconic ancient amphitheatre in the heart of Rome dating back to 70 AD.", rating: 4.8 },
  { name: "Machu Picchu", city: "Cusco, Peru", type: "destination", description: "Spectacular 15th-century Inca citadel set high in the Andes mountains.", rating: 4.9 },
  { name: "Santorini Caldera & Oia", city: "Santorini, Greece", type: "destination", description: "Postcard-perfect whitewashed cliffside villages with legendary Aegean sunsets.", rating: 4.9 },
  { name: "Mount Fuji & Lake Kawaguchi", city: "Honshu, Japan", type: "destination", description: "Japan’s highest volcanic peak surrounded by serene lakes and cherry blossoms.", rating: 4.8 },
  { name: "Pyramids of Giza", city: "Cairo, Egypt", type: "sightseeing", description: "The only surviving ancient Wonder of the World and the enigmatic Great Sphinx.", rating: 4.8 },
  { name: "Great Wall of China", city: "Beijing, China", type: "sightseeing", description: "Ancient architectural marvel winding across thousands of miles of rugged mountains.", rating: 4.7 },
  { name: "Banff National Park", city: "Alberta, Canada", type: "destination", description: "Turquoise glacial lakes, snow-capped Canadian Rockies, and scenic alpine trails.", rating: 4.9 },
  { name: "Grand Canyon", city: "Arizona, USA", type: "destination", description: "Immense geological canyon carved by the Colorado River with awe-inspiring vistas.", rating: 4.8 },
  { name: "Sydney Opera House & Harbour", city: "Sydney, Australia", type: "sightseeing", description: "Architectural masterpiece with sail-shaped shells set against Sydney Harbour.", rating: 4.7 },
  { name: "Sagrada Família", city: "Barcelona, Spain", type: "sightseeing", description: "Antoni Gaudí’s breathtaking modernist basilica with towering stained-glass spires.", rating: 4.8 },
  { name: "Taj Mahal", city: "Agra, India", type: "sightseeing", description: "Ivory-white marble mausoleum on the Yamuna river, an eternal jewel of Mughal art.", rating: 4.9 },
  { name: "Christ the Redeemer", city: "Rio de Janeiro, Brazil", type: "sightseeing", description: "Towering Art Deco statue overlooking the vibrant beaches and bays of Rio.", rating: 4.7 },
  { name: "Table Mountain & Waterfront", city: "Cape Town, South Africa", type: "destination", description: "Dramatic flat-topped mountain rising above the Atlantic coastline and harbour.", rating: 4.8 },
  { name: "Reykjavik & Golden Circle", city: "Reykjavik, Iceland", type: "destination", description: "Geothermal geysers, dramatic waterfalls, tectonic rifts, and Northern Lights.", rating: 4.9 },

  // World-Class Hotels
  { name: "Burj Al Arab Jumeirah", city: "Dubai, UAE", type: "hotel", description: "Ultra-luxurious sail-shaped hotel featuring opulent suites and private butler service.", rating: 4.9 },
  { name: "Marina Bay Sands", city: "Singapore", type: "hotel", description: "Iconic resort known for the world’s largest rooftop infinity pool over the skyline.", rating: 4.8 },
  { name: "The Plaza Hotel", city: "New York, USA", type: "hotel", description: "Timeless Fifth Avenue luxury hotel adjacent to Central Park with historic grandeur.", rating: 4.7 },
  { name: "Ritz Paris", city: "Paris, France", type: "hotel", description: "Legendary palace hotel on Place Vendôme famed for haute elegance and culinary heritage.", rating: 4.9 },
  { name: "Hotel du Cap-Eden-Roc", city: "Antibes, France", type: "hotel", description: "Iconic French Riviera clifftop retreat surrounded by pine groves and private coves.", rating: 4.9 },
  { name: "Aman Tokyo", city: "Tokyo, Japan", type: "hotel", description: "Serene luxury sanctuary blending traditional Japanese ryokan aesthetics with modern skyline views.", rating: 4.8 },
  { name: "Taj Lake Palace", city: "Udaipur, India", type: "hotel", description: "Floating 18th-century white-marble palace in Lake Pichola with royal suites and courtyards.", rating: 4.9 },
  { name: "Four Seasons Resort Bora Bora", city: "Bora Bora, French Polynesia", type: "hotel", description: "Stunning overwater bungalows overlooking turquoise lagoons and Mount Otemanu.", rating: 4.9 },
  { name: "Belmond Hotel Caruso", city: "Ravello, Italy", type: "hotel", description: "Former 11th-century palace set high above the Amalfi Coast with a cliffside infinity pool.", rating: 4.8 },
  { name: "The Savoy", city: "London, UK", type: "hotel", description: "Historic landmark hotel on the River Thames offering timeless British sophistication.", rating: 4.7 },

  // World-Renowned Restaurants
  { name: "Osteria Francescana", city: "Modena, Italy", type: "restaurant", description: "Three-Michelin-starred culinary art by Chef Massimo Bottura celebrating modern Italian flavors.", rating: 4.9 },
  { name: "Sukiyabashi Jiro", city: "Tokyo, Japan", type: "restaurant", description: "World-renowned Edo-style sushi counter celebrated globally for master craftsmanship.", rating: 4.8 },
  { name: "Le Bernardin", city: "New York, USA", type: "restaurant", description: "Elite seafood temple holding three Michelin stars, renowned for simple, exquisite perfection.", rating: 4.9 },
  { name: "Gaggan Anand", city: "Bangkok, Thailand", type: "restaurant", description: "Innovative, progressive Indian culinary experience known for sensory multi-course journeys.", rating: 4.8 },
  { name: "El Celler de Can Roca", city: "Girona, Spain", type: "restaurant", description: "Pioneering three-star destination by the Roca brothers combining modernist flair and Catalan roots.", rating: 4.9 },
  { name: "L'Arpège", city: "Paris, France", type: "restaurant", description: "Three-Michelin-star haven by Chef Alain Passard celebrating garden-to-table French gastronomy.", rating: 4.8 },
  { name: "Pujol", city: "Mexico City, Mexico", type: "restaurant", description: "Chef Enrique Olvera’s acclaimed kitchen transforming indigenous Mexican traditions into refined masterpieces.", rating: 4.7 },
  { name: "Dinner by Heston Blumenthal", city: "London, UK", type: "restaurant", description: "Modern culinary journey inspired by British gastronomic recipes dating to the 1300s.", rating: 4.7 },
  { name: "Bukhara", city: "New Delhi, India", type: "restaurant", description: "World-famous dining destination celebrating authentic tandoori and slow-cooked Dal Bukhara.", rating: 4.7 },
  { name: "The Test Kitchen", city: "Cape Town, South Africa", type: "restaurant", description: "Acclaimed fine dining spot showcasing bold global fusion and South African ingredients.", rating: 4.7 }
];

async function seed() {
  try {
    const { data: existing, error: fetchErr } = await supabase.from('places').select('name');
    if (fetchErr) {
      console.error("Error fetching existing:", fetchErr);
      return;
    }
    const existingNames = new Set((existing || []).map(p => p.name));
    const toInsert = globalPlaces.filter(p => !existingNames.has(p.name));
    console.log(`Found ${existing ? existing.length : 0} existing places. To insert: ${toInsert.length}`);
    
    if (toInsert.length > 0) {
      const { data, error } = await supabase.from('places').insert(toInsert).select();
      if (error) {
        console.error("Insert error:", error);
      } else {
        console.log(`Successfully inserted ${data.length} places! Total places now: ${existing.length + data.length}`);
      }
    } else {
      console.log("All places already exist in the database.");
    }
  } catch (err) {
    console.error("Seed script failed:", err);
  }
}

seed();
