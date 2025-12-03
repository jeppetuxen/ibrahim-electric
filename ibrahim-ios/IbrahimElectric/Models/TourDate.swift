import Foundation

struct TourDate: Identifiable {
    let id = UUID()
    let date: String
    let venue: String
    let location: String
    let ticketLink: String?
    let soldOut: Bool

    init(date: String, venue: String, location: String, ticketLink: String? = nil, soldOut: Bool = false) {
        self.date = date
        self.venue = venue
        self.location = location
        self.ticketLink = ticketLink
        self.soldOut = soldOut
    }
}

extension TourDate {
    static let upcomingShows: [TourDate] = [
        TourDate(
            date: "December 11, 2025",
            venue: "Hotel Cecil",
            location: "Copenhagen, Denmark",
            ticketLink: "https://www.billetlugen.dk/noapp/artist/ibrahim-electric/?affiliate=HC9",
            soldOut: true
        ),
        TourDate(
            date: "December 10, 2025",
            venue: "Hotel Cecil",
            location: "Copenhagen, Denmark",
            ticketLink: "https://www.billetlugen.dk/event/ibrahim-electric-hotel-cecil-20746180/?affiliate=HC9"
        )
    ]

    static let pastShows2025: [TourDate] = [
        TourDate(date: "July 8, 2025", venue: "Prague Castle", location: "Prague, Czechia"),
        TourDate(date: "July 5, 2025", venue: "Bremen Teater", location: "Copenhagen, Denmark"),
        TourDate(date: "June 26, 2025", venue: "Festival Lent", location: "Maribor, Slovenia"),
        TourDate(date: "April 25, 2025", venue: "JIVE", location: "Vejle, Denmark"),
        TourDate(date: "March 14, 2025", venue: "Walthers Musikcafe", location: "Skanderborg, Denmark"),
        TourDate(date: "February 5, 2025", venue: "Huset i Magstræde", location: "Copenhagen, Denmark")
    ]
}
