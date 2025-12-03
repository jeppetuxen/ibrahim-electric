import { useEffect } from 'react';
import { getUpcomingTours, getPastToursByYear, formatTourDate } from '../data/tours';
import { MESSAGES } from '../data/constants';

const TourDates = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const upcomingTours = getUpcomingTours();
  const pastToursByYear = getPastToursByYear();

  return (
    <div className="pt-24 pb-20 min-h-screen bg-black page-transition-enter">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-heading text-center mb-16 tracking-wide text-accent-orange">
          LIVE
        </h1>

        {/* Upcoming Shows */}
        {upcomingTours.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 pb-4 border-b-2 border-accent-orange">Upcoming Shows</h2>
            <div className="space-y-6">
              {upcomingTours.map(tour => (
                <TourDate
                  key={tour.id}
                  date={formatTourDate(tour.date)}
                  venue={tour.venue}
                  location={tour.location}
                  ticketLink={tour.ticketLink}
                  soldOut={tour.soldOut}
                />
              ))}
            </div>
          </div>
        )}

        {/* Past Shows - Grouped by Year */}
        {Object.entries(pastToursByYear).map(([year, tours]) => (
          <div key={year} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 pb-4 border-b-2 border-accent-orange">{year}</h2>
            <div className="space-y-6">
              {tours.map(tour => (
                <TourDate
                  key={tour.id}
                  date={formatTourDate(tour.date)}
                  venue={tour.venue}
                  location={tour.location}
                  ticketLink={tour.ticketLink}
                  soldOut={tour.soldOut}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TourDate = ({ date, venue, location, ticketLink, soldOut = false }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-accent-orange transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-heading text-accent-orange mb-2">{venue}</h3>
          <p className="text-gray-400">{location}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-lg text-gray-300">{date}</div>
          {ticketLink && !soldOut && (
            <a
              href={ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-accent-orange to-accent-amber text-white px-6 py-2 rounded-full text-sm font-bold btn-modern transition-all duration-300 hover:scale-110 hover:shadow-2xl whitespace-nowrap"
            >
              {MESSAGES.GET_TICKETS}
            </a>
          )}
          {soldOut && (
            <span className="bg-gray-700 text-gray-500 px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap cursor-not-allowed">
              {MESSAGES.SOLD_OUT}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourDates;
