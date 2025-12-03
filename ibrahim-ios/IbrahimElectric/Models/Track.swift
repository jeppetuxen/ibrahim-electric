import Foundation

struct Track: Identifiable, Codable {
    let id = UUID()
    let title: String
    let album: String
    let year: String
    let filename: String
    let coverArt: String

    enum CodingKeys: String, CodingKey {
        case title, album, year, filename, coverArt
    }
}

extension Track {
    static let sampleTracks: [Track] = [
        Track(
            title: "ATTACK FROM ABOVE",
            album: "Rumours From Outer Space",
            year: "2014",
            filename: "01+ATTACK+FROM+ABOVE",
            coverArt: "rumours-from-outer-space"
        ),
        Track(
            title: "BIG BOSS",
            album: "Rumours From Outer Space",
            year: "2014",
            filename: "02+BIG+BOSS",
            coverArt: "rumours-from-outer-space"
        ),
        Track(
            title: "PARTYMAN",
            album: "Isle of Men",
            year: "2012",
            filename: "10+Partyman",
            coverArt: "isle-of-men"
        ),
        Track(
            title: "DER ALTE DAS BOOT",
            album: "Royal Air Maroc",
            year: "2010",
            filename: "02+DER+ALTE+DAS+BOOT",
            coverArt: "royal-air-maroc"
        ),
        Track(
            title: "BELZEBUP",
            album: "Brothers of Utopia",
            year: "2008",
            filename: "02+BELZEBUP",
            coverArt: "brothers-of-utopia"
        ),
        Track(
            title: "BORAT",
            album: "Brothers of Utopia",
            year: "2008",
            filename: "10+BORAT",
            coverArt: "brothers-of-utopia"
        ),
        Track(
            title: "FUNKORIFIC",
            album: "Ibrahim Electric Meets Ray Anderson - Again",
            year: "2007",
            filename: "01+Funkorific+1",
            coverArt: "meets-ray-anderson-again"
        ),
        Track(
            title: "ABSINTHE",
            album: "Absinthe",
            year: "2006",
            filename: "07+ABSINTHE",
            coverArt: "absinthe"
        ),
        Track(
            title: "YAMSHALA",
            album: "Absinthe",
            year: "2006",
            filename: "02+YAMSHALA",
            coverArt: "absinthe"
        ),
        Track(
            title: "FELA",
            album: "Ibrahim Electric Meets Ray Anderson",
            year: "2004",
            filename: "07+FELA",
            coverArt: "meets-ray-anderson"
        ),
        Track(
            title: "ENDANGERED BEAT",
            album: "Ibrahim Electric",
            year: "2004",
            filename: "01+ENDANGERED+BEAT",
            coverArt: "ibrahim-electric"
        )
    ]
}
