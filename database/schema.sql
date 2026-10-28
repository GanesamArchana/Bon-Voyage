create extension if not exists pgcrypto;

create table if not exists places (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  type text not null check (type in ('destination','hotel','restaurant','sightseeing')),
  description text not null default '',
  rating numeric(2,1) not null default 0 check (rating between 0 and 5),
  created_at timestamptz not null default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  title text not null check (char_length(title) between 1 and 120),
  content text not null check (char_length(content) between 1 and 1000),
  rating integer not null check (rating between 1 and 5),
  created_at timestamptz not null default now()
);

create index if not exists idx_places_name on places(name);
create index if not exists idx_places_city on places(city);
create index if not exists idx_places_type on places(type);

insert into places(name, city, type, description, rating)
select * from (values
  -- Destinations & Sightseeing
  ('Eiffel Tower & The Louvre', 'Paris, France', 'sightseeing', 'World-famous iron spire and the historic art museum housing the Mona Lisa.', 4.8),
  ('The Colosseum', 'Rome, Italy', 'sightseeing', 'Iconic ancient amphitheatre in the heart of Rome dating back to 70 AD.', 4.8),
  ('Machu Picchu', 'Cusco, Peru', 'destination', 'Spectacular 15th-century Inca citadel set high in the Andes mountains.', 4.9),
  ('Santorini Caldera & Oia', 'Santorini, Greece', 'destination', 'Postcard-perfect whitewashed cliffside villages with legendary Aegean sunsets.', 4.9),
  ('Mount Fuji & Lake Kawaguchi', 'Honshu, Japan', 'destination', 'Japan’s highest volcanic peak surrounded by serene lakes and cherry blossoms.', 4.8),
  ('Pyramids of Giza', 'Cairo, Egypt', 'sightseeing', 'The only surviving ancient Wonder of the World and the enigmatic Great Sphinx.', 4.8),
  ('Great Wall of China', 'Beijing, China', 'sightseeing', 'Ancient architectural marvel winding across thousands of miles of rugged mountains.', 4.7),
  ('Banff National Park', 'Alberta, Canada', 'destination', 'Turquoise glacial lakes, snow-capped Canadian Rockies, and scenic alpine trails.', 4.9),
  ('Grand Canyon', 'Arizona, USA', 'destination', 'Immense geological canyon carved by the Colorado River with awe-inspiring vistas.', 4.8),
  ('Sydney Opera House & Harbour', 'Sydney, Australia', 'sightseeing', 'Architectural masterpiece with sail-shaped shells set against Sydney Harbour.', 4.7),
  ('Sagrada Família', 'Barcelona, Spain', 'sightseeing', 'Antoni Gaudí’s breathtaking modernist basilica with towering stained-glass spires.', 4.8),
  ('Taj Mahal', 'Agra, India', 'sightseeing', 'Ivory-white marble mausoleum on the Yamuna river, an eternal jewel of Mughal art.', 4.9),
  ('Christ the Redeemer', 'Rio de Janeiro, Brazil', 'sightseeing', 'Towering Art Deco statue overlooking the vibrant beaches and bays of Rio.', 4.7),
  ('Table Mountain & Waterfront', 'Cape Town, South Africa', 'destination', 'Dramatic flat-topped mountain rising above the Atlantic coastline and harbour.', 4.8),
  ('Reykjavik & Golden Circle', 'Reykjavik, Iceland', 'destination', 'Geothermal geysers, dramatic waterfalls, tectonic rifts, and Northern Lights.', 4.9),
  ('Charminar', 'Hyderabad, India', 'destination', 'Historic 16th-century mosque with four grand arches in the heart of Hyderabad.', 4.7),
  ('Goa Beaches', 'Goa, India', 'destination', 'Scenic Arabian Sea coastline with golden sandy shores, palms, and lively shacks.', 4.6),
  ('Hawa Mahal', 'Jaipur, India', 'sightseeing', 'Iconic pink sandstone Palace of Winds featuring 953 intricate honeycomb jharokhas.', 4.7),

  -- World Hotels
  ('Burj Al Arab Jumeirah', 'Dubai, UAE', 'hotel', 'Ultra-luxurious sail-shaped hotel featuring opulent suites and private butler service.', 4.9),
  ('Marina Bay Sands', 'Singapore', 'hotel', 'Iconic resort known for the world’s largest rooftop infinity pool over the skyline.', 4.8),
  ('The Plaza Hotel', 'New York, USA', 'hotel', 'Timeless Fifth Avenue luxury hotel adjacent to Central Park with historic grandeur.', 4.7),
  ('Ritz Paris', 'Paris, France', 'hotel', 'Legendary palace hotel on Place Vendôme famed for haute elegance and culinary heritage.', 4.9),
  ('Hotel du Cap-Eden-Roc', 'Antibes, France', 'hotel', 'Iconic French Riviera clifftop retreat surrounded by pine groves and private coves.', 4.9),
  ('Aman Tokyo', 'Tokyo, Japan', 'hotel', 'Serene luxury sanctuary blending traditional Japanese ryokan aesthetics with modern skyline views.', 4.8),
  ('Taj Lake Palace', 'Udaipur, India', 'hotel', 'Floating 18th-century white-marble palace in Lake Pichola with royal suites and courtyards.', 4.9),
  ('Four Seasons Resort Bora Bora', 'Bora Bora, French Polynesia', 'hotel', 'Stunning overwater bungalows overlooking turquoise lagoons and Mount Otemanu.', 4.9),
  ('Belmond Hotel Caruso', 'Ravello, Italy', 'hotel', 'Former 11th-century palace set high above the Amalfi Coast with a cliffside infinity pool.', 4.8),
  ('The Savoy', 'London, UK', 'hotel', 'Historic landmark hotel on the River Thames offering timeless British sophistication.', 4.7),
  ('Taj Falaknuma Palace', 'Hyderabad, India', 'hotel', 'Restored 19th-century royal palace of the Nizams perched 2,000 feet above the city.', 4.8),

  -- World Restaurants
  ('Osteria Francescana', 'Modena, Italy', 'restaurant', 'Three-Michelin-starred culinary art by Chef Massimo Bottura celebrating modern Italian flavors.', 4.9),
  ('Sukiyabashi Jiro', 'Tokyo, Japan', 'restaurant', 'World-renowned Edo-style sushi counter celebrated globally for master craftsmanship.', 4.8),
  ('Le Bernardin', 'New York, USA', 'restaurant', 'Elite seafood temple holding three Michelin stars, renowned for simple, exquisite perfection.', 4.9),
  ('Gaggan Anand', 'Bangkok, Thailand', 'restaurant', 'Innovative, progressive Indian culinary experience known for sensory multi-course journeys.', 4.8),
  ('El Celler de Can Roca', 'Girona, Spain', 'restaurant', 'Pioneering three-star destination by the Roca brothers combining modernist flair and Catalan roots.', 4.9),
  ('L''Arpège', 'Paris, France', 'restaurant', 'Three-Michelin-star haven by Chef Alain Passard celebrating garden-to-table French gastronomy.', 4.8),
  ('Pujol', 'Mexico City, Mexico', 'restaurant', 'Chef Enrique Olvera’s acclaimed kitchen transforming indigenous Mexican traditions into refined masterpieces.', 4.7),
  ('Dinner by Heston Blumenthal', 'London, UK', 'restaurant', 'Modern culinary journey inspired by British gastronomic recipes dating to the 1300s.', 4.7),
  ('Bukhara', 'New Delhi, India', 'restaurant', 'World-famous dining destination celebrating authentic tandoori and slow-cooked Dal Bukhara.', 4.7),
  ('The Test Kitchen', 'Cape Town, South Africa', 'restaurant', 'Acclaimed fine dining spot showcasing bold global fusion and South African ingredients.', 4.7),
  ('Paradise Restaurant', 'Hyderabad, India', 'restaurant', 'Legendary dining institution renowned since 1953 for authentic Hyderabadi Dum Biryani.', 4.3)
) as v(name, city, type, description, rating)
where not exists (select 1 from places);
