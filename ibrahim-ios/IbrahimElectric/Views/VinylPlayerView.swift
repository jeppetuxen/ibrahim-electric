import SwiftUI

struct VinylPlayerView: View {
    @EnvironmentObject var audioPlayer: AudioPlayerManager
    @State private var rotation: Double = 0

    var body: some View {
        VStack {
            if audioPlayer.isPlayerExpanded {
                expandedPlayer
                    .transition(.move(edge: .bottom).combined(with: .opacity))
            } else {
                collapsedPlayer
                    .transition(.scale.combined(with: .opacity))
            }
        }
        .animation(.spring(response: 0.4, dampingFraction: 0.8), value: audioPlayer.isPlayerExpanded)
    }

    private var collapsedPlayer: some View {
        HStack {
            Spacer()
            Button(action: {
                withAnimation {
                    audioPlayer.isPlayerExpanded = true
                }
            }) {
                ZStack {
                    // Vinyl record
                    VinylRecord(rotation: $rotation, isPlaying: audioPlayer.isPlaying)
                        .frame(width: 70, height: 70)

                    // Album cover in center
                    if let track = audioPlayer.currentTrack {
                        Image(track.coverArt)
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: 35, height: 35)
                            .clipShape(Circle())
                    }
                }
            }
            .padding()
        }
    }

    private var expandedPlayer: some View {
        VStack(spacing: 0) {
            HStack(spacing: 16) {
                // Vinyl record (clickable to collapse)
                Button(action: {
                    withAnimation {
                        audioPlayer.isPlayerExpanded = false
                    }
                }) {
                    ZStack {
                        VinylRecord(rotation: $rotation, isPlaying: audioPlayer.isPlaying)
                            .frame(width: 70, height: 70)

                        if let track = audioPlayer.currentTrack {
                            Image(track.coverArt)
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(width: 35, height: 35)
                                .clipShape(Circle())
                        }
                    }
                }

                // Track info and controls
                VStack(spacing: 12) {
                    if let track = audioPlayer.currentTrack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text(track.title)
                                .font(.headline)
                                .foregroundColor(.white)
                                .lineLimit(1)

                            Text("\(track.album) (\(track.year))")
                                .font(.caption)
                                .foregroundColor(.gray)
                                .lineLimit(1)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }

                    // Progress bar
                    Slider(
                        value: Binding(
                            get: { audioPlayer.currentTime },
                            set: { audioPlayer.seek(to: $0) }
                        ),
                        in: 0...max(audioPlayer.duration, 1)
                    )
                    .accentColor(Color(hex: "FF8C00"))

                    // Playback controls
                    HStack(spacing: 20) {
                        Button(action: audioPlayer.playPrevious) {
                            Image(systemName: "backward.fill")
                                .font(.title3)
                                .foregroundColor(.white)
                        }

                        Button(action: audioPlayer.togglePlayPause) {
                            Image(systemName: audioPlayer.isPlaying ? "pause.circle.fill" : "play.circle.fill")
                                .font(.title)
                                .foregroundColor(Color(hex: "FF8C00"))
                        }

                        Button(action: audioPlayer.playNext) {
                            Image(systemName: "forward.fill")
                                .font(.title3)
                                .foregroundColor(.white)
                        }
                    }
                }
                .padding(.trailing)
            }
            .padding()
            .background(
                Color.black.opacity(0.95)
                    .overlay(
                        RoundedRectangle(cornerRadius: 0)
                            .stroke(Color(hex: "FF8C00").opacity(0.3), lineWidth: 1)
                    )
            )
        }
    }
}

struct VinylRecord: View {
    @Binding var rotation: Double
    let isPlaying: Bool

    var body: some View {
        ZStack {
            // Main vinyl disk
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Color(white: 0.1),
                            Color(white: 0.15),
                            Color(white: 0.1)
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: 35
                    )
                )
                .overlay(
                    Circle()
                        .stroke(Color(white: 0.05), lineWidth: 2)
                )

            // Grooves
            ForEach(0..<5) { i in
                Circle()
                    .stroke(Color(white: 0.12), lineWidth: 0.5)
                    .frame(width: CGFloat(60 - i * 10), height: CGFloat(60 - i * 10))
            }

            // Center label
            Circle()
                .fill(Color(hex: "FF8C00"))
                .frame(width: 20, height: 20)

            // Center hole
            Circle()
                .fill(Color(white: 0.1))
                .frame(width: 8, height: 8)

            // Shine effect
            Circle()
                .fill(
                    LinearGradient(
                        colors: [
                            .white.opacity(0.1),
                            .clear
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
        }
        .rotationEffect(.degrees(rotation))
        .onChange(of: isPlaying) { _, playing in
            if playing {
                withAnimation(.linear(duration: 3).repeatForever(autoreverses: false)) {
                    rotation = 360
                }
            }
        }
        .onAppear {
            if isPlaying {
                withAnimation(.linear(duration: 3).repeatForever(autoreverses: false)) {
                    rotation = 360
                }
            }
        }
    }
}
