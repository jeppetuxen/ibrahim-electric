/**
 * Tour dates and live show information
 */

export const tourDates = [
  {
    id: 'cecil-dec11-2025',
    date: new Date('2025-12-11'),
    venue: 'Hotel Cecil',
    location: 'Copenhagen, Denmark',
    ticketLink: 'https://www.billetlugen.dk/noapp/artist/ibrahim-electric/?affiliate=HC9',
    soldOut: true,
    status: 'upcoming'
  },
  {
    id: 'cecil-dec10-2025',
    date: new Date('2025-12-10'),
    venue: 'Hotel Cecil',
    location: 'Copenhagen, Denmark',
    ticketLink: 'https://www.billetlugen.dk/event/ibrahim-electric-hotel-cecil-20746180/?affiliate=HC9',
    soldOut: false,
    status: 'upcoming'
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
