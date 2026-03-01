export const hotCities = [
    { 
        name: "Trieste", 
        coords: [45.6495, 13.7768], 
        country: "Italia",
        budget: 2,
        img: "/img/trieste.jpg",
        desc: "La perla dell'Adriatico nel 2026. Un mix unico di caffè storici e mare cristallino.",
        trend: "+349% ricerche",
        tags: { type: "relax", age: "adult", mood: "hidden" },
        bestMonths: ["giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 30, culture: 85, nature: 60, relax: 80, food: 90 },
        fullDescription: {
            longText: "Trieste è una città che non si concede al primo sguardo, ma che rapisce chiunque abbia la pazienza di ascoltare il suo vento e osservare la sua luce. Nel 2026, si è imposta come la capitale del 'slow tourism' intellettuale. Situata in un lembo di terra tra l'altopiano carsico e l'Adriatico, Trieste porta orgogliosamente i segni del suo passato asburgico, visibili nei palazzi neoclassici e nell'ordine geometrico delle sue piazze. È la città della letteratura, dove Joyce e Svevo hanno trovato ispirazione tra i tavolini dei caffè storici che ancora oggi profumano di miscele pregiate e giornali appena stampati. Ma è anche una città di mare e di sport, con la Barcolana che trasforma il golfo in una distesa di vele bianche. Il 2026 vede Trieste come un ponte tra l'Europa centrale e il Mediterraneo, un luogo dove la scienza (grazie ai suoi numerosi centri di ricerca) incontra la filosofia del vivere bene, tra un calice di vino del Carso e un tramonto che infuoca il Molo Audace.",
            keyFeatures: ["Cultura del Caffè Mitteleuropea", "Hub Scientifico Internazionale", "Architettura Imperiale", "Enogastronomia Carsica"],
            landmarks: [
                { name: "Piazza Unità d'Italia", img: "https://images.unsplash.com/photo-1565057430174-c0477ddad663?auto=format&fit=crop&w=600", desc: "La più grande piazza aperta sul mare in Europa, circondata da edifici monumentali che si illuminano d'oro al tramonto." },
                { name: "Castello di Miramare", img: "https://images.unsplash.com/photo-1590055531801-44331a33753c?auto=format&fit=crop&w=600", desc: "L'idilliaca residenza di Massimiliano d'Asburgo, un castello bianco sospeso tra l'azzurro del mare e il verde di un parco botanico esotico." },
                { name: "Molo Audace", img: "https://images.unsplash.com/photo-1627918342205-18e47012354c?auto=format&fit=crop&w=600", desc: "Una passerella di pietra che si allunga per 200 metri nel mare, il luogo preferito dai triestini per salutare il sole o sfidare la Bora." }
            ]
        },
        planner: {
            mustSee: ["Piazza Unità d'Italia", "Castello di Miramare", "Molo Audace"],
            hiddenGems: ["Osmize sul Carso", "Bagno Marino La Lanterna", "Caffè San Marco"],
            rainyDayOptions: ["Museo Revoltella", "Grotta Gigante", "Tour dei Caffè Storici"],
            itineraries: { 3: [{ day: 1, title: "L'Anima Asburgica", morning: "Piazza Unità e Caffè degli Specchi", afternoon: "Castello di Miramare", evening: "Cena in ghetto ebraico" }, { day: 2, title: "Vento e Carso", morning: "Passeggiata Rilke a Duino", afternoon: "Degustazione in Osmiza", evening: "Tramonto al Molo Audace" }, { day: 3, title: "Vita di Mare", morning: "Tuffo ai 'Pedocin'", afternoon: "Shopping in via Cavana", evening: "Aperitivo in Cavana" }] }
        }
    },
    { 
        name: "Barcellona", 
        coords: [41.3851, 2.1734], 
        country: "Spagna",
        budget: 2,
        img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=400",
        desc: "Icona globale del divertimento e dell'arte. Nel 2026 vive una nuova esplosione tech.",
        trend: "Top destination 2026",
        tags: { type: "party", age: "young", mood: "trendsetter" },
        bestMonths: ["maggio", "giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 95, culture: 90, nature: 40, relax: 50, food: 95 },
        fullDescription: {
            longText: "Barcellona nel 2026 è un organismo vivente che pulsa di creatività, tecnologia e orgoglio catalano. Oltre alle celebri icone del modernismo, la città ha saputo reinventarsi come un 'bosco verticale' urbano, dove la sostenibilità ha trasformato il volto dei quartieri. Passeggiare per l'Eixample oggi significa scoprire giardini pensili e mobilità elettrica che silenziosamente attraversa le geometrie di Cerdà. La Sagrada Familia, ormai prossima al completamento, continua a essere il cuore spirituale di una città che però guarda al futuro con i suoi festival di musica elettronica d'avanguardia (Sónar) e le sue start-up tech nel distretto 22@. La cucina è un viaggio senza fine: dai 'chiringuitos' sulla spiaggia che servono pesce freschissimo, ai ristoranti stellati dove la scienza incontra il sapore. Barcellona è l'equilibrio perfetto tra la vita diurna fatta di mostre d'arte, spiagge dorate e mercati storici, e una notte che sembra non voler finire mai nei club del Poblenou.",
            keyFeatures: ["Patrimonio Gaudì", "Rivoluzione Urbanistica Green", "Cultura Gastronomica d'Avanguardia", "Spiagge Cosmopolite"],
            landmarks: [
                { name: "Sagrada Familia", img: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=600", desc: "La basilica dove la pietra diventa foresta; un'opera infinita che sfida il cielo con le sue torri geometriche." },
                { name: "Park Güell", img: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=600", desc: "Un sogno di mosaici e forme organiche da cui ammirare tutta la città che scivola verso il Mediterraneo." },
                { name: "Cattedrale del Mare", img: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=600", desc: "Nel cuore del Born, un capolavoro del gotico catalano che emana una forza e una semplicità magica." }
            ]
        },
        planner: {
            mustSee: ["Sagrada Familia", "Park Güell", "Barceloneta"],
            hiddenGems: ["Bunkers del Carmel", "Carrer di Blai (tapas)", "El Born tech galleries"],
            rainyDayOptions: ["Museo Picasso", "Mercato della Boqueria", "CosmoCaixa"],
            itineraries: { 3: [{ day: 1, title: "Gaudì & Co", morning: "Sagrada Familia", afternoon: "Passeig de Gràcia", evening: "Cena a Gràcia" }, { day: 2, title: "Vibrazioni Urbane", morning: "Quartiere Gotico", afternoon: "El Born", evening: "Clubbing in Poblenou" }, { day: 3, title: "Mare & Vista", morning: "Spiaggia Bogatell", afternoon: "Bunkers del Carmel", evening: "Tapas tour a Poble Sec" }] }
        }
    },
    { 
        name: "Ibiza", 
        coords: [38.9067, 1.4206], 
        country: "Spagna",
        budget: 3,
        img: "/img/ibiza.jpg",
        desc: "L'isola bianca non dorme mai, rifugio del lusso sostenibile nel 2026.",
        trend: "Trend Estate 2026",
        tags: { type: "party", age: "adult", mood: "exclusive" },
        bestMonths: ["giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 100, culture: 40, nature: 70, relax: 60, food: 85 },
        fullDescription: {
            longText: "Ibiza nel 2026 ha completato la sua metamorfosi: da tempio dello sballo a paradiso dell'ecolusso e della consapevolezza. L'Isola Bianca vibra di un'energia magnetica che attrae sia i clubber più incalliti che i cercatori di spiritualità. Se la zona di Playa d'en Bossa rimane il fulcro mondiale dei DJ set più esclusivi, l'entroterra si è riscoperto come un'oasi di 'fincas' ristrutturate dove si pratica agricoltura biodinamica e yoga al sorgere del sole. Le coste, protette con rigore, offrono acque turchesi dove la prateria di Posidonia è tornata a fiorire. Dalt Vila, la città vecchia, è un labirinto di storia che domina il porto, dove yacht futuristici attraccano accanto a vecchi pescherecci. Qui il tempo si dilata: si può passare un pomeriggio nel silenzio di una caletta segreta a nord per poi immergersi nel rito collettivo del tramonto a Es Vedrà, dove la musica e la natura si fondono in un'esperienza trascendentale.",
            keyFeatures: ["Clubbing di Lusso", "Ecoturismo e Yoga", "Spiagge Selvagge", "Storia Patrimonio UNESCO"],
            landmarks: [
                { name: "Dalt Vila", img: "https://images.unsplash.com/photo-1634120813959-1982b6883e4c?auto=format&fit=crop&w=600", desc: "La fortezza medievale dichiarata Patrimonio UNESCO, con i suoi bastioni che offrono viste spettacolari sul porto." },
                { name: "Es Vedrà", img: "https://images.unsplash.com/photo-1541604512403-f3689c17621c?auto=format&fit=crop&w=600", desc: "Un isolotto di roccia calcarea avvolto dal mistero e dalla leggenda, considerato uno dei luoghi più energetici del pianeta." },
                { name: "Mercatino di Las Dalias", img: "https://images.unsplash.com/photo-1528154110250-93433890289a?auto=format&fit=crop&w=600", desc: "Il cuore pulsante della cultura hippie dell'isola, un tripudio di colori, tessuti e artigianato locale." }
            ]
        },
        planner: {
            mustSee: ["Dalt Vila", "Es Vedrà", "Playa d'en Bossa"],
            hiddenGems: ["Cala Llentia", "Mercatino di San Juan", "Moon Beach"],
            rainyDayOptions: ["Spa Boutique Hotel", "Shopping Santa Gertrudis", "MACE Museum"],
            itineraries: { 3: [{ day: 1, title: "History & Glam", morning: "Dalt Vila", afternoon: "Ses Salines Beach", evening: "Marina Botafoch" }, { day: 2, title: "Magic Vibes", morning: "Yoga a Cala Comté", afternoon: "Sunset a Es Vedrà", evening: "Clubbing Night" }, { day: 3, title: "Wild North", morning: "Portinatx", afternoon: "Hippie Market", evening: "Cena a Santa Gertrudis" }] }
        }
    },
    { 
        name: "Bali", 
        coords: [-8.4095, 115.1889], 
        country: "Indonesia",
        budget: 1,
        img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400",
        desc: "Rifugi spirituali e giungle lussureggianti. Il reset mentale definitivo.",
        trend: "+120% prenotazioni",
        tags: { type: "relax", age: "senior", mood: "exclusive" },
        bestMonths: ["aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre"],
        vibeData: { nightlife: 40, culture: 80, nature: 95, relax: 100, food: 85 },
        fullDescription: {
            longText: "Bali è molto più di una destinazione; è uno stato mentale che nel 2026 ha saputo elevare il concetto di 'benessere olistico'. Conosciuta come l'Isola degli Dei, offre un contrasto magnifico tra il verde elettrico delle risaie a terrazza e l'oro delle spiagge vulcaniche. Ubud rimane l'epicentro culturale, un luogo dove il profumo dell'incenso e i petali delle offerte quotidiane (Canang sari) accolgono i viaggiatori in ogni angolo. Nel 2026, l'isola ha implementato politiche radicali per la protezione dell'ambiente, rendendo i suoi resort immersi nella giungla degli esempi mondiali di architettura in bambù e bio-edilizia. Dalla potenza delle onde di Uluwatu, paradiso dei surfisti, alla sacralità dei templi millenari come Tirta Empul, Bali promette una riconnessione profonda con i ritmi della terra. La cucina locale, arricchita da una nuova generazione di chef 'farm-to-table', trasforma ogni pasto in un rito di salute e sapore.",
            keyFeatures: ["Ritiri Spirituali", "Architettura in Bambù", "Cultura Induista Balinese", "Surf di Classe Mondiale"],
            landmarks: [
                { name: "Pura Tanah Lot", img: "/img/pura-tanah-lot.jpg", desc: "Un tempio antico situato su uno scoglio che emerge dalle onde, icona della devozione balinese al mare." },
                { name: "Tegalalang", img: "https://images.unsplash.com/photo-1536152470836-b943b246224c?auto=format&fit=crop&w=600", desc: "Risaie a terrazza scolpite nella giungla, un capolavoro di ingegneria agricola ancestrale e bellezza visiva." },
                { name: "Foresta delle Scimmie", img: "/img/foresta-delle-scimmie.jpg", desc: "Un santuario sacro dove centinaia di macachi custodiscono templi avvolti dalle radici di alberi giganti." }
            ]
        },
        planner: {
            mustSee: ["Tegalalang Rice Terrace", "Uluwatu Temple", "Monkey Forest"],
            hiddenGems: ["Sidemen Valley", "Munduk Waterfall", "Nyang Nyang Beach"],
            rainyDayOptions: ["Cooking Class", "Traditional Massage", "Tea Ceremony Ubud"],
            itineraries: { 3: [{ day: 1, title: "Green Heart", morning: "Ubud Rice Fields", afternoon: "Monkey Forest", evening: "Balinese Dance" }, { day: 2, title: "Spirit & Surf", morning: "Canggu Surf", afternoon: "Uluwatu Sunset", evening: "Jimbaran Dinner" }, { day: 3, title: "Purification", morning: "Tirta Empul Temple", afternoon: "Yoga Retreat", evening: "Organic Dinner" }] }
        }
    },
    { 
        name: "Mykonos", 
        coords: [37.4467, 25.3289], 
        country: "Grecia",
        budget: 3,
        img: "/img/mykonos.jpg",
        desc: "Mulini a vento e tramonti elettrici. Il cuore del glamour mediterraneo.",
        trend: "In crescita costante",
        tags: { type: "party", age: "young", mood: "exclusive" },
        bestMonths: ["giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 95, culture: 50, nature: 50, relax: 70, food: 90 },
        fullDescription: {
            longText: "Mykonos nel 2026 è la quintessenza dell'estetica cicladica fusa con il lusso ultra-contemporaneo. L'isola, famosa per i suoi labirinti di case bianche dalle finestre blu, è diventata una passerella a cielo aperto dove l'arte moderna incontra il mito greco. Chora, il centro principale, è un gioiello di architettura spontanea dove perdersi tra boutique di alta moda e taverne gourmet. Nel 2026, Mykonos ha puntato sull'esclusività assoluta, con beach club che sono vere e proprie gallerie di design sulla sabbia di Paradise e Super Paradise. Ma l'isola offre anche un lato più silenzioso: le colline brulle punteggiate di cappelle votive e le spiagge del nord come Agios Sostis, dove il vento Meltemi soffia su acque limpide e selvagge. La vita notturna rimane leggendaria, trasformando l'isola in un palcoscenico vibrante che non dorme mai sotto la luce di una luna enorme che si specchia nell'Egeo.",
            keyFeatures: ["Glamour e Nightlife", "Architettura Cicladica", "Beach Club di Design", "Aperitivi al Tramonto"],
            landmarks: [
                { name: "Mulini di Mykonos", img: "https://images.unsplash.com/photo-1544473489-0746973c7344?auto=format&fit=crop&w=600", desc: "I celebri mulini a vento bianchi che dominano il porto, simbolo dell'energia dell'isola." },
                { name: "Little Venice", img: "https://images.unsplash.com/photo-1601582235527-7c1bc33919be?auto=format&fit=crop&w=600", desc: "Un quartiere di case storiche costruite proprio sul bordo dell'acqua, dove le onde bagnano i tavolini dei bar." },
                { name: "Isola di Delos", img: "https://images.unsplash.com/photo-1621217688241-76856515825d?auto=format&fit=crop&w=600", desc: "A pochi minuti di barca, il sito archeologico più sacro della Grecia antica, luogo di nascita di Apollo." }
            ]
        },
        planner: {
            mustSee: ["Little Venice", "Kato Mili Windmills", "Paradise Beach"],
            hiddenGems: ["Agios Sostis", "Ano Mera Village", "Fokos Beach"],
            rainyDayOptions: ["Wine Tasting", "Chora Shopping", "Maritime Museum"],
            itineraries: { 3: [{ day: 1, title: "Iconic White", morning: "Chora Walking Tour", afternoon: "Little Venice Aperitivo", evening: "Dinner at Nammos" }, { day: 2, title: "Beach Life", morning: "Super Paradise Beach", afternoon: "Delos Island Tour", evening: "Cavo Paradiso Club" }, { day: 3, title: "Hidden Greece", morning: "Ano Mera Market", afternoon: "Agios Sostis Chill", evening: "Sunset at 180º Bar" }] }
        }
    },
    { 
        name: "Reykjavik", 
        coords: [64.1265, -21.8174], 
        country: "Islanda",
        budget: 3,
        img: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?auto=format&fit=crop&w=400",
        desc: "Paesaggi lunari e avventura pura. Il rifugio dal caldo globale del 2026.",
        trend: "+210% adventure-seeking",
        tags: { type: "adventure", age: "adult", mood: "hidden" },
        bestMonths: ["novembre", "dicembre", "gennaio", "febbraio", "marzo"],
        vibeData: { nightlife: 60, culture: 75, nature: 100, relax: 40, food: 70 },
        fullDescription: {
            longText: "Reykjavik, la capitale più settentrionale del mondo, è nel 2026 l'avamposto di una nuova filosofia di viaggio legata alla potenza degli elementi. La città è un mix sorprendente di case in lamiera colorata, musei d'avanguardia e una scena creativa che ha dato i natali a artisti di fama mondiale. Qui l'energia pulita non è solo uno slogan: tutto, dal riscaldamento alle serre che producono frutti esotici sotto il circolo polare, proviene dal calore della terra. Reykjavik è la base perfetta per esplorare il Golden Circle, ma è anche una città che merita di essere vissuta per i suoi caffè accoglienti, i suoi festival cinematografici e le sue piscine geotermali pubbliche dove gli islandesi discutono di politica immersi nell'acqua a 40 gradi mentre fuori soffia il vento gelido. Nel 2026, la caccia all'Aurora Boreale è diventata un'esperienza tecnologica e mistica allo stesso tempo, attirando chiunque cerchi uno spettacolo che riconnetta l'uomo con l'immensità del cosmo.",
            keyFeatures: ["Energia Geotermica", "Design e Musica Nordica", "Avventura Artica", "Aurora Boreale"],
            landmarks: [
                { name: "Hallgrímskirkja", img: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=600", desc: "La maestosa cattedrale la cui forma richiama le colonne di basalto vulcanico tipiche del paesaggio islandese." },
                { name: "Harpa Concert Hall", img: "https://images.unsplash.com/photo-1552528154-8e1008630099?auto=format&fit=crop&w=600", desc: "Un edificio futuristico in vetro che cattura la luce artica riflettendola in mille colori." },
                { name: "Blue Lagoon", img: "https://images.unsplash.com/photo-1533038590840-1cde6b66b721?auto=format&fit=crop&w=600", desc: "Una spa geotermale unica al mondo, dove le acque ricche di silice creano un contrasto surreale con la lava nera." }
            ]
        },
        planner: {
            mustSee: ["Hallgrímskirkja", "Blue Lagoon", "Golden Circle"],
            hiddenGems: ["Sky Lagoon", "Grótta Lighthouse", "Reykjadalur River"],
            rainyDayOptions: ["Perlan Museum", "FlyOver Iceland", "Public Pools"],
            itineraries: { 3: [{ day: 1, title: "Urban Fire", morning: "Laugavegur Street", afternoon: "Hallgrímskirkja", evening: "Tasting Menu Reykjavik" }, { day: 2, title: "Nature Wonders", morning: "Golden Circle Tour", afternoon: "Gullfoss Waterfall", evening: "Northern Lights Hunt" }, { day: 3, title: "Thermal Chill", morning: "Blue Lagoon", afternoon: "Old Harbour", evening: "Craft Beer Tour" }] }
        }
    },
    { 
        name: "Tulum", 
        coords: [20.2114, -87.4654], 
        country: "Messico",
        budget: 2,
        img: "https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&w=400",
        desc: "Eco-chic e rovine Maya. Dove i trendsetter meditano e ballano.",
        trend: "+85% Instagram trend",
        tags: { type: "relax", age: "young", mood: "trendsetter" },
        bestMonths: ["gennaio", "febbraio", "marzo", "aprile", "novembre", "dicembre"],
        vibeData: { nightlife: 70, culture: 80, nature: 85, relax: 90, food: 75 },
        fullDescription: {
            longText: "Tulum nel 2026 rappresenta la frontiera del 'Barefoot Luxury'. Questa striscia di costa caraibica nella penisola dello Yucatan ha saputo trasformarsi da villaggio di pescatori a epicentro mondiale per la comunità boho-chic. Le rovine Maya che sorvegliano il mare turchese offrono una cornice storica impareggiabile, ricordandoci che la bellezza qui è sacra da secoli. Nel 2026, la zona della biosfera di Sian Ka'an è ancora più protetta, permettendo ai viaggiatori di esplorare canali naturali tra le mangrovie in totale silenzio. La vita a Tulum si divide tra la 'Beach Road', dove hotel di design integrati nella giungla ospitano cerimonie del cacao e DJ set spiritual-house, e i Cenotes dell'entroterra, piscine naturali sotterranee dove l'acqua dolce è così limpida da sembrare invisibile. È il luogo dove il benessere fisico incontra un'estetica curatissima, tra amache, tetti di paglia e un'offerta culinaria che celebra gli ingredienti ancestrali del Messico.",
            keyFeatures: ["Archeologia Maya", "Cenotes Mistici", "Estetica Jungle-Chic", "Cerimonie Spirituali"],
            landmarks: [
                { name: "Rovine di Tulum", img: "https://images.unsplash.com/photo-1504730655501-24c39ac53f0e?auto=format&fit=crop&w=600", desc: "L'unica città Maya costruita direttamente su una scogliera affacciata sul mare, un sito di bellezza mistica." },
                { name: "Gran Cenote", img: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&w=600", desc: "Un sistema di grotte e acque cristalline perfette per lo snorkeling tra tartarughe e formazioni calcaree." },
                { name: "Sian Ka'an", img: "https://images.unsplash.com/photo-1513251781216-92c42c954605?auto=format&fit=crop&w=600", desc: "Una riserva della biosfera immensa, dove la giungla incontra il mare in un ecosistema protetto dall'UNESCO." }
            ]
        },
        planner: {
            mustSee: ["Tulum Ruins", "Gran Cenote", "Playa Paraiso"],
            hiddenGems: ["Sian Ka'an Biosphere", "Cenote Dos Ojos", "Holistika Ubud Vibes"],
            rainyDayOptions: ["Cacao Ceremony", "Temazcal Ritual", "Art Galleries"],
            itineraries: { 3: [{ day: 1, title: "Maya History", morning: "Tulum Ruins", afternoon: "Playa Paraiso", evening: "Dinner at Hartwood" }, { day: 2, title: "Cenote Adventure", morning: "Gran Cenote", afternoon: "Sian Ka'an Safari", evening: "Beach Club Party" }, { day: 3, title: "Boho Spirit", morning: "Yoga Session", afternoon: "Shopping Zone", evening: "Azulik Sunset" }] }
        }
    },
    { 
        name: "Tokyo", 
        coords: [35.6762, 139.6503], 
        country: "Giappone",
        budget: 2,
        img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400",
        desc: "Luci al neon e tradizione millenaria. L'avventura urbana più incredibile.",
        trend: "Evergreen tech-trip",
        tags: { type: "adventure", age: "young", mood: "trendsetter" },
        bestMonths: ["marzo", "aprile", "maggio", "ottobre", "novembre"],
        vibeData: { nightlife: 90, culture: 100, nature: 30, relax: 40, food: 100 },
        fullDescription: {
            longText: "Tokyo nel 2026 è una visione del futuro che non dimentica il passato. La metropoli più grande del mondo si muove con la precisione di un orologio svizzero ma conserva il calore di una comunità antica. Il 2026 vede Tokyo come leader globale dell'intelligenza artificiale applicata alla vita quotidiana, con sistemi di trasporto e servizi che sembrano usciti da un film di fantascienza. Tuttavia, basta svoltare l'angolo di un grattacielo a Shinjuku per trovare un piccolo santuario shintoista dove regna il silenzio e il profumo del legno. La cultura del cibo è ai massimi livelli: dai ramen shop da otto posti sotto i binari della ferrovia ai ristoranti di sushi stellati che richiedono mesi di prenotazione. Tokyo è una città di contrasti estremi: la frenesia dell'incrocio di Shibuya, la moda 'cosplay' di Harajuku e la pace dei giardini imperiali durante la fioritura dei ciliegi. Ogni distretto è una città a sé stante, pronta a offrire un'avventura sensoriale diversa ogni ora del giorno e della notte.",
            keyFeatures: ["Tecnologia Robotica", "Gastronomia Mondiale", "Contrasto Moderno/Antico", "Efficienza Suprema"],
            landmarks: [
                { name: "Incrocio di Shibuya", img: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600", desc: "L'attraversamento pedonale più trafficato del mondo, cuore pulsante della cultura giovanile giapponese." },
                { name: "Senso-ji (Asakusa)", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600", desc: "Il tempio buddista più antico e venerato della città, con la sua enorme lanterna rossa d'ingresso." },
                { name: "Tokyo Skytree", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600", desc: "Una delle torri di osservazione più alte del mondo, per vedere l'infinita distesa di luci della città." }
            ]
        },
        planner: {
            mustSee: ["Shibuya Crossing", "Senso-ji Temple", "teamLab Borderless"],
            hiddenGems: ["Shimokitazawa", "Golden Gai", "Yanaka Ginza"],
            rainyDayOptions: ["Ghibli Museum", "Sunshine City Aquarium", "Karaoke Kan"],
            itineraries: { 3: [{ day: 1, title: "Neon Dreams", morning: "Harajuku Street", afternoon: "Shibuya Sky", evening: "Shinjuku Izakaya Tour" }, { day: 2, title: "Old Souls", morning: "Asakusa Temple", afternoon: "Ueno Park", evening: "Akihabara Tech Safari" }, { day: 3, title: "Modern Art", morning: "Toyosu Fish Market", afternoon: "teamLab Borderless", evening: "Roppongi Hills" }] }
        }
    },
    { 
        name: "Lofoten", 
        coords: [68.1664, 13.7544], 
        country: "Norvegia",
        budget: 3,
        img: "/img/lofoten.jpg",
        desc: "Fiordi spettacolari e villaggi di pescatori. Natura incontaminata e selvaggia.",
        trend: "Top 2026 Wild Trend",
        tags: { type: "adventure", age: "senior", mood: "hidden" },
        bestMonths: ["giugno", "luglio", "agosto"],
        vibeData: { nightlife: 10, culture: 50, nature: 100, relax: 85, food: 60 },
        fullDescription: {
            longText: "Le Isole Lofoten nel 2026 sono la testimonianza di come la natura possa essere, allo stesso tempo, brutale e bellissima. Situato ben oltre il Circolo Polare Artico, questo arcipelago è caratterizzato da montagne di granito che sorgono verticalmente dall'oceano, villaggi di pescatori dalle case rosse (rorbu) e una luce che ha affascinato generazioni di pittori. Nel 2026, le Lofoten sono diventate un modello di turismo 'zero impact', con traghetti elettrici che scivolano silenziosi tra i fiordi. Qui l'esperienza principale è l'immersione totale: fare surf nelle gelide acque cristalline di Unstad, scalare vette per ammirare il sole di mezzanotte in estate o aspettare la danza dell'aurora boreale in inverno. La cultura dello stoccafisso è ancora il pilastro dell'economia e della gastronomia locale, con rastrelliere di legno cariche di pesce che punteggiano il paesaggio. È una terra di silenzio, aria purissima e panorami che tolgono il fiato, perfetta per chi cerca di scappare dal rumore della civiltà moderna.",
            keyFeatures: ["Fiordi Artici", "Villaggi di Pescatori Storici", "Trekking Panoramici", "Sole di Mezzanotte"],
            landmarks: [
                { name: "Reinebringen", img: "https://images.unsplash.com/photo-1513519107127-1bed33748e4c?auto=format&fit=crop&w=600", desc: "La cima che offre la vista più famosa e spettacolare su tutto l'arcipelago delle Lofoten." },
                { name: "Henningsvær", img: "https://images.unsplash.com/photo-1541014526012-077d406da8d3?auto=format&fit=crop&w=600", desc: "Chiamata la 'Venezia del Nord', ospita il campo da calcio più panoramico e fotografato al mondo." },
                { name: "Nusfjord", img: "https://images.unsplash.com/photo-1571216521752-61a7a22e8312?auto=format&fit=crop&w=600", desc: "Uno dei villaggi di pescatori più antichi e meglio conservati della Norvegia, oggi museo vivente." }
            ]
        },
        planner: {
            mustSee: ["Reinebringen Hike", "Å Village", "Henningsvær"],
            hiddenGems: ["Kvalvika Beach", "Nusfjord", "Uttakleiv Beach"],
            rainyDayOptions: ["Lofotr Viking Museum", "Art Galleries Svolvær", "Sea Cabin Sauna"],
            itineraries: { 3: [{ day: 1, title: "Fisherman's Life", morning: "Svolvær Harbour", afternoon: "Henningsvær Football Pitch", evening: "Rorbuer Dinner" }, { day: 2, title: "The Reine View", morning: "Reine Village", afternoon: "Kvalvika Hike", evening: "Midnight Sun Watch" }, { day: 3, title: "Viking History", morning: "Lofotr Museum", afternoon: "Nusfjord Heritage", evening: "Arctic Spa" }] }
        }
    },
    { 
        name: "Hvar", 
        coords: [43.1721, 16.4419], 
        country: "Croazia",
        budget: 2,
        img: "/img/hvar.jpg",
        desc: "L'isola della lavanda e delle yacht parties. Storia e divertimento.",
        trend: "+55% Yachting searches",
        tags: { type: "party", age: "adult", mood: "trendsetter" },
        bestMonths: ["giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 85, culture: 70, nature: 75, relax: 60, food: 80 },
        fullDescription: {
            longText: "Hvar nel 2026 è la risposta dell'Adriatico a Saint-Tropez, ma con un'anima medievale intatta e una natura mediterranea prorompente. L'isola, baciata da oltre 2700 ore di sole all'anno, profuma di lavanda, rosmarino e pino marittimo. La città di Hvar è un salotto di pietra bianca lucidata dal tempo, dove palazzi veneziani si affacciano su un porto affollato da catamarani futuristici. Il 2026 ha visto una rinascita dei vitigni autoctoni, rendendo l'entroterra dell'isola una destinazione imperdibile per gli amanti del vino d'eccellenza. Mentre i beach club delle isole Pakleni offrono feste leggendarie che durano fino all'alba, villaggi storici come Stari Grad (uno dei più antichi d'Europa) offrono un ritmo più lento, ideale per chi cerca la pace tra campi coltivati a vite e ulivi protetti dall'UNESCO. Hvar è il luogo dove il glamour dei party internazionali incontra l'autenticità dei pescatori croati, in un mix che incanta ogni tipo di viaggiatore.",
            keyFeatures: ["Vita Notturna Esclusiva", "Enologia di Alto Livello", "Patrimonio Veneziano", "Isole Pakleni"],
            landmarks: [
                { name: "Fortezza Spagnola", img: "https://images.unsplash.com/photo-1549410196-9831777f520b?auto=format&fit=crop&w=600", desc: "La rocca che domina la città di Hvar, da cui si gode una vista mozzafiato sull'arcipelago delle Pakleni." },
                { name: "Piazza Santo Stefano", img: "https://images.unsplash.com/photo-1621282302306-037142b6a5a2?auto=format&fit=crop&w=600", desc: "Il cuore sociale dell'isola, una delle piazze più grandi e belle della Dalmazia." },
                { name: "Piana di Stari Grad", img: "https://images.unsplash.com/photo-1616421443657-36e3e5c70752?auto=format&fit=crop&w=600", desc: "Un antico sistema di divisione dei campi risalente ai coloni greci, ancora perfettamente funzionante." }
            ]
        },
        planner: {
            mustSee: ["Hvar Fortress", "Pakleni Islands", "St. Stephen's Square"],
            hiddenGems: ["Dubovica Beach", "Lavender Fields Brusje", "Vrboska (Little Venice)"],
            rainyDayOptions: ["Wine Tasting Stari Grad", "Arsenal Theatre", "Cooking Class"],
            itineraries: { 3: [{ day: 1, title: "Glamour Port", morning: "Hvar Town Walk", afternoon: "Spanish Fortress", evening: "Carpe Diem Aperitivo" }, { day: 2, title: "Island Hopping", morning: "Pakleni Islands Boat", afternoon: "Beach Club Lunch", evening: "Yacht Party vibe" }, { day: 3, title: "Vintage Island", morning: "Stari Grad Plain", afternoon: "Lavender Fields", evening: "Konoba Dinner" }] }
        }
    },
    { 
        name: "Zanzibar", 
        coords: [-6.1378, 39.3621], 
        country: "Tanzania",
        budget: 1,
        img: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=400",
        desc: "Sabbia bianca e mare turchese. Il paradiso del relax esotico nel 2026.",
        trend: "Rising Sun Trend",
        tags: { type: "relax", age: "adult", mood: "exclusive" },
        bestMonths: ["gennaio", "febbraio", "giugno", "luglio", "agosto", "settembre", "ottobre"],
        vibeData: { nightlife: 30, culture: 65, nature: 90, relax: 100, food: 80 },
        fullDescription: {
            longText: "Zanzibar nel 2026 è l'archetipo dell'esotismo che ha saputo integrare la modernità senza perdere la sua magia speziata. L'isola, situata nell'Oceano Indiano al largo della Tanzania, è un mosaico di culture africane, arabe e indiane. Stone Town, il centro storico di pietra corallina, è un labirinto di vicoli dove le porte intagliate raccontano storie di mercanti e sultani. Nel 2026, Zanzibar è diventata leader nel turismo subacqueo sostenibile, proteggendo le barriere coralline di Mnemba e offrendo esperienze uniche di nuoto con i delfini in natura. Le spiagge del nord, come Nungwi e Kendwa, offrono acque turchesi dove la marea gioca con i colori della sabbia, mentre la costa est è il paradiso del kite-surf grazie ai venti costanti. L'entroterra, con le sue piantagioni di chiodi di garofano, cannella e vaniglia, continua a profumare l'aria, rendendo Zanzibar l'Isola delle Spezie per eccellenza, un luogo dove il tempo è dettato dal ritmo del 'Pole Pole' (piano piano).",
            keyFeatures: ["Mare Cristallino", "Mix Culturale Unico", "Tour delle Spezie", "Architettura in Corallo"],
            landmarks: [
                { name: "Stone Town", img: "https://images.unsplash.com/photo-1541014526012-077d406da8d3?auto=format&fit=crop&w=600", desc: "L'antica città di pietra corallina, un dedalo di vicoli che è cuore pulsante della storia africana e araba." },
                { name: "Spiaggia di Nungwi", img: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=600", desc: "Considerata una delle spiagge più belle del mondo, dove il turchese dell'acqua è quasi accecante." },
                { name: "The Rock Restaurant", img: "https://images.unsplash.com/photo-1607513165842-45231dfb8772?auto=format&fit=crop&w=600", desc: "Un ristorante iconico costruito sopra uno scoglio in mezzo all'oceano, raggiungibile a piedi con la bassa marea." }
            ]
        },
        planner: {
            mustSee: ["Stone Town", "Nungwi Beach", "Prison Island"],
            hiddenGems: ["Jozani Forest", "The Rock Restaurant", "Paje Seaweed Farm"],
            rainyDayOptions: ["Spice Tour", "Stone Town Market", "Zanzibar Coffee House"],
            itineraries: { 3: [{ day: 1, title: "Stone Town Soul", morning: "Forodhani Gardens", afternoon: "Stone Town Tour", evening: "Sunset Dhow Cruise" }, { day: 2, title: "Turquoise Bliss", morning: "Nungwi Turtle Sanctuary", afternoon: "Beach Chillout", evening: "Seafood BBQ" }, { day: 3, title: "Spice & Nature", morning: "Spice Farm Tour", afternoon: "The Rock Lunch", evening: "Paje Nightlife" }] }
        }
    },
    { 
        name: "Queenstown", 
        coords: [-45.0312, 168.6626], 
        country: "Nuova Zelanda",
        budget: 2,
        img: "/img/queenstown.jpg",
        desc: "Capitale mondiale dell'adrenalina per il 2026.",
        trend: "Pure Adrenaline 2026",
        tags: { type: "adventure", age: "young", mood: "exclusive" },
        bestMonths: ["dicembre", "gennaio", "febbraio", "giugno", "luglio", "agosto"],
        vibeData: { nightlife: 70, culture: 40, nature: 100, relax: 30, food: 70 },
        fullDescription: {
            longText: "Queenstown nel 2026 si conferma la 'Adventure Capital of the World', un luogo dove l'essere umano sfida costantemente i propri limiti immerso in una natura da cinema. Situata sulle sponde del cristallino Lago Wakatipu e circondata dalle maestose cime dei Remarkables, la città è un magnete per chiunque cerchi emozioni forti: dal bungee jumping originale al paracadutismo, fino al jet-boating nei canyon fluviali. Ma il 2026 ha rivelato anche un lato più sofisticato di Queenstown: la regione è ora celebrata per i suoi pinot neri di classe mondiale prodotti nelle valli circostanti e per un'offerta gastronomica d'eccellenza. Che sia inverno, con le stazioni sciistiche che offrono piste spettacolari, o estate, con i sentieri di trekking che portano a panorami infiniti, Queenstown pulsa di un'energia giovanile e internazionale. È il luogo dove dopo una giornata di pura adrenalina, ci si ritrova tutti intorno a un braciere a bere birra artigianale, progettando la prossima sfida contro la gravità.",
            keyFeatures: ["Sport Estremi", "Scenari da Signore degli Anelli", "Vini di Classe Mondiale", "Vibe Cosmopolita"],
            landmarks: [
                { name: "Milford Sound", img: "https://images.unsplash.com/photo-1549410196-9831777f520b?auto=format&fit=crop&w=600", desc: "A poche ore di distanza, il fiordo più iconico della Nuova Zelanda, definito da Kipling l'ottava meraviglia del mondo." },
                { name: "I Remarkables", img: "https://images.unsplash.com/photo-1550529329-87c2b55b90f4?auto=format&fit=crop&w=600", desc: "Una catena montuosa imponente che fa da sfondo alla città, famosa per la sua bellezza aspra e i campi da sci." },
                { name: "Skyline Gondola", img: "https://images.unsplash.com/photo-1589736349132-72049c66cc26?auto=format&fit=crop&w=600", desc: "La funivia che porta a Bob’s Peak per ammirare il panorama più famoso sul lago e le montagne." }
            ]
        },
        planner: {
            mustSee: ["Milford Sound", "Skyline Luge", "Fergburger"],
            hiddenGems: ["Glenorchy", "Arrowtown", "Moke Lake"],
            rainyDayOptions: ["Onsen Hot Pools", "Wine Tour Central Otago", "Cinema Paradiso"],
            itineraries: { 3: [{ day: 1, title: "Adrenaline Start", morning: "Bungee Jump", afternoon: "Skyline Gondola", evening: "Fergburger Dinner" }, { day: 2, title: "The Fjord", morning: "Milford Sound Flight", afternoon: "Jet Boat Kawarau", evening: "Craft Beer Tour" }, { day: 3, title: "Middle Earth", morning: "Glenorchy Tour", afternoon: "Arrowtown Gold Mining", evening: "Onsen Relaxation" }] }
        }
    },
    { 
        name: "Amalfi", 
        coords: [40.6333, 14.6027], 
        country: "Italia",
        budget: 3,
        img: "https://images.unsplash.com/photo-1533903345306-15d1c30952de?auto=format&fit=crop&w=400",
        desc: "Limoni, scogliere e la 'Dolce Vita'. Lusso classico senza tempo.",
        trend: "+40% Luxury bookings",
        tags: { type: "relax", age: "senior", mood: "exclusive" },
        bestMonths: ["maggio", "giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 40, culture: 85, nature: 80, relax: 90, food: 100 },
        fullDescription: {
            longText: "Amalfi e la sua costa nel 2026 rappresentano l'apoteosi del fascino italiano nel mondo. Questa striscia di terra dove le montagne Lattari si tuffano verticalmente nel mar Tirreno è un miracolo di architettura e natura. Le strade tortuose sospese tra cielo e mare collegano borghi verticali dai colori pastello, dove il profumo dei limoni 'sfusato amalfitano' riempie l'aria. Nel 2026, Amalfi ha saputo proteggere la sua fragilità limitando l'accesso turistico a favore di un'esperienza di altissimo valore, fatta di antiche tradizioni artigiane (come la produzione della carta) e una cucina di mare che è poesia per il palato. Ravello, dall'alto delle sue ville, offre i concerti di musica classica più suggestivi d'Europa, mentre Positano continua a essere la regina del glamour internazionale. È la terra della Dolce Vita, dove il lusso non è ostentazione ma bellezza pura, armonia e il piacere di guardare il mare sorseggiando un limoncello fatto in casa.",
            keyFeatures: ["Panorami Verticali", "Enogastronomia d'Eccellenza", "Storia delle Repubbliche Marinare", "Artigianato della Carta"],
            landmarks: [
                { name: "Duomo di Amalfi", img: "https://images.unsplash.com/photo-1590055531801-44331a33753c?auto=format&fit=crop&w=600", desc: "Una cattedrale arabo-normanna con una scalinata monumentale e un chiostro del paradiso da sogno." },
                { name: "Villa Cimbrone", img: "https://images.unsplash.com/photo-1533903345306-15d1c30952de?auto=format&fit=crop&w=600", desc: "A Ravello, celebre per la sua 'Terrazza dell'Infinito' che offre la vista più bella del mondo sul golfo." },
                { name: "Sentiero degli Dei", img: "https://images.unsplash.com/photo-1549410196-9831777f520b?auto=format&fit=crop&w=600", desc: "Un cammino di trekking sospeso tra le nuvole che collega Agerola a Positano tra paesaggi mitologici." }
            ]
        },
        planner: {
            mustSee: ["Duomo di Amalfi", "Positano", "Ravello Gardens"],
            hiddenGems: ["Fiordo di Furore", "Sentiero degli Dei", "Atrani Village"],
            rainyDayOptions: ["Paper Museum", "Cooking Class Lemon Tour", "Wine Tasting Tramonti"],
            itineraries: { 3: [{ day: 1, title: "Coast Icons", morning: "Amalfi Cathedral", afternoon: "Positano Shopping", evening: "Dinner in Praiano" }, { day: 2, title: "Garden Views", morning: "Villa Cimbrone Ravello", afternoon: "Atrani Walk", evening: "Limoncello Tasting" }, { day: 3, title: "Hiking Bliss", morning: "Sentiero degli Dei", afternoon: "Fiordo di Furore", evening: "Seafood Gourmet" }] }
        }
    },
    { 
        name: "Berlin", 
        coords: [52.5200, 13.4050], 
        country: "Germania",
        budget: 1,
        img: "/img/berlin.jpg",
        desc: "Techno industriale e cultura underground. La notte più lunga d'Europa.",
        trend: "Nightlife Authority",
        tags: { type: "party", age: "young", mood: "hidden" },
        bestMonths: ["maggio", "giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 100, culture: 90, nature: 30, relax: 30, food: 80 },
        fullDescription: {
            longText: "Berlino nel 2026 è un laboratorio sociale e culturale in continua ebollizione. La città, divisa per decenni da un muro, ha saputo trasformare le sue cicatrici in spazi di creatività sfrenata e libertà assoluta. È la capitale mondiale della techno, dove club situati in vecchie centrali elettriche o bunker industriali offrono esperienze sonore che durano intere giornate. Ma Berlino è anche una città verde, con parchi immensi come il Tiergarten e l'aeroporto dismesso di Tempelhof diventato uno spazio pubblico unico al mondo. Nel 2026, Berlino è il centro dell'arte contemporanea europea, con gallerie nascoste in ogni cortile di Mitte e Kreuzberg. La gastronomia riflette il suo spirito cosmopolita: dal leggendario Currywurst ai ristoranti vegani più innovativi del pianeta. Berlino non cerca di essere bella nel senso tradizionale, ma la sua energia, la sua tolleranza e la sua capacità di reinventarsi ogni giorno la rendono la metropoli più cool e autentica d'Europa.",
            keyFeatures: ["Cultura Techno Mondiale", "Storia del XX Secolo", "Scene Artistiche Underground", "Spazi Urbani Riconvertiti"],
            landmarks: [
                { name: "Porta di Brandeburgo", img: "https://images.unsplash.com/photo-1560930950-5cc60be4fe14?auto=format&fit=crop&w=600", desc: "Il simbolo dell'unità tedesca, un monumento neoclassico testimone della storia mondiale." },
                { name: "East Side Gallery", img: "https://images.unsplash.com/photo-1534313314376-a72289b6181e?auto=format&fit=crop&w=600", desc: "Il tratto più lungo del Muro di Berlino ancora in piedi, trasformato in una galleria d'arte a cielo aperto." },
                { name: "Isola dei Musei", img: "https://images.unsplash.com/photo-1549117122-834f37435f29?auto=format&fit=crop&w=600", desc: "Un complesso unico al mondo, patrimonio UNESCO, che ospita tesori millenari come l'altare di Pergamo." }
            ]
        },
        planner: {
            mustSee: ["Brandenburg Gate", "East Side Gallery", "Reichstag"],
            hiddenGems: ["Teufelsberg", "Tempelhofer Feld", "Raw-Gelände"],
            rainyDayOptions: ["Museum Island", "Berghain (if you can get in)", "Dark Matter Exhibit"],
            itineraries: { 3: [{ day: 1, title: "History & Wall", morning: "Checkpoint Charlie", afternoon: "East Side Gallery", evening: "Kreuzberg Bar Crawl" }, { day: 2, title: "Urban Art", morning: "Mitte Galleries", afternoon: "Tempelhof Park", evening: "Techno Clubbing Night" }, { day: 3, title: "Indie Spirit", morning: "Flohmarkt Mauerpark", afternoon: "Teufelsberg Spy Station", evening: "Neukölln Dinner" }] }
        }
    },
    { 
        name: "Kyoto", 
        coords: [35.0116, 135.7681], 
        country: "Giappone",
        budget: 2,
        img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400",
        desc: "Templi dorati e foreste di bambù. Una camminata nel tempo.",
        trend: "Zen Travel +30%",
        tags: { type: "relax", age: "senior", mood: "hidden" },
        bestMonths: ["marzo", "aprile", "maggio", "ottobre", "novembre"],
        vibeData: { nightlife: 20, culture: 100, nature: 80, relax: 90, food: 95 },
        fullDescription: {
            longText: "Kyoto nel 2026 è il custode dell'anima spirituale del Giappone. Mentre il resto del paese corre verso il futuro, Kyoto rallenta, invitando i visitatori a riflettere tra giardini zen e padiglioni d'oro. Con oltre 1600 templi buddisti e centinaia di santuari shintoisti, la città è un museo vivente che celebra l'armonia tra uomo e natura. Nel 2026, Kyoto ha implementato tecnologie discrete per preservare il silenzio e la bellezza dei suoi quartieri storici come Gion, dove è ancora possibile vedere la grazia fugace di una geiko o di una maiko. La cucina Kaiseki di Kyoto è una forma d'arte che segue rigorosamente le stagioni, servita in sale da tè che si affacciano su ruscelli limpidi. Che sia la fioritura dei ciliegi (Sakura) in primavera o il rosso acceso degli aceri (Momiji) in autunno, Kyoto offre una bellezza struggente che invita alla meditazione e alla gratitudine, rappresentando l'equilibrio perfetto della cultura giapponese.",
            keyFeatures: ["Templi e Santuari UNESCO", "Cultura del Tè", "Giardini Zen di Pietra", "Geisha e Tradizioni"],
            landmarks: [
                { name: "Kinkaku-ji", img: "https://images.unsplash.com/photo-1549117122-834f37435f29?auto=format&fit=crop&w=600", desc: "Il Padiglione d'Oro, un tempio interamente ricoperto d'oro che si specchia in un laghetto silenzioso." },
                { name: "Fushimi Inari", img: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=600", desc: "Il santuario famoso per i suoi migliaia di torii rossi che formano un tunnel infinito attraverso la montagna." },
                { name: "Arashiyama", img: "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&w=600", desc: "La celebre foresta di bambù, dove il vento tra le canne crea uno dei suoni più rilassanti del pianeta." }
            ]
        },
        planner: {
            mustSee: ["Kinkaku-ji", "Fushimi Inari", "Arashiyama Bamboo Grove"],
            hiddenGems: ["Otagi Nenbutsu-ji", "Philosopher's Path", "Gion District at Night"],
            rainyDayOptions: ["Tea Ceremony", "Nishiki Market", "Kyoto International Manga Museum"],
            itineraries: { 3: [{ day: 1, title: "Golden Zen", morning: "Kinkaku-ji", afternoon: "Arashiyama Bamboo", evening: "Kaiseki Dinner" }, { day: 2, title: "Thousands Gates", morning: "Fushimi Inari Shrine", afternoon: "Kiyomizu-dera", evening: "Gion Geisha Walk" }, { day: 3, title: "Slow Path", morning: "Philosopher's Path", afternoon: "Tea Workshop", evening: "Pontocho Alley" }] }
        }
    },
    { 
        name: "Cape Town", 
        coords: [-33.9249, 18.4241], 
        country: "Sudafrica",
        budget: 1,
        img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=400",
        desc: "Dove l'oceano incontra la montagna. Avventura selvaggia e metropolitana.",
        trend: "Safari-City Trend",
        tags: { type: "adventure", age: "adult", mood: "exclusive" },
        bestMonths: ["novembre", "dicembre", "gennaio", "febbraio", "marzo"],
        vibeData: { nightlife: 75, culture: 80, nature: 95, relax: 60, food: 90 },
        fullDescription: {
            longText: "Città del Capo nel 2026 è una delle metropoli più affascinanti e contrastanti del mondo. Situata sulla punta meridionale dell'Africa, è dominata dall'imponente Table Mountain, una delle sette meraviglie naturali del mondo. Nel 2026, Cape Town è diventata un polo globale per l'arte contemporanea africana e per un design che unisce radici tribali e minimalismo moderno. La città offre una varietà di esperienze incredibile: si può nuotare con i pinguini a Boulders Beach, fare surf in acque gelide, esplorare le storiche case colorate di Bo-Kaap o degustare vini spettacolari nelle valli di Constantia. Cape Town porta con sé una storia complessa e profonda, visibile a Robben Island, ma oggi guarda avanti con un'energia multiculturale vibrante che si esprime nella sua musica, nei suoi mercati gastronomici e in una scena creativa che sta ridefinendo il volto dell'Africa moderna. È il luogo dove la forza bruta dell'oceano e la maestosità della montagna creano un palcoscenico naturale senza eguali.",
            keyFeatures: ["Natura Selvaggia Urbana", "Arte e Design Africano", "Enologia di Pregio", "Storia e Resilienza"],
            landmarks: [
                { name: "Table Mountain", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=600", desc: "La montagna piatta che regala la vista definitiva sull'oceano e sulla città, spesso avvolta da una 'tovaglia' di nuvole." },
                { name: "Capo di Buona Speranza", img: "https://images.unsplash.com/photo-1599818814725-7df844238e56?auto=format&fit=crop&w=600", desc: "Il punto estremo del continente, dove i due oceani si incontrano in un tripudio di onde e scogliere." },
                { name: "Zeitz MOCAA", img: "https://images.unsplash.com/photo-1520113264420-117565c57b9f?auto=format&fit=crop&w=600", desc: "Un museo d'arte contemporanea mozzafiato ricavato da un antico silo di grano nel Waterfront." }
            ]
        },
        planner: {
            mustSee: ["Table Mountain", "Cape of Good Hope", "Robben Island"],
            hiddenGems: ["Bo-Kaap", "Kirstenbosch Gardens", "Boulders Beach Penguins"],
            rainyDayOptions: ["Zeitz MOCAA", "Wine Tasting Constantia", "Two Oceans Aquarium"],
            itineraries: { 3: [{ day: 1, title: "The Mountain", morning: "Table Mountain Cableway", afternoon: "V&A Waterfront", evening: "Dinner in Bree Street" }, { day: 2, title: "Peninsula Tour", morning: "Boulders Beach", afternoon: "Cape Point", evening: "Camps Bay Sunset" }, { day: 3, title: "Vines & Art", morning: "Constantia Wine Valley", afternoon: "Zeitz MOCAA Art", evening: "Kirstenbosch Concert" }] }
        }
    },
    { 
        name: "Saint-Tropez", 
        coords: [43.2677, 6.6407], 
        country: "Francia",
        budget: 3,
        img: "/img/saint-tropez.jpg",
        desc: "Il porto più glamour del mondo. Champagne e yacht sulla Costa Azzurra.",
        trend: "Elite Summer Target",
        tags: { type: "party", age: "senior", mood: "exclusive" },
        bestMonths: ["giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 85, culture: 50, nature: 50, relax: 75, food: 95 },
        fullDescription: {
            longText: "Saint-Tropez nel 2026 continua a essere il mito intramontabile del jet-set internazionale, ma con una nuova consapevolezza verso il lusso 'quiet' e l'autenticità provenzale. Il piccolo villaggio di pescatori reso celebre da Brigitte Bardot negli anni '50 è oggi un luogo dove gli yacht più grandi del mondo attraccano a pochi metri dalle boutique di Place des Lices. Nel 2026, Saint-Tropez ha riscoperto il suo legame con l'arte e la luce che stregò Matisse e Signac, promuovendo percorsi culturali tra gallerie nascoste nei vicoli. Le spiagge di Pampelonne rimangono il cuore del divertimento, con beach club leggendari che offrono il miglior champagne sotto il sole della Provenza. Eppure, basta allontanarsi di poco dal porto per trovare vigneti spettacolari e borghi medievali come Ramatuelle che sembrano sospesi nel tempo. Saint-Tropez è un'icona che sa rinnovarsi, offrendo un mix irresistibile di glamour sfrenato, alta cucina e quell'inconfondibile profumo di lavanda e mare che definisce la Costa Azzurra.",
            keyFeatures: ["Lusso Estremo", "Storia del Cinema e del Jet-Set", "Spiagge di Pampelonne", "Vibe Provenzale"],
            landmarks: [
                { name: "Porto di Saint-Tropez", img: "https://images.unsplash.com/photo-1549410196-9831777f520b?auto=format&fit=crop&w=600", desc: "La passerella più glamour della Costa Azzurra, dove ammirare gli yacht più incredibili del pianeta." },
                { name: "La Cittadella", img: "https://images.unsplash.com/photo-1627918342205-18e47012354c?auto=format&fit=crop&w=600", desc: "Una fortezza del XVII secolo che domina il villaggio e offre una vista a 360 gradi sul golfo." },
                { name: "Place des Lices", img: "https://images.unsplash.com/photo-1583020614532-6be4e3ca8936?auto=format&fit=crop&w=600", desc: "La piazza del mercato dove gli abitanti giocano a pétanque sotto platani secolari, cuore dell'anima tropezienne." }
            ]
        },
        planner: {
            mustSee: ["Port of Saint-Tropez", "Pampelonne Beach", "Citadelle"],
            hiddenGems: ["Place des Lices", "Escalet Beach", "Ramatuelle Village"],
            rainyDayOptions: ["Musée de l'Annonciade", "Boutique Shopping", "Wine Tasting Provencal"],
            itineraries: { 3: [{ day: 1, title: "Yacht Life", morning: "Port Walk", afternoon: "Beach Club Nikki Beach", evening: "Dinner at L'Opéra" }, { day: 2, title: "Village Charm", morning: "Place des Lices Market", afternoon: "Citadelle Tour", evening: "Clubbing Cave du Roy" }, { day: 3, title: "Coastal Wild", morning: "Sentier du Littoral", afternoon: "Ramatuelle Lunch", evening: "Sunset Cocktails" }] }
        }
    },
    { 
        name: "Lampedusa", 
        coords: [35.5069, 12.6042], 
        country: "Italia",
        budget: 1,
        img: "https://images.unsplash.com/photo-1590490359854-dfba19688d70?auto=format&fit=crop&w=400",
        desc: "Spiaggia dei Conigli: il mare più bello del mondo tra Africa ed Europa.",
        trend: "The Hidden Crystal",
        tags: { type: "relax", age: "young", mood: "hidden" },
        bestMonths: ["giugno", "luglio", "agosto", "settembre"],
        vibeData: { nightlife: 40, culture: 30, nature: 100, relax: 95, food: 85 },
        fullDescription: {
            longText: "Lampedusa nel 2026 è un frammento di purezza africana nel cuore dell'Europa. Quest'isola brulla e battuta dal vento nasconde uno dei tesori naturalistici più grandi del pianeta: la Spiaggia dei Conigli. Qui l'acqua è così trasparente che le barche ormeggiate sembrano galleggiare nell'aria, e la sabbia è bianca come borotalco. Nel 2026, l'isola è diventata un avamposto della protezione ambientale marina, con la riserva che protegge il nido delle tartarughe Caretta Caretta. Lampedusa non offre grandi resort o lussi materiali, ma regala la ricchezza del silenzio, delle albe solitarie a Capo Grecale e dei sapori intensi di una cucina che unisce Sicilia e Maghreb. È il luogo dove i pescatori diventano guide per esplorare grotte e calette raggiungibili solo via mare, e dove la notte il cielo si riempie di stelle come in pochi altri posti al mondo. Lampedusa è un'esperienza umana profonda, un luogo di confine che insegna la bellezza dell'essenzialità e della natura selvaggia.",
            keyFeatures: ["Mare Cristallino e Incontaminato", "Fauna Protetta", "Cucina Ibrida Siculo-Africana", "Cielo Stellato"],
            landmarks: [
                { name: "Spiaggia dei Conigli", img: "https://images.unsplash.com/photo-1590490359854-dfba19688d70?auto=format&fit=crop&w=600", desc: "Costantemente votata tra le spiagge più belle del mondo, un'oasi di turchese assoluto." },
                { name: "Porta d'Europa", img: "https://images.unsplash.com/photo-1550529329-87c2b55b90f4?auto=format&fit=crop&w=600", desc: "Un monumento simbolico che celebra la speranza e la fratellanza nel punto più a sud dell'isola." },
                { name: "Cala Creta", img: "https://images.unsplash.com/photo-1599818814725-7df844238e56?auto=format&fit=crop&w=600", desc: "Una costa a strapiombo dove i dammusi si affacciano su un mare blu cobalto profondo." }
            ]
        },
        planner: {
            mustSee: ["Spiaggia dei Conigli", "Cala Pulcino", "Porto Vecchio"],
            hiddenGems: ["Cala Creta", "Dammuso Casa Teresa", "Tabaccara by Boat"],
            rainyDayOptions: ["Turtle Rescue Center", "Museo Archeologico", "Giro Gastronomico"],
            itineraries: { 3: [{ day: 1, title: "Crystal Sea", morning: "Spiaggia dei Conigli", afternoon: "Trekking to Cala Pulcino", evening: "Dinner at the Port" }, { day: 2, title: "Boat Magic", morning: "Island Boat Tour", afternoon: "Tabaccara Swim", evening: "Aperitivo at O'Scià" }, { day: 3, title: "Rocky Coast", morning: "Cala Creta Sunrise", afternoon: "Turtle Center Visit", evening: "Star Gazing" }] }
        }
    },
    { 
        name: "Lisbona", 
        coords: [38.7223, -9.1393], 
        country: "Portogallo",
        budget: 1,
        img: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=400",
        desc: "Azulejos, surf e movida. La capitale cool per i nomadi digitali nel 2026.",
        trend: "Digital Nomad Hub",
        tags: { type: "party", age: "adult", mood: "trendsetter" },
        bestMonths: ["aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre"],
        vibeData: { nightlife: 85, culture: 90, nature: 50, relax: 60, food: 95 },
        fullDescription: {
            longText: "Lisbona nel 2026 è la capitale della nuova Europa: solare, creativa e accogliente. Arrampicata sui suoi sette colli affacciati sull'estuario del Tago, la città è un trionfo di 'azulejos' colorati e luce dorata. Nel 2026, si è consolidata come la destinazione preferita dai nomadi digitali di tutto il mondo, grazie a un'atmosfera rilassata ma vibrante di innovazione. Alfama, il quartiere più antico, conserva il battito del Fado che risuona tra i vicoli stretti, mentre zone come LX Factory mostrano il volto industriale riconvertito in spazi di design e gallerie d'arte. Lisbona è anche la porta verso le onde dell'Atlantico, con Ericeira e Cascais a breve distanza per chi ama il surf. La gastronomia portoghese vive un momento d'oro, tra i tradizionali pastéis de nata e una nuova cucina contemporanea che celebra gli ingredienti del mare. Lisbona non si visita, si vive: salendo sui tram storici, ammirando la città dai 'miradouros' e lasciandosi trasportare da quella 'saudade' che non è tristezza, ma amore profondo per la vita.",
            keyFeatures: ["Cultura e Musica Fado", "Design e Street Art", "Paradiso del Surf e del Mare", "Gastronomia di Mare"],
            landmarks: [
                { name: "Torre di Belém", img: "https://images.unsplash.com/photo-1542468301-7170880e666a?auto=format&fit=crop&w=600", desc: "Il simbolo dell'epoca delle scoperte portoghesi, una torre fortificata che sembra navigare nel Tago." },
                { name: "Quartiere Alfama", img: "https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=600", desc: "L'anima antica della città, un labirinto di storia dove ogni angolo nasconde una taverna di Fado." },
                { name: "Monastero dei Jerónimos", img: "https://images.unsplash.com/photo-1552528154-8e1008630099?auto=format&fit=crop&w=600", desc: "Un capolavoro dello stile manuelino, con chiostri decorati in modo incredibile, testimonianza del potere imperiale." }
            ]
        },
        planner: {
            mustSee: ["Belem Tower", "Alfama District", "Praça do Comércio"],
            hiddenGems: ["LX Factory", "Miradouro da Senhora do Monte", "Pink Street"],
            rainyDayOptions: ["Oceanário de Lisboa", "Time Out Market", "Fado House Dinner"],
            itineraries: { 3: [{ day: 1, title: "History & Views", morning: "Alfama Walk", afternoon: "São Jorge Castle", evening: "Fado Night" }, { day: 2, title: "Pastel Life", morning: "Belém Tower & Pastéis", afternoon: "LX Factory Shopping", evening: "Bairro Alto Bar Hopping" }, { day: 3, title: "Ocean Breeze", morning: "Cascais Trip", afternoon: "Oceanário", evening: "Sunset at Cais do Sodré" }] }
        }
    },
    { 
        name: "Patagonia", 
        coords: [-50.3344, -72.3332], 
        country: "Argentina",
        budget: 2,
        img: "/img/patagonia.jpg",
        desc: "Ghiacciai immensi e cime proibite. L'ultima frontiera dell'esplorazione.",
        trend: "+150% Exploration searches",
        tags: { type: "adventure", age: "senior", mood: "trendsetter" },
        bestMonths: ["dicembre", "gennaio", "febbraio", "marzo"],
        vibeData: { nightlife: 10, culture: 40, nature: 100, relax: 50, food: 60 },
        fullDescription: {
            longText: "La Patagonia nel 2026 è l'ultima chiamata per chi cerca la wilderness assoluta. Questa regione alla fine del mondo, divisa tra Argentina e Cile, è un paesaggio primordiale di steppe sconfinate, foreste millenarie e ghiacciai che scivolano rumorosamente verso laghi color turchese. Nel 2026, la Patagonia è diventata il santuario della biodiversità globale, con nuovi parchi nazionali che proteggono puma, condor e guanachi. El Calafate è la porta verso il maestoso Perito Moreno, un muro di ghiaccio azzurro che sfida le leggi della fisica, mentre El Chaltén è la capitale mondiale del trekking, dominata dalle guglie impossibili del Fitz Roy e del Cerro Torre. Qui il vento è una presenza costante, un elemento che modella la terra e lo spirito dei viaggiatori. La Patagonia non è solo un viaggio fisico, ma un'esperienza interiore di solitudine e bellezza travolgente, dove il calore di una grigliata (asado) e di un bicchiere di Malbec davanti al fuoco è il miglior premio dopo una giornata passata tra gli elementi più puri del pianeta.",
            keyFeatures: ["Ghiacciai Millenari", "Alpinismo e Trekking Estremo", "Natura Primordiale", "Cultura delle Estancias"],
            landmarks: [
                { name: "Perito Moreno", img: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&w=600", desc: "Il ghiacciaio più famoso del mondo, una massa di ghiaccio in movimento che offre uno spettacolo sonoro e visivo unico." },
                { name: "Monte Fitz Roy", img: "https://images.unsplash.com/photo-1542468301-7170880e666a?auto=format&fit=crop&w=600", desc: "Una montagna leggendaria per gli scalatori di tutto il mondo, famosa per la sua forma a dente di granito." },
                { name: "Torres del Paine", img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=600", desc: "In Cile, le tre torri di granito che svettano sopra laghi e foreste, simbolo della bellezza selvaggia patagonica." }
            ]
        },
        planner: {
            mustSee: ["Perito Moreno Glacier", "Mount Fitz Roy", "Torres del Paine"],
            hiddenGems: ["Laguna de los Tres", "El Chaltén Hidden Valleys", "Cueva de las Manos"],
            rainyDayOptions: ["Glaciarium Museum", "Estancia Dinner", "Hot Chocolate in El Calafate"],
            itineraries: { 3: [{ day: 1, title: "The Blue Ice", morning: "Perito Moreno Trekking", afternoon: "Glacier Boat Tour", evening: "Patagonian Lamb Dinner" }, { day: 2, title: "The Peak", morning: "Fitz Roy Hike start", afternoon: "Laguna Capri", evening: "Craft Beer El Chaltén" }, { day: 3, title: "Wild Steppe", morning: "Estancia Experience", afternoon: "Bird Watching", evening: "Relax by the Fire" }] }
        }
    }
];