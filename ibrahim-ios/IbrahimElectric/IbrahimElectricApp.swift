import SwiftUI

@main
struct IbrahimElectricApp: App {
    @StateObject private var audioPlayer = AudioPlayerManager()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(audioPlayer)
                .preferredColorScheme(.dark)
        }
    }
}
