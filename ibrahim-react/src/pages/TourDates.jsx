import { useEffect } from 'react';

const TourDates = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-black page-transition-enter">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-heading text-center mb-16 tracking-wide text-accent-orange">
          LIVE
        </h1>

        {/* Upcoming Shows */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 pb-4 border-b-2 border-accent-orange">Upcoming Shows</h2>
          <div className="space-y-6">
            <TourDate
              date="December 11, 2025"
              venue="Hotel Cecil"
              location="Copenhagen, Denmark"
              ticketLink="https://www.billetlugen.dk/noapp/artist/ibrahim-electric/?affiliate=HC9"
              soldOut={true}
            />
            <TourDate
              date="December 10, 2025"
              venue="Hotel Cecil"
              location="Copenhagen, Denmark"
              ticketLink="https://www.billetlugen.dk/event/ibrahim-electric-hotel-cecil-20746180/?affiliate=HC9"
            />
          </div>
        </div>

        {/* Past Shows - 2025 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 pb-4 border-b-2 border-accent-orange">2025</h2>
          <div className="space-y-6">
            <TourDate
              date="July 8, 2025"
              venue="Prague Castle"
              location="Prague, Czechia"
            />
            <TourDate
              date="July 5, 2025"
              venue="Bremen Teater"
              location="Copenhagen, Denmark"
            />
            <TourDate
              date="June 26, 2025"
              venue="Festival Lent"
              location="Maribor, Slovenia"
            />
            <TourDate
              date="April 25, 2025"
              venue="JIVE"
              location="Vejle, Denmark"
            />
            <TourDate
              date="March 14, 2025"
              venue="Walthers Musikcafe"
              location="Skanderborg, Denmark"
            />
            <TourDate
              date="February 5, 2025"
              venue="Huset i Magstræde"
              location="Copenhagen, Denmark"
            />
          </div>
        </div>
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
              Get Tickets
            </a>
          )}
          {soldOut && (
            <span className="bg-gray-700 text-gray-500 px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap cursor-not-allowed">
              SOLD OUT
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourDates;
