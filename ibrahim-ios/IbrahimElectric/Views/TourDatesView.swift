import SwiftUI

struct TourDatesView: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                Text("LIVE")
                    .font(.system(size: 36, weight: .bold))
                    .foregroundColor(Color(hex: "FF8C00"))
                    .padding(.horizontal)
                    .padding(.top, 20)

                // Upcoming Shows
                VStack(alignment: .leading, spacing: 12) {
                    Text("Upcoming Shows")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .padding(.horizontal)

                    ForEach(TourDate.upcomingShows) { show in
                        TourDateCard(tourDate: show)
                    }
                }

                // Past Shows 2025
                VStack(alignment: .leading, spacing: 12) {
                    Text("2025")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .padding(.horizontal)
                        .padding(.top)

                    ForEach(TourDate.pastShows2025) { show in
                        TourDateCard(tourDate: show)
                    }
                }
            }
            .padding(.bottom, 100)
        }
        .background(Color.black)
    }
}

struct TourDateCard: View {
    let tourDate: TourDate

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text(tourDate.date)
                    .font(.headline)
                    .foregroundColor(Color(hex: "FF8C00"))

                if tourDate.soldOut {
                    Text("SOLD OUT")
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.red)
                        .cornerRadius(4)
                }
            }

            Text(tourDate.venue)
                .font(.title3)
                .fontWeight(.semibold)
                .foregroundColor(.white)

            Text(tourDate.location)
                .font(.subheadline)
                .foregroundColor(.gray)

            if let ticketLink = tourDate.ticketLink, !tourDate.soldOut {
                Button(action: {
                    if let url = URL(string: ticketLink) {
                        UIApplication.shared.open(url)
                    }
                }) {
                    Text("Buy Tickets")
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundColor(.white)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 8)
                        .background(Color(hex: "FF8C00"))
                        .cornerRadius(8)
                }
                .padding(.top, 4)
            }
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.gray.opacity(0.1))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color(hex: "FF8C00").opacity(0.3), lineWidth: 1)
        )
        .padding(.horizontal)
    }
}
