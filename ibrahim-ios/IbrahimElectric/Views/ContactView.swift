import SwiftUI

struct ContactView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 30) {
                Text("CONTACT")
                    .font(.system(size: 36, weight: .bold))
                    .foregroundColor(Color(hex: "FF8C00"))
                    .padding(.top, 20)

                VStack(spacing: 20) {
                    ContactSection(
                        title: "Booking",
                        items: [
                            ContactItem(label: "Email", value: "booking@ibrahimelectric.com"),
                            ContactItem(label: "Phone", value: "+45 12 34 56 78")
                        ]
                    )

                    ContactSection(
                        title: "Press",
                        items: [
                            ContactItem(label: "Email", value: "press@ibrahimelectric.com")
                        ]
                    )

                    ContactSection(
                        title: "Management",
                        items: [
                            ContactItem(label: "Email", value: "info@ibrahimelectric.com")
                        ]
                    )

                    // Social Media
                    VStack(alignment: .leading, spacing: 16) {
                        Text("Follow Us")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(.white)

                        HStack(spacing: 20) {
                            SocialButton(icon: "globe", url: "http://www.ibrahimelectric.com")
                            SocialButton(icon: "music.note", url: "https://sleeve.fm/artists/ibrahimelectric")
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
                }
                .padding()
            }
            .padding(.bottom, 100)
        }
        .background(Color.black)
    }
}

struct ContactSection: View {
    let title: String
    let items: [ContactItem]

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title)
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.white)

            ForEach(items) { item in
                VStack(alignment: .leading, spacing: 4) {
                    Text(item.label)
                        .font(.caption)
                        .foregroundColor(.gray)

                    Text(item.value)
                        .font(.body)
                        .foregroundColor(Color(hex: "FF8C00"))
                }
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
    }
}

struct ContactItem: Identifiable {
    let id = UUID()
    let label: String
    let value: String
}

struct SocialButton: View {
    let icon: String
    let url: String

    var body: some View {
        Button(action: {
            if let url = URL(string: url) {
                UIApplication.shared.open(url)
            }
        }) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(.white)
                .frame(width: 50, height: 50)
                .background(Color(hex: "FF8C00"))
                .clipShape(Circle())
        }
    }
}
