import Foundation
import AVFoundation
import Combine

class AudioPlayerManager: NSObject, ObservableObject {
    @Published var currentTrack: Track?
    @Published var currentTrackIndex: Int = 0
    @Published var isPlaying: Bool = false
    @Published var currentTime: Double = 0
    @Published var duration: Double = 0
    @Published var isPlayerExpanded: Bool = false

    private var player: AVPlayer?
    private var timeObserver: Any?
    let tracks = Track.sampleTracks

    override init() {
        super.init()
        setupAudioSession()
    }

    private func setupAudioSession() {
        do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
            try AVAudioSession.sharedInstance().setActive(true)
        } catch {
            print("Failed to set up audio session: \(error)")
        }
    }

    func playTrack(at index: Int) {
        guard index >= 0 && index < tracks.count else { return }

        currentTrackIndex = index
        currentTrack = tracks[index]

        // Load audio file from bundle
        if let audioURL = Bundle.main.url(forResource: tracks[index].filename, withExtension: "mp3") {
            let playerItem = AVPlayerItem(url: audioURL)
            player = AVPlayer(playerItem: playerItem)

            // Add time observer
            let interval = CMTime(seconds: 0.5, preferredTimescale: CMTimeScale(NSEC_PER_SEC))
            timeObserver = player?.addPeriodicTimeObserver(forInterval: interval, queue: .main) { [weak self] time in
                self?.currentTime = time.seconds
            }

            // Observe duration
            NotificationCenter.default.addObserver(
                self,
                selector: #selector(playerItemDidFinishPlaying),
                name: .AVPlayerItemDidPlayToEndTime,
                object: playerItem
            )

            // Get duration when ready
            player?.currentItem?.asset.loadValuesAsynchronously(forKeys: ["duration"]) { [weak self] in
                DispatchQueue.main.async {
                    if let duration = self?.player?.currentItem?.asset.duration {
                        self?.duration = CMTimeGetSeconds(duration)
                    }
                }
            }

            player?.play()
            isPlaying = true
            isPlayerExpanded = true
        }
    }

    func togglePlayPause() {
        guard let player = player else { return }

        if isPlaying {
            player.pause()
            isPlaying = false
        } else {
            player.play()
            isPlaying = true
        }
    }

    func playNext() {
        let nextIndex = (currentTrackIndex + 1) % tracks.count
        playTrack(at: nextIndex)
    }

    func playPrevious() {
        let previousIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.count - 1
        playTrack(at: previousIndex)
    }

    func seek(to time: Double) {
        let cmTime = CMTime(seconds: time, preferredTimescale: CMTimeScale(NSEC_PER_SEC))
        player?.seek(to: cmTime)
    }

    @objc private func playerItemDidFinishPlaying() {
        playNext()
    }

    deinit {
        if let observer = timeObserver {
            player?.removeTimeObserver(observer)
        }
        NotificationCenter.default.removeObserver(self)
    }
}
