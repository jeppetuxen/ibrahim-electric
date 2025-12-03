import SwiftUI

struct HomeView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Header image
                ZStack {
                    Image("header")
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(height: 300)
                        .clipped()

                    LinearGradient(
                        colors: [.black.opacity(0.7), .clear, .black.opacity(0.7)],
                        startPoint: .top,
                        endPoint: .bottom
                    )

                    VStack(spacing: 20) {
                        Text("IBRAHIM ELECTRIC")
                            .font(.system(size: 32, weight: .bold, design: .rounded))
                            .foregroundColor(Color(hex: "f75d59"))

                        Text("Better Than Viagra")
                            .font(.title3)
                            .italic()
                            .foregroundColor(.white.opacity(0.9))
                    }
                }
                .frame(height: 300)

                // Quotes section
                VStack(alignment: .leading, spacing: 24) {
                    QuoteCard(
                        quote: "BETTER THAN VIAGRA",
                        source: "Information, DK"
                    )

                    QuoteCard(
                        quote: "BIG, INTERSTELLAR FUN",
                        source: "Downbeat Magazine, USA"
                    )

                    QuoteCard(
                        quote: "FASTER INTO YOUR BLOOD THAN A GANGES PARASITE",
                        source: "NYC Jazz Record, USA"
                    )

                    QuoteCard(
                        quote: "CAN YOU SAY 'INVENTIVE'? I KNOW THESE GUYS CAN",
                        source: "Jazz Times, Canada"
                    )
                }
                .padding()

                // New Release Section
                VStack(spacing: 20) {
                    Text("NEW RELEASE")
                        .font(.system(size: 36, weight: .bold))
                        .foregroundColor(Color(hex: "FF8C00"))

                    Image("fast-fire-cover")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(maxWidth: 300)
                        .cornerRadius(12)
                        .shadow(radius: 10)

                    Text("FAST FIRE")
                        .font(.system(size: 28, weight: .bold))
                        .foregroundColor(.white)

                    Text("Available Soon")
                        .font(.title3)
                        .foregroundColor(.gray)

                    Text("Ibrahim Electric returns with their most explosive album yet. FAST FIRE delivers the trio's signature blend of afrobeat, jazz, and raw energy.")
                        .font(.body)
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)

                    Button(action: {
                        if let url = URL(string: "https://sleeve.fm/artists/ibrahimelectric") {
                            UIApplication.shared.open(url)
                        }
                    }) {
                        Text("Pre-listen Now")
                            .font(.headline)
                            .foregroundColor(.white)
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(
                                LinearGradient(
                                    colors: [Color(hex: "FF8C00"), Color(hex: "FFA500")],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                            .cornerRadius(25)
                    }
                    .padding(.horizontal)
                }
                .padding()
                .padding(.bottom, 100)
            }
        }
        .background(Color.black)
    }
}

struct QuoteCard: View {
    let quote: String
    let source: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("\"\(quote)\"")
                .font(.title3)
                .fontWeight(.semibold)
                .foregroundColor(.white)

            Text("— \(source)")
                .font(.caption)
                .foregroundColor(Color(hex: "FF8C00"))
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.gray.opacity(0.1))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color(hex: "FF8C00").opacity(0.3), lineWidth: 1)
        )
    }
}
