/**
 * Tour dates and live show information
 */

export const tourDates = [
  // 2026 upcoming shows
  {
    id: 'tobaksgaarden-mar27-2026',
    date: new Date('2026-03-27'),
    venue: 'Tobaksgaarden',
    location: 'Assens, Denmark',
    ticketLink: 'https://tobaksgaarden.dk/program/ibrahim-electric/',
    soldOut: false,
    status: 'upcoming'
  },
  {
    id: 'radar-apr18-2026',
    date: new Date('2026-04-18'),
    venue: 'Radar',
    location: 'Aarhus, Denmark',
    ticketLink: 'https://radarlive.dk/kalender/2026/april/ibrahim-electric/?ytroute=/arrangementer/54266/ibrahim-electric/',
    soldOut: false,
    status: 'upcoming'
  },
  {
    id: 'tapperiet-apr23-2026',
    date: new Date('2026-04-23'),
    venue: 'Tapperiet',
    location: 'Køge, Denmark',
    ticketLink: 'https://tapperiet.nu/koncerter/1188-ibrahim-electric-2026',
    soldOut: false,
    status: 'upcoming'
  },
  {
    id: 'dexter-apr24-2026',
    date: new Date('2026-04-24'),
    venue: 'Dexter',
    location: 'Odense, Denmark',
    ticketLink: 'https://dexter.dk/event/ibrahim-electric/',
    soldOut: false,
    status: 'upcoming'
  },
  {
    id: 'studhus-may2-2026',
    date: new Date('2026-05-02'),
    venue: 'Studenterhuset',
    location: 'Aalborg, Denmark',
    ticketLink: 'https://studenterhuset.dk/ibrahim-electric/',
    soldOut: false,
    status: 'upcoming'
  },
  {
    id: 'svendborg-jazz-jun12-2026',
    date: new Date('2026-06-12'),
    venue: 'Svendborg Jazz',
    location: 'Svendborg, Denmark',
    ticketLink: null,
    soldOut: false,
    status: 'upcoming'
  },
  {
    id: 'trio-kolding-jun13-2026',
    date: new Date('2026-06-13'),
    venue: 'Trio',
    location: 'Kolding, Denmark',
    ticketLink: null,
    soldOut: false,
    status: 'upcoming'
  },
  {
    id: 'pakhuset-jul4-2026',
    date: new Date('2026-07-04'),
    venue: 'Pakhuset',
    location: 'Nykøbing Sjælland, Denmark',
    ticketLink: 'https://odsbib.dk/pakhuset-nykobing-sj/arrangementer/musik/ibrahim-electric',
    soldOut: false,
    status: 'upcoming'
  },
  {
    id: 'republique-jul10-2026',
    date: new Date('2026-07-10'),
    venue: 'Theatre Republique',
    location: 'Copenhagen, Denmark',
    ticketLink: 'https://www.republique.dk/forestillinger/ibrahim-electric',
    soldOut: false,
    status: 'upcoming',
    festival: 'Copenhagen Jazz Festival'
  },
  {
    id: 'republique-jul11-2026',
    date: new Date('2026-07-11'),
    venue: 'Theatre Republique',
    location: 'Copenhagen, Denmark',
    ticketLink: 'https://www.republique.dk/forestillinger/ibrahim-electric',
    soldOut: false,
    status: 'upcoming',
    festival: 'Copenhagen Jazz Festival'
  },
  {
    id: 'avernax-aug8-2026',
    date: new Date('2026-08-08'),
    venue: 'Avernax Festival',
    location: 'Avernakø, Denmark',
    ticketLink: 'https://avernax.dk/2025/12/22/ibrahim-electric-til-avernax-plakaten/',
    soldOut: false,
    status: 'upcoming'
  },
  {
    id: 'gjethuset-sep24-2026',
    date: new Date('2026-09-24'),
    venue: 'Gjethuset',
    location: 'Frederiksværk, Denmark',
    ticketLink: null,
    soldOut: false,
    status: 'upcoming'
  },
  {
    id: 'flensborg-nov12-2026',
    date: new Date('2026-11-12'),
    venue: 'Flensborg',
    location: 'Flensborg, Germany',
    ticketLink: null,
    soldOut: false,
    status: 'upcoming'
  },
  // 2025 past shows
  {
    id: 'cecil-dec11-2025',
    date: new Date('2025-12-11'),
    venue: 'Hotel Cecil',
    location: 'Copenhagen, Denmark',
    ticketLink: null,
    soldOut: true,
    status: 'past'
  },
  {
    id: 'cecil-dec10-2025',
    date: new Date('2025-12-10'),
    venue: 'Hotel Cecil',
    location: 'Copenhagen, Denmark',
    ticketLink: null,
    soldOut: false,
    status: 'past'
  },
  {
    id: 'prague-july8-2025',
    date: new Date('2025-07-08'),
    venue: 'Prague Castle',
    location: 'Prague, Czechia',
    ticketLink: null,
    soldOut: false,
    status: 'past'
  },
  {
    id: 'bremen-july5-2025',
    date: new Date('2025-07-05'),
    venue: 'Bremen Teater',
    location: 'Copenhagen, Denmark',
    ticketLink: null,
    soldOut: false,
    status: 'past'
  },
  {
    id: 'lent-june26-2025',
    date: new Date('2025-06-26'),
    venue: 'Festival Lent',
    location: 'Maribor, Slovenia',
    ticketLink: null,
    soldOut: false,
    status: 'past'
  },
  {
    id: 'jive-april25-2025',
    date: new Date('2025-04-25'),
    venue: 'JIVE',
    location: 'Vejle, Denmark',
    ticketLink: null,
    soldOut: false,
    status: 'past'
  },
  {
    id: 'walthers-march14-2025',
    date: new Date('2025-03-14'),
    venue: 'Walthers Musikcafe',
    location: 'Skanderborg, Denmark',
    ticketLink: null,
    soldOut: false,
    status: 'past'
  }
];

/**
 * Get upcoming tour dates (future dates only)
 */
export const getUpcomingTours = () => {
  const now = new Date();
  return tourDates
    .filter(tour => tour.date >= now)
    .sort((a, b) => a.date - b.date);
};

/**
 * Get past tour dates grouped by year
 */
export const getPastToursByYear = () => {
  const now = new Date();
  const pastTours = tourDates
    .filter(tour => tour.date < now)
    .sort((a, b) => b.date - a.date); // Most recent first

  // Group by year
  const grouped = {};
  pastTours.forEach(tour => {
    const year = tour.date.getFullYear();
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(tour);
  });

  return grouped;
};

/**
 * Format tour date for display
 */
export const formatTourDate = (date) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};
