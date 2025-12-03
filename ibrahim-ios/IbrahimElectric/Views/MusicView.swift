import SwiftUI

struct MusicView: View {
    @EnvironmentObject var audioPlayer: AudioPlayerManager

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text("MUSIC")
                    .font(.system(size: 36, weight: .bold))
                    .foregroundColor(Color(hex: "FF8C00"))
                    .padding(.horizontal)
                    .padding(.top, 20)

                Text("Select a Track:")
                    .font(.title3)
                    .foregroundColor(.gray)
                    .padding(.horizontal)

                ForEach(Array(audioPlayer.tracks.enumerated()), id: \.element.id) { index, track in
                    TrackRow(
                        track: track,
                        isPlaying: audioPlayer.currentTrackIndex == index && audioPlayer.isPlaying
                    )
                    .onTapGesture {
                        audioPlayer.playTrack(at: index)
                    }
                }
            }
            .padding(.bottom, 100)
        }
        .background(Color.black)
    }
}

struct TrackRow: View {
    let track: Track
    let isPlaying: Bool

    var body: some View {
        HStack(spacing: 12) {
            // Album cover thumbnail
            Image(track.coverArt)
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: 50, height: 50)
                .cornerRadius(8)

            // Track info
            VStack(alignment: .leading, spacing: 4) {
                Text(track.title)
                    .font(.headline)
                    .foregroundColor(.white)

                Text("\(track.album) (\(track.year))")
                    .font(.caption)
                    .foregroundColor(.gray)
            }

            Spacer()

            // Equalizer indicator
            if isPlaying {
                EqualizerView()
                    .frame(width: 20, height: 20)
            }
        }
        .padding()
        .background(Color.gray.opacity(0.1))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(
                    isPlaying ? Color(hex: "FF8C00") : Color.clear,
                    lineWidth: 2
                )
        )
        .padding(.horizontal)
    }
}

struct EqualizerView: View {
    @State private var animating = false

    var body: some View {
        HStack(spacing: 2) {
            ForEach(0..<4) { index in
                RoundedRectangle(cornerRadius: 2)
                    .fill(
                        LinearGradient(
                            colors: [Color(hex: "FF8C00"), Color(hex: "FFA500")],
                            startPoint: .bottom,
                            endPoint: .top
                        )
                    )
                    .frame(width: 3)
                    .scaleEffect(y: animating ? CGFloat.random(in: 0.3...1.0) : 0.5, anchor: .bottom)
                    .animation(
                        Animation.easeInOut(duration: 0.8)
                            .repeatForever()
                            .delay(Double(index) * 0.2),
                        value: animating
                    )
            }
        }
        .onAppear {
            animating = true
        }
    }
}
