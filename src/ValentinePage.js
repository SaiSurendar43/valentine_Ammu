import React, { useEffect, useRef, useState } from "react";

const ValentinePage = () => {
  // step 1: ask to be Valentine, step 2: ask about breakup, step 3: pros/cons, step 4: gifts
  const [step, setStep] = useState(1);
  const [trickyPos, setTrickyPos] = useState({ top: "70%", left: "55%" });
  const [currentGift, setCurrentGift] = useState(0); // 0: music, 1: letter, 2: photos
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 420 : false
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 420);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auto-hide confetti after a short celebration
  useEffect(() => {
    if (!showConfetti) return;
    const timer = setTimeout(() => setShowConfetti(false), 2500);
    return () => clearTimeout(timer);
  }, [showConfetti]);

  // When song changes, load & auto-play it smoothly
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.pause();
    audio.load();
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentSong]);

  const moveTrickyButton = () => {
    // Random-ish new position so the forbidden answer keeps running away
    const top = 30 + Math.random() * 50; // 30% - 80%
    const left = 10 + Math.random() * 70; // 10% - 80%
    setTrickyPos({ top: `${top}%`, left: `${left}%` });
  };

  const songs = [
    {
      title: "Nelothi",
      thumbnail: "🎵",
      bg: "/img1.jpg",
      src: "/song1.mp3",
    },
    {
      title: "Ne partha vilizal",
      thumbnail: "🎶",
      bg: "/img2.jpg",
      src: "/song2.mp3",
    },
    {
      title: "Kadhala kadhala",
      thumbnail: "💿",
      bg: "/img4.jpg",
      src: "/song.mp3",
    },
    {
      title: "Oru pathi Kathavu",
      thumbnail: "🎼",
      bg: "/img3.jpg",
      src: "/song3.mp3",
    },

  ];

  const photos = [
    { id: 1, src: "/photo6.jpeg", caption: "Our first date" },
    { id: 2, src: "/photo1.jpeg", caption: "Together forever" },
    { id: 3, src: "/photo3.jpeg", caption: "Valentine's memories" },
    { id: 4, src: "/photo7.jpeg", caption: "Your cutest smile" },
    { id: 5, src: "/photo2.jpeg", caption: "My cute girlfriend" },
    { id: 6, src: "/photo4.jpeg", caption: "Endless love" },
  ];

  return (
    <div style={styles.page}>
      <div style={{ ...styles.card, ...(isMobile ? styles.cardMobile : null) }}>
        <div style={styles.heartsBg} />

        <h1 style={{ ...styles.title, ...(isMobile ? styles.titleMobile : null) }}>
          Happy Valentine&apos;s Day, my Pondati Ammu Kutty ❤️
        </h1>
        <p style={{ ...styles.subtitle, ...(isMobile ? styles.subtitleMobile : null) }}>
          You are my favorite person in the whole world.
        </p>
        {step === 1 && (
          <>
            <p style={{ ...styles.question, ...(isMobile ? styles.questionMobile : null) }}>
              Will you be my Valentine forever?
            </p>

            <div style={{ ...styles.buttonsRow, ...(isMobile ? styles.buttonsRowMobile : null) }}>
              <button
                style={{
                  ...styles.primaryButton,
                  ...(isMobile ? styles.primaryButtonMobile : null),
                }}
                onClick={() => setStep(2)}
              >
                Yes 😘
              </button>

              {/* "No" button that you can NEVER press */}
              <button
                style={{ ...styles.trickyButton, ...trickyPos }}
                onMouseEnter={moveTrickyButton}
                onClick={moveTrickyButton}
              >
                No 🙈
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p style={{ ...styles.question, ...(isMobile ? styles.questionMobile : null) }}>
              Will you ever break up with me?
            </p>

            <div style={{ ...styles.buttonsRow, ...(isMobile ? styles.buttonsRowMobile : null) }}>
              {/* "Yes" button that you can NEVER press */}
              <button
                style={{ ...styles.trickyButton, ...trickyPos }}
                onMouseEnter={moveTrickyButton}
                onClick={moveTrickyButton}
              >
                Yes 😈
              </button>

              <button
                style={{
                  ...styles.primaryButton,
                  ...(isMobile ? styles.primaryButtonMobile : null),
                }}
                onClick={() => setStep(3)}
              >
                No 💖
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{ ...styles.prosConsTitle, ...(isMobile ? styles.prosConsTitleMobile : null) }}>
              Pros & Cons of Being Together 💕
            </h2>
            <div style={{ ...styles.prosConsContainer, ...(isMobile ? styles.prosConsContainerMobile : null) }}>
              <div style={styles.prosSection}>
                <h3 style={styles.prosTitle}>Pros ✨</h3>
                <ul style={styles.prosList}>
                  <li>💖 Endless love and cuddles (24/7 subscription of you)</li>
                  <li>🎁 Surprise gifts, songs and memories made just for you</li>
                  <li>😊 Your beautiful smile brightening every single day</li>
                  <li>👩‍❤️‍👨 Forever best friend, partner in crime and pillow</li>
                  <li>🛡️ Unconditional support, hugs and protection always</li>
                </ul>
              </div>
              <div style={styles.consSection}>
                <h3 style={styles.consTitle}>Cons 😤</h3>
                <ul style={styles.consList}>
                  <li>
                    <span style={styles.angryEmoji}>😡</span> Too much love (is that even possible?)
                  </li>
                  <li>
                    <span style={styles.angryEmoji}>🤬</span> Can&apos;t stop thinking about you
                  </li>
                  <li>
                    <span style={styles.angryEmoji}>😠</span> Heart beats too fast around you
                  </li>
                  <li>
                    <span style={styles.angryEmoji}>💢</span> Smile too much (cheeks hurt!)
                  </li>
                  <li>
                    <span style={styles.angryEmoji}>🔥</span> Can&apos;t imagine life without you
                  </li>
                </ul>
              </div>
            </div>
            <button
              style={{
                ...styles.primaryButton,
                ...(isMobile ? styles.primaryButtonMobile : null),
                marginTop: "24px",
              }}
              onClick={() => {
                setStep(4);
                setShowConfetti(true);
              }}
            >
              Next → See Your Gifts 🎁
            </button>
          </>
        )}

        {step === 4 && (
          <>
            {showConfetti && (
              <div style={styles.confettiOverlay}>
                {Array.from({ length: 50 }).map((_, i) => {
                  const angle = Math.random() * 2 * Math.PI;
                  const distance = 150 + Math.random() * 200;
                  const x = Math.cos(angle) * distance;
                  const y = Math.sin(angle) * distance;

                  return (
                    <span
                      key={i}
                      style={{
                        ...styles.confettiPiece,
                        "--x": x,
                        "--y": y,
                        animationDelay: `${Math.random() * 0.2}s`,
                      }}
                    >
                      {i % 4 === 0
                        ? "🎉"
                        : i % 4 === 1
                          ? "🎊"
                          : i % 4 === 2
                            ? "✨"
                            : "💖"}
                    </span>
                  );
                })}
              </div>
            )}

            <h2 style={{ ...styles.giftTitle, ...(isMobile ? styles.giftTitleMobile : null) }}>
              Your Special Gifts 🎁
            </h2>

            <div style={styles.giftTopBar}>
              {/* Back to Pros & Cons */}
              <button
                style={{
                  ...styles.backButton,
                  ...(isMobile ? styles.backButtonMobile : null),
                }}
                onClick={() => setStep(3)}
              >
                ← Back
              </button>

              {/* Gift Navigation */}
              <div style={styles.giftNav}>
                <button
                  style={{
                    ...styles.giftNavButton,
                    ...(currentGift === 0 ? styles.giftNavButtonActive : {}),
                  }}
                  onClick={() => setCurrentGift(0)}
                >
                  🎵 Music
                </button>
                <button
                  style={{
                    ...styles.giftNavButton,
                    ...(currentGift === 1 ? styles.giftNavButtonActive : {}),
                  }}
                  onClick={() => setCurrentGift(1)}
                >
                  💌 Letter
                </button>
                <button
                  style={{
                    ...styles.giftNavButton,
                    ...(currentGift === 2 ? styles.giftNavButtonActive : {}),
                  }}
                  onClick={() => setCurrentGift(2)}
                >
                  📸 Photos
                </button>
              </div>
            </div>

            {/* Gift 1: Music Player */}
            {currentGift === 0 && (
              <div style={styles.musicGift}>
                <h3 style={styles.musicTitle}>🎵 Our Love Songs</h3>
                <div style={{ ...styles.songsGrid, ...(isMobile ? styles.songsGridMobile : null) }}>
                  {songs.map((song, index) => {
                    const isActive = currentSong === index;
                    return (
                      <div
                        key={index}
                        style={{
                          ...styles.songCard,
                          ...(isActive ? styles.songCardActive : {}),
                          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.35), rgba(0,0,0,0.7)), url(${song.bg})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                        onClick={() => {
                          if (!audioRef.current) {
                            setCurrentSong(index);
                            return;
                          }
                          if (currentSong === index) {
                            // same song: toggle play/pause
                            if (audioRef.current.paused) {
                              audioRef.current.play();
                              setIsPlaying(true);
                            } else {
                              audioRef.current.pause();
                              setIsPlaying(false);
                            }
                          } else {
                            // different song: just change currentSong, effect will handle play
                            setCurrentSong(index);
                          }
                        }}
                      >
                        <div style={styles.songThumbnail}>{song.thumbnail}</div>
                        <div style={styles.songInfo}>
                          <div style={styles.songTitle}>{song.title}</div>
                          <div style={styles.songArtist}>{/* optional artist text removed */}</div>
                        </div>
                        {isActive && (
                          <div
                            style={styles.playIndicator}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!audioRef.current) return;
                              if (audioRef.current.paused) {
                                audioRef.current.play();
                                setIsPlaying(true);
                              } else {
                                audioRef.current.pause();
                                setIsPlaying(false);
                              }
                            }}
                          >
                            {isPlaying ? "⏸️" : "▶️"}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* Simple audio player for the selected song.
                    Put your .mp3 files in the public/songs folder with the names above. */}
                <div style={{ marginTop: "18px" }}>
                  <audio
                    ref={audioRef}
                    controls
                    style={{ width: "100%" }}
                    src={songs[currentSong].src}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                </div>
              </div>
            )}

            {/* Gift 2: Love Letter */}
            {currentGift === 1 && (
              <div style={styles.letterGift}>
                <div style={styles.letterEnvelope}>💌</div>
                <div style={styles.letterContent}>
                  <h3 style={styles.letterTitle}>My Dearest Love 💕</h3>
                  <div style={styles.letterText}>
                    <p style={{ margin: "0 0 12px" }}>
                      My beautiful Pondati Ammu Kutty,
                    </p>
                    <p style={{ margin: "0 0 12px" }}>
                      Every day with you feels like a dream come true. Your smile lights up my world,
                      your laughter is my favorite melody, and your love is the greatest gift I&apos;ve
                      ever received.
                    </p>
                    <p style={{ margin: "0 0 12px" }}>
                      I promise to love you unconditionally, to support you in everything you do, and
                      to be by your side through all of life&apos;s adventures. You are my everything,
                      my forever, my always.
                    </p>
                    <p style={styles.letterSign}>
                      Forever yours,<br />
                      Lovable Surendar😍❤️
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Gift 3: Photos Gallery */}
            {currentGift === 2 && (
              <div style={styles.photosGift}>
                <h3 style={styles.photosTitle}>📸 Our Beautiful Memories</h3>
                <div style={{ ...styles.photosGrid, ...(isMobile ? styles.photosGridMobile : null) }}>
                  {photos.map((photo) => (
                    <button
                      key={photo.id}
                      type="button"
                      style={styles.photoCard}
                      onClick={() => setPreviewPhoto(photo)}
                    >
                      <div style={styles.photoThumbWrapper}>
                        <img
                          src={photo.src}
                          alt={photo.caption}
                          style={styles.photoThumb}
                        />
                      </div>
                      <div style={styles.photoCaption}>{photo.caption}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {previewPhoto && (
          <div
            style={styles.photoPreviewOverlay}
            onClick={() => setPreviewPhoto(null)}
          >
            <div
              style={styles.photoPreviewContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                style={styles.photoPreviewClose}
                onClick={() => setPreviewPhoto(null)}
              >
                ✕
              </button>
              <img
                src={previewPhoto.src}
                alt={previewPhoto.caption}
                style={styles.photoPreviewImage}
              />
              <div style={styles.photoPreviewCaption}>{previewPhoto.caption}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    margin: 0,
    padding: "20px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle at top, #ff9a9e 0, #fecfef 40%, #f6d5f7 100%)",
    fontFamily: "'Poppins', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    position: "relative",
    width: "90%",
    maxWidth: "520px",
    padding: "40px 32px 60px",
    borderRadius: "28px",
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow:
      "0 18px 45px rgba(255, 0, 122, 0.27), 0 0 0 1px rgba(255, 255, 255, 0.6)",
    overflow: "hidden",
    textAlign: "center",
    backdropFilter: "blur(16px)",
  },
  cardMobile: {
    width: "94%",
    padding: "28px 18px 44px",
    borderRadius: "22px",
  },
  heartsBg: {
    position: "absolute",
    inset: "-50%",
    backgroundImage:
      "radial-gradient(circle at 10% 20%, rgba(255, 0, 122, 0.15) 0, transparent 60%)," +
      "radial-gradient(circle at 80% 0%, rgba(255, 77, 79, 0.18) 0, transparent 55%)," +
      "radial-gradient(circle at 50% 100%, rgba(255, 213, 128, 0.18) 0, transparent 55%)",
    opacity: 0.9,
    zIndex: -1,
  },
  confettiOverlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    overflow: "hidden",
    zIndex: 5,
  },
  confettiPiece: {
    position: "absolute",
    top: "50%",
    left: "50%",
    fontSize: "1.5rem",
    animation: "confettiBlast 1.5s ease-out forwards",
  },
  title: {
    fontSize: "1.9rem",
    marginBottom: "8px",
    color: "#ff2d55",
    textShadow: "0 2px 8px rgba(255, 45, 85, 0.28)",
  },
  titleMobile: {
    fontSize: "1.35rem",
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: "0.98rem",
    margin: "0 0 16px",
    color: "#444",
  },
  subtitleMobile: {
    fontSize: "0.92rem",
    margin: "0 0 12px",
  },
  question: {
    fontSize: "1.1rem",
    fontWeight: 600,
    marginBottom: "32px",
    color: "#222",
  },
  questionMobile: {
    fontSize: "1rem",
    marginBottom: "22px",
  },
  buttonsRow: {
    position: "relative",
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  buttonsRowMobile: {
    height: "170px",
    gap: "14px",
  },
  primaryButton: {
    padding: "12px 32px",
    borderRadius: "999px",
    border: "none",
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "#fff",
    background:
      "linear-gradient(135deg, #ff2d55 0%, #ff6b81 35%, #ff9a9e 100%)",
    boxShadow:
      "0 12px 25px rgba(255, 45, 85, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
  },
  primaryButtonMobile: {
    padding: "12px 22px",
    fontSize: "1rem",
    maxWidth: "85%",
  },
  trickyButton: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    padding: "10px 24px",
    borderRadius: "999px",
    border: "none",
    fontSize: "0.98rem",
    fontWeight: 500,
    color: "#ff2d55",
    background: "#ffe6ea",
    cursor: "default",
    transition: "top 0.25s ease-out, left 0.25s ease-out",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.08)",
    userSelect: "none",
  },
  // Pros & Cons Styles
  prosConsTitle: {
    fontSize: "1.5rem",
    marginBottom: "24px",
    color: "#ff2d55",
    fontWeight: 700,
  },
  prosConsTitleMobile: {
    fontSize: "1.2rem",
    marginBottom: "18px",
  },
  prosConsContainer: {
    display: "flex",
    gap: "16px",
    marginBottom: "20px",
    textAlign: "left",
  },
  prosConsContainerMobile: {
    flexDirection: "column",
    gap: "12px",
  },
  prosSection: {
    flex: 1,
    padding: "16px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, rgba(255, 182, 193, 0.3) 0%, rgba(255, 192, 203, 0.2) 100%)",
    border: "2px solid rgba(255, 105, 180, 0.3)",
  },
  consSection: {
    flex: 1,
    padding: "16px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, rgba(255, 200, 200, 0.3) 0%, rgba(255, 180, 180, 0.2) 100%)",
    border: "2px solid rgba(255, 100, 100, 0.3)",
  },
  prosTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#ff1493",
    marginBottom: "12px",
    textAlign: "center",
  },
  consTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#ff4444",
    marginBottom: "12px",
    textAlign: "center",
  },
  prosList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontSize: "0.9rem",
    lineHeight: 1.8,
    color: "#555",
  },
  consList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontSize: "0.9rem",
    lineHeight: 1.8,
    color: "#555",
  },
  angryEmoji: {
    fontSize: "1.2rem",
    marginRight: "6px",
    display: "inline-block",
    animation: "shake 0.5s infinite",
  },
  // Gift Styles
  giftTitle: {
    fontSize: "1.6rem",
    marginBottom: "24px",
    color: "#ff2d55",
    fontWeight: 700,
  },
  giftTopBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  giftTitleMobile: {
    fontSize: "1.3rem",
    marginBottom: "18px",
  },
  backButton: {
    padding: "8px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.85)",
    fontSize: "0.85rem",
    cursor: "pointer",
    color: "#555",
  },
  backButtonMobile: {
    fontSize: "0.8rem",
    padding: "6px 12px",
  },
  giftNav: {
    display: "flex",
    gap: "8px",
    marginBottom: "24px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  giftNavButton: {
    padding: "10px 18px",
    borderRadius: "20px",
    border: "2px solid rgba(255, 45, 85, 0.3)",
    background: "rgba(255, 255, 255, 0.7)",
    color: "#ff2d55",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  giftNavButtonActive: {
    background: "linear-gradient(135deg, #ff2d55 0%, #ff6b81 100%)",
    color: "#fff",
    borderColor: "#ff2d55",
    boxShadow: "0 4px 12px rgba(255, 45, 85, 0.4)",
  },
  // Music Gift Styles
  musicGift: {
    marginTop: "12px",
  },
  musicTitle: {
    fontSize: "1.3rem",
    marginBottom: "20px",
    color: "#ff2d55",
    fontWeight: 600,
  },
  songsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
  },
  songsGridMobile: {
    gridTemplateColumns: "1fr",
    gap: "10px",
  },
  songCard: {
    padding: "18px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#fff",
    position: "relative",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
    border: "1px solid rgba(255,255,255,0.35)",
    overflow: "hidden",
    aspectRatio: "1 / 1",// 🔥 taller like Spotify cover
    display: "flex",
    alignItems: "flex-end",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    imageRendering: "auto",
  },
  songCardActive: {
    transform: "scale(1.04)",
    boxShadow: "0 10px 26px rgba(0, 0, 0, 0.45)",
  },
  songThumbnail: {
    fontSize: "2.4rem",
    marginBottom: "10px",
  },
  songInfo: {
    textAlign: "left",
  },
  songTitle: {
    fontSize: "1.05rem",
    fontWeight: 700,
    marginBottom: "4px",
  },
  songArtist: {
    fontSize: "0.8rem",
    opacity: 0.85,
  },
  playIndicator: {
    position: "absolute",
    top: "8px",
    right: "8px",
    fontSize: "1.3rem",
    background: "rgba(0,0,0,0.45)",
    borderRadius: "999px",
    padding: "4px 8px",
  },
  // Letter Gift Styles
  letterGift: {
    marginTop: "12px",
  },
  letterEnvelope: {
    fontSize: "4rem",
    marginBottom: "16px",
    animation: "float 3s ease-in-out infinite",
  },
  letterContent: {
    background: "linear-gradient(135deg, rgba(255, 243, 246, 0.98) 0%, rgba(255, 230, 240, 0.98) 100%)",
    padding: "24px",
    borderRadius: "16px",
    border: "2px solid rgba(255, 173, 200, 0.5)",
    textAlign: "left",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  letterTitle: {
    fontSize: "1.4rem",
    color: "#ff2d55",
    marginBottom: "16px",
    textAlign: "center",
    fontWeight: 700,
  },
  letterText: {
    fontSize: "0.95rem",
    lineHeight: 1.8,
    color: "#444",
  },
  letterSign: {
    marginTop: "20px",
    fontWeight: 600,
    color: "#ff2d55",
    textAlign: "right",
  },
  // Photos Gift Styles
  photosGift: {
    marginTop: "12px",
  },
  photosTitle: {
    fontSize: "1.3rem",
    marginBottom: "20px",
    color: "#ff2d55",
    fontWeight: 600,
  },
  photosGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  },
  photosGridMobile: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px",
  },
  photoCard: {
    padding: 0,
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.9)",
    border: "2px solid rgba(255, 105, 180, 0.35)",
    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.12)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    cursor: "pointer",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  photoThumbWrapper: {
    width: "100%",
    paddingTop: "70%",
    position: "relative",
    overflow: "hidden",
  },
  photoThumb: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  photoCaption: {
    fontSize: "0.78rem",
    color: "#555",
    fontWeight: 500,
    padding: "6px 8px 8px",
  },
  photoPreviewOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    padding: "16px",
  },
  photoPreviewContent: {
    position: "relative",
    maxWidth: "90vw",
    maxHeight: "90vh",
    background: "rgba(255,255,255,0.98)",
    borderRadius: "18px",
    padding: "14px 14px 18px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  photoPreviewClose: {
    position: "absolute",
    top: "8px",
    right: "10px",
    border: "none",
    background: "rgba(0,0,0,0.1)",
    borderRadius: "999px",
    padding: "2px 8px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  photoPreviewImage: {
    maxWidth: "100%",
    maxHeight: "70vh",
    borderRadius: "12px",
    objectFit: "cover",
  },
  photoPreviewCaption: {
    marginTop: "10px",
    fontSize: "0.9rem",
    color: "#444",
    textAlign: "center",
    fontWeight: 500,
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-3px) rotate(-2deg); }
    75% { transform: translateX(3px) rotate(2deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
 @keyframes confettiBlast {
  0% {
    transform: translate(0, 0) scale(0.6) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: 
      translate(
        calc(var(--x) * 1px),
        calc(var(--y) * 1px)
      )
      rotate(720deg);
    opacity: 0;
  }
}

`;
document.head.appendChild(styleSheet);

export default ValentinePage;
