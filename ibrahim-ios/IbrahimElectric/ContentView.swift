import SwiftUI

struct ContentView: View {
    @EnvironmentObject var audioPlayer: AudioPlayerManager
    @State private var selectedTab = 0

    var body: some View {
        ZStack(alignment: .bottom) {
            TabView(selection: $selectedTab) {
                HomeView()
                    .tabItem {
                        Label("Home", systemImage: "house.fill")
                    }
                    .tag(0)

                MusicView()
                    .tabItem {
                        Label("Music", systemImage: "music.note.list")
                    }
                    .tag(1)

                TourDatesView()
                    .tabItem {
                        Label("Live", systemImage: "calendar")
                    }
                    .tag(2)

                ContactView()
                    .tabItem {
                        Label("Contact", systemImage: "envelope.fill")
                    }
                    .tag(3)
            }
            .accentColor(Color(hex: "FF8C00"))

            // Sticky vinyl player
            if audioPlayer.currentTrack != nil {
                VinylPlayerView()
                    .padding(.bottom, audioPlayer.isPlayerExpanded ? 0 : 70)
            }
        }
    }
}
