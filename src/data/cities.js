export const hotCities = [
    { 
        name: "Trieste", 
        coords: [45.6495, 13.7768], 
        country: "Italia",
        budget: 2,
        img: "/img/trieste.jpg",
        desc: "La perla dell'Adriatico nel 2026. Un mix unico di caffè storici e mare cristallino fuori dai circuiti di massa.",
        trend: "+349% ricerche",
        tags: { type: "relax", age: "adult", mood: "hidden" },
        bestMonths: ["giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 30, culture: 85, nature: 60, relax: 80, food: 90 },
        planner: {
            mustSee: ["Piazza Unità d'Italia", "Castello di Miramare", "Molo Audace"],
            hiddenGems: ["Osmize sul Carso", "Bagno Marino La Lanterna", "Caffè San Marco"],
            rainyDayOptions: ["Museo Revoltella", "Grotta Gigante", "Tour dei Caffè Storici"],
            itineraries: {
                3: [
                    { day: 1, title: "L'Anima Asburgica", morning: "Piazza Unità e Caffè degli Specchi", afternoon: "Castello di Miramare", evening: "Cena in ghetto ebraico" },
                    { day: 2, title: "Vento e Carso", morning: "Passeggiata Rilke a Duino", afternoon: "Degustazione in Osmiza", evening: "Tramonto al Molo Audace" },
                    { day: 3, title: "Vita di Mare", morning: "Tuffo ai 'Pedocin'", afternoon: "Shopping in via Cavana", evening: "Aperitivo in Cavana" }
                ]
            }
        }
    },
    { 
        name: "Barcellona", 
        coords: [41.3851, 2.1734], 
        country: "Spagna",
        budget: 2,
        img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=400",
        desc: "Icona globale del divertimento e dell'arte. Nel 2026 vive una nuova esplosione di festival tech e spiaggia.",
        trend: "Top destination 2026",
        tags: { type: "party", age: "young", mood: "trendsetter" },
        bestMonths: ["maggio", "giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 95, culture: 90, nature: 40, relax: 50, food: 95 },
        planner: {
            mustSee: ["Sagrada Familia", "Park Güell", "Barceloneta"],
            hiddenGems: ["Bunkers del Carmel", "Carrer di Blai (tapas)", "El Born tech galleries"],
            rainyDayOptions: ["Museo Picasso", "Mercato della Boqueria", "CosmoCaixa"],
            itineraries: {
                3: [
                    { day: 1, title: "Gaudì & Co", morning: "Sagrada Familia", afternoon: "Passeig de Gràcia", evening: "Cena a Gràcia" },
                    { day: 2, title: "Vibrazioni Urbane", morning: "Quartiere Gotico", afternoon: "El Born", evening: "Clubbing in Poblenou" },
                    { day: 3, title: "Mare & Vista", morning: "Spiaggia Bogatell", afternoon: "Bunkers del Carmel", evening: "Tapas tour a Poble Sec" }
                ]
            }
        }
    },
    { 
        name: "Ibiza", 
        coords: [38.9067, 1.4206], 
        country: "Spagna",
        budget: 3,
        img: "/img/ibiza.jpg",
        desc: "L'isola bianca non dorme mai, ma nel 2026 diventa anche il rifugio del lusso sostenibile.",
        trend: "Trend Estate 2026",
        tags: { type: "party", age: "adult", mood: "exclusive" },
        bestMonths: ["giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 100, culture: 40, nature: 70, relax: 60, food: 85 },
        planner: {
            mustSee: ["Dalt Vila", "Es Vedrà", "Playa d'en Bossa"],
            hiddenGems: ["Cala Llentia", "Mercatino di San Juan", "Moon Beach"],
            rainyDayOptions: ["Spa Boutique Hotel", "Shopping Santa Gertrudis", "MACE Museum"],
            itineraries: {
                3: [
                    { day: 1, title: "History & Glam", morning: "Dalt Vila", afternoon: "Ses Salines Beach", evening: "Marina Botafoch" },
                    { day: 2, title: "Magic Vibes", morning: "Yoga a Cala Comté", afternoon: "Sunset a Es Vedrà", evening: "Clubbing Night" },
                    { day: 3, title: "Wild North", morning: "Portinatx", afternoon: "Hippie Market", evening: "Cena a Santa Gertrudis" }
                ]
            }
        }
    },
    { 
        name: "Bali", 
        coords: [-8.4095, 115.1889], 
        country: "Indonesia",
        budget: 1,
        img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400",
        desc: "Rifugi spirituali e giungle lussureggianti. La meta definitiva per il reset mentale nel 2026.",
        trend: "+120% prenotazioni",
        tags: { type: "relax", age: "senior", mood: "exclusive" },
        bestMonths: ["aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre"],
        vibeData: { nightlife: 40, culture: 80, nature: 95, relax: 100, food: 85 },
        planner: {
            mustSee: ["Tegalalang Rice Terrace", "Uluwatu Temple", "Monkey Forest"],
            hiddenGems: ["Sidemen Valley", "Munduk Waterfall", "Nyang Nyang Beach"],
            rainyDayOptions: ["Cooking Class", "Traditional Massage", "Tea Ceremony Ubud"],
            itineraries: {
                3: [
                    { day: 1, title: "Green Heart", morning: "Ubud Rice Fields", afternoon: "Monkey Forest", evening: "Balinese Dance" },
                    { day: 2, title: "Spirit & Surf", morning: "Canggu Surf", afternoon: "Uluwatu Sunset", evening: "Jimbaran Dinner" },
                    { day: 3, title: "Purification", morning: "Tirta Empul Temple", afternoon: "Yoga Retreat", evening: "Organic Dinner" }
                ]
            }
        }
    },
    { 
        name: "Mykonos", 
        coords: [37.4467, 25.3289], 
        country: "Grecia",
        budget: 3,
        img: "/img/mykonos.jpg",
        desc: "Mulini a vento e tramonti elettrici. Il cuore del glamour mediterraneo per la prossima stagione.",
        trend: "In crescita costante",
        tags: { type: "party", age: "young", mood: "exclusive" },
        bestMonths: ["giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 95, culture: 50, nature: 50, relax: 70, food: 90 },
        planner: {
            mustSee: ["Little Venice", "Kato Mili Windmills", "Paradise Beach"],
            hiddenGems: ["Agios Sostis", "Ano Mera Village", "Fokos Beach"],
            rainyDayOptions: ["Wine Tasting", "Chora Shopping", "Maritime Museum"],
            itineraries: {
                3: [
                    { day: 1, title: "Iconic White", morning: "Chora Walking Tour", afternoon: "Little Venice Aperitivo", evening: "Dinner at Nammos" },
                    { day: 2, title: "Beach Life", morning: "Super Paradise Beach", afternoon: "Delos Island Tour", evening: "Cavo Paradiso Club" },
                    { day: 3, title: "Hidden Greece", morning: "Ano Mera Market", afternoon: "Agios Sostis Chill", evening: "Sunset at 180º Bar" }
                ]
            }
        }
    },
    { 
        name: "Reykjavik", 
        coords: [64.1265, -21.8174], 
        country: "Islanda",
        budget: 3,
        img: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?auto=format&fit=crop&w=400",
        desc: "Paesaggi lunari e avventura pura. Per chi cerca il fresco mentre il mondo brucia.",
        trend: "+210% adventure-seeking",
        tags: { type: "adventure", age: "adult", mood: "hidden" },
        bestMonths: ["novembre", "dicembre", "gennaio", "febbraio", "marzo"],
        vibeData: { nightlife: 60, culture: 75, nature: 100, relax: 40, food: 70 },
        planner: {
            mustSee: ["Hallgrímskirkja", "Blue Lagoon", "Golden Circle"],
            hiddenGems: ["Sky Lagoon", "Grótta Lighthouse", "Reykjadalur River"],
            rainyDayOptions: ["Perlan Museum", "FlyOver Iceland", "Public Pools"],
            itineraries: {
                3: [
                    { day: 1, title: "Urban Fire", morning: "Laugavegur Street", afternoon: "Hallgrímskirkja", evening: "Tasting Menu Reykjavik" },
                    { day: 2, title: "Nature Wonders", morning: "Golden Circle Tour", afternoon: "Gullfoss Waterfall", evening: "Northern Lights Hunt" },
                    { day: 3, title: "Thermal Chill", morning: "Blue Lagoon", afternoon: "Old Harbour", evening: "Craft Beer Tour" }
                ]
            }
        }
    },
    { 
        name: "Tulum", 
        coords: [20.2114, -87.4654], 
        country: "Messico",
        budget: 2,
        img: "https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&w=400",
        desc: "Eco-chic e rovine Maya. Il posto dove i trendsetter si riuniscono per meditare e ballare.",
        trend: "+85% Instagram trend",
        tags: { type: "relax", age: "young", mood: "trendsetter" },
        bestMonths: ["gennaio", "febbraio", "marzo", "aprile", "novembre", "dicembre"],
        vibeData: { nightlife: 70, culture: 80, nature: 85, relax: 90, food: 75 },
        planner: {
            mustSee: ["Tulum Ruins", "Gran Cenote", "Playa Paraiso"],
            hiddenGems: ["Sian Ka'an Biosphere", "Cenote Dos Ojos", "Holistika Ubud Vibes"],
            rainyDayOptions: ["Cacao Ceremony", "Temazcal Ritual", "Art Galleries"],
            itineraries: {
                3: [
                    { day: 1, title: "Maya History", morning: "Tulum Ruins", afternoon: "Playa Paraiso", evening: "Dinner at Hartwood" },
                    { day: 2, title: "Cenote Adventure", morning: "Gran Cenote", afternoon: "Sian Ka'an Safari", evening: "Beach Club Party" },
                    { day: 3, title: "Boho Spirit", morning: "Yoga Session", afternoon: "Shopping Zone", evening: "Azulik Sunset" }
                ]
            }
        }
    },
    { 
        name: "Tokyo", 
        coords: [35.6762, 139.6503], 
        country: "Giappone",
        budget: 2,
        img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400",
        desc: "Luci al neon e tradizione millenaria. L'avventura urbana più incredibile del 2026.",
        trend: "Evergreen tech-trip",
        tags: { type: "adventure", age: "young", mood: "trendsetter" },
        bestMonths: ["marzo", "aprile", "maggio", "ottobre", "novembre"],
        vibeData: { nightlife: 90, culture: 100, nature: 30, relax: 40, food: 100 },
        planner: {
            mustSee: ["Shibuya Crossing", "Senso-ji Temple", "teamLab Borderless"],
            hiddenGems: ["Shimokitazawa", "Golden Gai", "Yanaka Ginza"],
            rainyDayOptions: ["Ghibli Museum", "Sunshine City Aquarium", "Karaoke Kan"],
            itineraries: {
                3: [
                    { day: 1, title: "Neon Dreams", morning: "Harajuku Street", afternoon: "Shibuya Sky", evening: "Shinjuku Izakaya Tour" },
                    { day: 2, title: "Old Souls", morning: "Asakusa Temple", afternoon: "Ueno Park", evening: "Akihabara Tech Safari" },
                    { day: 3, title: "Modern Art", morning: "Toyosu Fish Market", afternoon: "teamLab Borderless", evening: "Roppongi Hills" }
                ]
            }
        }
    },
    { 
        name: "Lofoten", 
        coords: [68.1664, 13.7544], 
        country: "Norvegia",
        budget: 3,
        img: "/img/lofoten.jpg",
        desc: "Fiordi spettacolari e villaggi di pescatori. La meta segreta per chi ama la natura incontaminata.",
        trend: "Top 2026 Wild Trend",
        tags: { type: "adventure", age: "senior", mood: "hidden" },
        bestMonths: ["giugno", "luglio", "agosto"],
        vibeData: { nightlife: 10, culture: 50, nature: 100, relax: 85, food: 60 },
        planner: {
            mustSee: ["Reinebringen Hike", "Å Village", "Henningsvær"],
            hiddenGems: ["Kvalvika Beach", "Nusfjord", "Uttakleiv Beach"],
            rainyDayOptions: ["Lofotr Viking Museum", "Art Galleries Svolvær", "Sea Cabin Sauna"],
            itineraries: {
                3: [
                    { day: 1, title: "Fisherman's Life", morning: "Svolvær Harbour", afternoon: "Henningsvær Football Pitch", evening: "Rorbuer Dinner" },
                    { day: 2, title: "The Reine View", morning: "Reine Village", afternoon: "Kvalvika Hike", evening: "Midnight Sun Watch" },
                    { day: 3, title: "Viking History", morning: "Lofotr Museum", afternoon: "Nusfjord Heritage", evening: "Arctic Spa" }
                ]
            }
        }
    },
    { 
        name: "Hvar", 
        coords: [43.1721, 16.4419], 
        country: "Croazia",
        budget: 2,
        img: "/img/hvar.jpg",
        desc: "L'isola della lavanda e delle yacht parties. Un mix perfetto tra storia e divertimento sfrenato.",
        trend: "+55% Yachting searches",
        tags: { type: "party", age: "adult", mood: "trendsetter" },
        bestMonths: ["giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 85, culture: 70, nature: 75, relax: 60, food: 80 },
        planner: {
            mustSee: ["Hvar Fortress", "Pakleni Islands", "St. Stephen's Square"],
            hiddenGems: ["Dubovica Beach", "Lavender Fields Brusje", "Vrboska (Little Venice)"],
            rainyDayOptions: ["Wine Tasting Stari Grad", "Arsenal Theatre", "Cooking Class"],
            itineraries: {
                3: [
                    { day: 1, title: "Glamour Port", morning: "Hvar Town Walk", afternoon: "Spanish Fortress", evening: "Carpe Diem Aperitivo" },
                    { day: 2, title: "Island Hopping", morning: "Pakleni Islands Boat", afternoon: "Beach Club Lunch", evening: "Yacht Party vibe" },
                    { day: 3, title: "Vintage Island", morning: "Stari Grad Plain", afternoon: "Lavender Fields", evening: "Konoba Dinner" }
                ]
            }
        }
    },
    { 
        name: "Zanzibar", 
        coords: [-6.1378, 39.3621], 
        country: "Tanzania",
        budget: 1,
        img: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=400",
        desc: "Sabbia bianca come farina e mare turchese. Il paradiso del relax esotico nel 2026.",
        trend: "Rising Sun Trend",
        tags: { type: "relax", age: "adult", mood: "exclusive" },
        bestMonths: ["gennaio", "febbraio", "giugno", "luglio", "agosto", "settembre", "ottobre"],
        vibeData: { nightlife: 30, culture: 65, nature: 90, relax: 100, food: 80 },
        planner: {
            mustSee: ["Stone Town", "Nungwi Beach", "Prison Island"],
            hiddenGems: ["Jozani Forest", "The Rock Restaurant", "Paje Seaweed Farm"],
            rainyDayOptions: ["Spice Tour", "Stone Town Market", "Zanzibar Coffee House"],
            itineraries: {
                3: [
                    { day: 1, title: "Stone Town Soul", morning: "Forodhani Gardens", afternoon: "Stone Town Tour", evening: "Sunset Dhow Cruise" },
                    { day: 2, title: "Turquoise Bliss", morning: "Nungwi Turtle Sanctuary", afternoon: "Beach Chillout", evening: "Seafood BBQ" },
                    { day: 3, title: "Spice & Nature", morning: "Spice Farm Tour", afternoon: "The Rock Lunch", evening: "Paje Nightlife" }
                ]
            }
        }
    },
    { 
        name: "Queenstown", 
        coords: [-45.0312, 168.6626], 
        country: "Nuova Zelanda",
        budget: 2,
        img: "/img/queenstown.jpg",
        desc: "Bungee jumping, sci e laghi alpini. La capitale mondiale dell'adrenalina per il 2026.",
        trend: "Pure Adrenaline 2026",
        tags: { type: "adventure", age: "young", mood: "exclusive" },
        bestMonths: ["dicembre", "gennaio", "febbraio", "giugno", "luglio", "agosto"],
        vibeData: { nightlife: 70, culture: 40, nature: 100, relax: 30, food: 70 },
        planner: {
            mustSee: ["Milford Sound", "Skyline Luge", "Fergburger"],
            hiddenGems: ["Glenorchy", "Arrowtown", "Moke Lake"],
            rainyDayOptions: ["Onsen Hot Pools", "Wine Tour Central Otago", "Cinema Paradiso"],
            itineraries: {
                3: [
                    { day: 1, title: "Adrenaline Start", morning: "Bungee Jump", afternoon: "Skyline Gondola", evening: "Fergburger Dinner" },
                    { day: 2, title: "The Fjord", morning: "Milford Sound Flight", afternoon: "Jet Boat Kawarau", evening: "Craft Beer Tour" },
                    { day: 3, title: "Middle Earth", morning: "Glenorchy Tour", afternoon: "Arrowtown Gold Mining", evening: "Onsen Relaxation" }
                ]
            }
        }
    },
    { 
        name: "Amalfi", 
        coords: [40.6333, 14.6027], 
        country: "Italia",
        budget: 3,
        img: "https://images.unsplash.com/photo-1533903345306-15d1c30952de?auto=format&fit=crop&w=400",
        desc: "Limoni, scogliere e la 'Dolce Vita'. Il lusso classico che non passa mai di moda.",
        trend: "+40% Luxury bookings",
        tags: { type: "relax", age: "senior", mood: "exclusive" },
        bestMonths: ["maggio", "giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 40, culture: 85, nature: 80, relax: 90, food: 100 },
        planner: {
            mustSee: ["Duomo di Amalfi", "Positano", "Ravello Gardens"],
            hiddenGems: ["Fiordo di Furore", "Sentiero degli Dei", "Atrani Village"],
            rainyDayOptions: ["Paper Museum", "Cooking Class Lemon Tour", "Wine Tasting Tramonti"],
            itineraries: {
                3: [
                    { day: 1, title: "Coast Icons", morning: "Amalfi Cathedral", afternoon: "Positano Shopping", evening: "Dinner in Praiano" },
                    { day: 2, title: "Garden Views", morning: "Villa Cimbrone Ravello", afternoon: "Atrani Walk", evening: "Limoncello Tasting" },
                    { day: 3, title: "Hiking Bliss", morning: "Sentiero degli Dei", afternoon: "Fiordo di Furore", evening: "Seafood Gourmet" }
                ]
            }
        }
    },
    { 
        name: "Berlin", 
        coords: [52.5200, 13.4050], 
        country: "Germania",
        budget: 1,
        img: "/img/berlin.jpg",
        desc: "Techno industriale e cultura underground. Per chi vuole vivere la notte più lunga d'Europa.",
        trend: "Nightlife Authority",
        tags: { type: "party", age: "young", mood: "hidden" },
        bestMonths: ["maggio", "giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 100, culture: 90, nature: 30, relax: 30, food: 80 },
        planner: {
            mustSee: ["Brandenburg Gate", "East Side Gallery", "Reichstag"],
            hiddenGems: ["Teufelsberg", "Tempelhofer Feld", "Raw-Gelände"],
            rainyDayOptions: ["Museum Island", "Berghain (if you can get in)", "Dark Matter Exhibit"],
            itineraries: {
                3: [
                    { day: 1, title: "History & Wall", morning: "Checkpoint Charlie", afternoon: "East Side Gallery", evening: "Kreuzberg Bar Crawl" },
                    { day: 2, title: "Urban Art", morning: "Mitte Galleries", afternoon: "Tempelhof Park", evening: "Techno Clubbing Night" },
                    { day: 3, title: "Indie Spirit", morning: "Flohmarkt Mauerpark", afternoon: "Teufelsberg Spy Station", evening: "Neukölln Dinner" }
                ]
            }
        }
    },
    { 
        name: "Kyoto", 
        coords: [35.0116, 135.7681], 
        country: "Giappone",
        budget: 2,
        img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400",
        desc: "Templi dorati e foreste di bambù. Una camminata nel tempo per ritemprare l'anima.",
        trend: "Zen Travel +30%",
        tags: { type: "relax", age: "senior", mood: "hidden" },
        bestMonths: ["marzo", "aprile", "maggio", "ottobre", "novembre"],
        vibeData: { nightlife: 20, culture: 100, nature: 80, relax: 90, food: 95 },
        planner: {
            mustSee: ["Kinkaku-ji", "Fushimi Inari", "Arashiyama Bamboo Grove"],
            hiddenGems: ["Otagi Nenbutsu-ji", "Philosopher's Path", "Gion District at Night"],
            rainyDayOptions: ["Tea Ceremony", "Nishiki Market", "Kyoto International Manga Museum"],
            itineraries: {
                3: [
                    { day: 1, title: "Golden Zen", morning: "Kinkaku-ji", afternoon: "Arashiyama Bamboo", evening: "Kaiseki Dinner" },
                    { day: 2, title: "Thousands Gates", morning: "Fushimi Inari Shrine", afternoon: "Kiyomizu-dera", evening: "Gion Geisha Walk" },
                    { day: 3, title: "Slow Path", morning: "Philosopher's Path", afternoon: "Tea Workshop", evening: "Pontocho Alley" }
                ]
            }
        }
    },
    { 
        name: "Cape Town", 
        coords: [-33.9249, 18.4241], 
        country: "Sudafrica",
        budget: 1,
        img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=400",
        desc: "Dove l'oceano incontra la montagna. Un'avventura selvaggia con il comfort di una metropoli.",
        trend: "Safari-City Trend",
        tags: { type: "adventure", age: "adult", mood: "exclusive" },
        bestMonths: ["novembre", "dicembre", "gennaio", "febbraio", "marzo"],
        vibeData: { nightlife: 75, culture: 80, nature: 95, relax: 60, food: 90 },
        planner: {
            mustSee: ["Table Mountain", "Cape of Good Hope", "Robben Island"],
            hiddenGems: ["Bo-Kaap", "Kirstenbosch Gardens", "Boulders Beach Penguins"],
            rainyDayOptions: ["Zeitz MOCAA", "Wine Tasting Constantia", "Two Oceans Aquarium"],
            itineraries: {
                3: [
                    { day: 1, title: "The Mountain", morning: "Table Mountain Cableway", afternoon: "V&A Waterfront", evening: "Dinner in Bree Street" },
                    { day: 2, title: "Peninsula Tour", morning: "Boulders Beach", afternoon: "Cape Point", evening: "Camps Bay Sunset" },
                    { day: 3, title: "Vines & Art", morning: "Constantia Wine Valley", afternoon: "Zeitz MOCAA Art", evening: "Kirstenbosch Concert" }
                ]
            }
        }
    },
    { 
        name: "Saint-Tropez", 
        coords: [43.2677, 6.6407], 
        country: "Francia",
        budget: 3,
        img: "/img/saint-tropez.jpg",
        desc: "Il porto più glamour del mondo. Champagne, yacht e lo spirito intramontabile della Costa Azzurra.",
        trend: "Elite Summer Target",
        tags: { type: "party", age: "senior", mood: "exclusive" },
        bestMonths: ["giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 85, culture: 50, nature: 50, relax: 75, food: 95 },
        planner: {
            mustSee: ["Port of Saint-Tropez", "Pampelonne Beach", "Citadelle"],
            hiddenGems: ["Place des Lices", "Escalet Beach", "Ramatuelle Village"],
            rainyDayOptions: ["Musée de l'Annonciade", "Boutique Shopping", "Wine Tasting Provencal"],
            itineraries: {
                3: [
                    { day: 1, title: "Yacht Life", morning: "Port Walk", afternoon: "Beach Club Nikki Beach", evening: "Dinner at L'Opéra" },
                    { day: 2, title: "Village Charm", morning: "Place des Lices Market", afternoon: "Citadelle Tour", evening: "Clubbing Cave du Roy" },
                    { day: 3, title: "Coastal Wild", morning: "Sentier du Littoral", afternoon: "Ramatuelle Lunch", evening: "Sunset Cocktails" }
                ]
            }
        }
    },
    { 
        name: "Lampedusa", 
        coords: [35.5069, 12.6042], 
        country: "Italia",
        budget: 1,
        img: "https://images.unsplash.com/photo-1590490359854-dfba19688d70?auto=format&fit=crop&w=400",
        desc: "L'Isola dei Conigli è il mare più bello del mondo. Un paradiso nascosto a metà tra Africa ed Europa.",
        trend: "The Hidden Crystal",
        tags: { type: "relax", age: "young", mood: "hidden" },
        bestMonths: ["giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 40, culture: 30, nature: 100, relax: 95, food: 85 },
        planner: {
            mustSee: ["Spiaggia dei Conigli", "Cala Pulcino", "Porto Vecchio"],
            hiddenGems: ["Cala Creta", "Dammuso Casa Teresa", "Tabaccara by Boat"],
            rainyDayOptions: ["Turtle Rescue Center", "Museo Archeologico", "Giro Gastronomico"],
            itineraries: {
                3: [
                    { day: 1, title: "Crystal Sea", morning: "Spiaggia dei Conigli", afternoon: "Trekking to Cala Pulcino", evening: "Dinner at the Port" },
                    { day: 2, title: "Boat Magic", morning: "Island Boat Tour", afternoon: "Tabaccara Swim", evening: "Aperitivo at O'Scià" },
                    { day: 3, title: "Rocky Coast", morning: "Cala Creta Sunrise", afternoon: "Turtle Center Visit", evening: "Star Gazing" }
                ]
            }
        }
    },
    { 
        name: "Lisbona", 
        coords: [38.7223, -9.1393], 
        country: "Portogallo",
        budget: 1,
        img: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=400",
        desc: "Piastrelle colorate, surf e movida tra i vicoli. La capitale più cool per i nomadi digitali nel 2026.",
        trend: "Digital Nomad Hub",
        tags: { type: "party", age: "adult", mood: "trendsetter" },
        bestMonths: ["aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre"],
        vibeData: { nightlife: 85, culture: 90, nature: 50, relax: 60, food: 95 },
        planner: {
            mustSee: ["Belem Tower", "Alfama District", "Praça do Comércio"],
            hiddenGems: ["LX Factory", "Miradouro da Senhora do Monte", "Pink Street"],
            rainyDayOptions: ["Oceanário de Lisboa", "Time Out Market", "Fado House Dinner"],
            itineraries: {
                3: [
                    { day: 1, title: "History & Views", morning: "Alfama Walk", afternoon: "São Jorge Castle", evening: "Fado Night" },
                    { day: 2, title: "Pastel Life", morning: "Belém Tower & Pastéis", afternoon: "LX Factory Shopping", evening: "Bairro Alto Bar Hopping" },
                    { day: 3, title: "Ocean Breeze", morning: "Cascais Trip", afternoon: "Oceanário", evening: "Sunset at Cais do Sodré" }
                ]
            }
        }
    },
    { 
        name: "Patagonia", 
        coords: [-50.3344, -72.3332], 
        country: "Argentina",
        budget: 2,
        img: "/img/patagonia.jpg",
        desc: "Ghiacciai immensi e cime proibite. L'ultima frontiera dell'esplorazione umana.",
        trend: "+150% Exploration searches",
        tags: { type: "adventure", age: "senior", mood: "trendsetter" },
        bestMonths: ["dicembre", "gennaio", "febbraio", "marzo"],
        vibeData: { nightlife: 10, culture: 40, nature: 100, relax: 50, food: 60 },
        planner: {
            mustSee: ["Perito Moreno Glacier", "Mount Fitz Roy", "Torres del Paine"],
            hiddenGems: ["Laguna de los Tres", "El Chaltén Hidden Valleys", "Cueva de las Manos"],
            rainyDayOptions: ["Glaciarium Museum", "Estancia Dinner", "Hot Chocolate in El Calafate"],
            itineraries: {
                3: [
                    { day: 1, title: "The Blue Ice", morning: "Perito Moreno Trekking", afternoon: "Glacier Boat Tour", evening: "Patagonian Lamb Dinner" },
                    { day: 2, title: "The Peak", morning: "Fitz Roy Hike start", afternoon: "Laguna Capri", evening: "Craft Beer El Chaltén" },
                    { day: 3, title: "Wild Steppe", morning: "Estancia Experience", afternoon: "Bird Watching", evening: "Relax by the Fire" }
                ]
            }
        }
    }
];