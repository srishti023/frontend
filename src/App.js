import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PomodoroTimer from "./PomodoroTimer";

const YOUTUBE_API_KEY = "AIzaSyDMeNA64-rxFlM-A3FZcnhcgZpWkX02g0U"; // replace this

function App() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [videos, setVideos] = useState([]);
  const [watched, setWatched] = useState(
    JSON.parse(localStorage.getItem("watchedVideos")) || []
  );

  const rewards = [
    { percent: 25, title: "🎉 Beginner Badge" },
    { percent: 50, title: "🚀 Intermediate Badge" },
    { percent: 75, title: "🏅 Advanced Badge" },
    { percent: 100, title: "🏆 Master Badge" },
  ];

  const extractPlaylistId = (url) => {
    const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : "";
  };

  const fetchVideos = async (id) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems`,
        {
          params: {
            part: "snippet",
            playlistId: id,
            maxResults: 100,
            key: YOUTUBE_API_KEY,
          },
        }
      );
      const items = response.data.items;
      setVideos(items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = extractPlaylistId(playlistUrl);
    setPlaylistId(id);
    fetchVideos(id);
  };

  const toggleWatched = (videoId) => {
    let updatedWatched;
    if (watched.includes(videoId)) {
      updatedWatched = watched.filter((id) => id !== videoId);
    } else {
      updatedWatched = [...watched, videoId];
    }
    setWatched(updatedWatched);
    localStorage.setItem("watchedVideos", JSON.stringify(updatedWatched));
  };

  const progress = (watched.length / videos.length) * 100 || 0;

  const getUnlockedBadges = () => {
    return rewards.filter((r) => progress >= r.percent).map((r) => r.title);
  };

  return (
    <div className="container">
      <h1>📺 PlayQuest</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
          placeholder="Paste YouTube Playlist Link"
        />
        <button type="submit">Fetch Videos</button>
      </form>

      <div className="progress-wrapper">
        <div className="progress-text">
          Progress: {Math.round(progress)}%
        </div>
        <div className="progress">
          <div className="bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <PomodoroTimer />

      <div className="rewards">
        <h3>Unlocked Rewards:</h3>
        {getUnlockedBadges().length === 0 ? (
          <p>No rewards unlocked yet. Keep going! 🚀</p>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "nowrap",
              overflowX: "auto",
              padding: "10px 0",
            }}
          >
            {getUnlockedBadges().map((reward, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {reward}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="video-grid">
        {videos.map((item) => {
          const videoId = item.snippet.resourceId.videoId;
          return (
            <div key={videoId} className="video-card">
              <img
                src={item.snippet.thumbnails.medium.url}
                alt={item.snippet.title}
              />
              <h4>{item.snippet.title}</h4>
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noreferrer"
              >
                Watch
              </a>
              <button
                onClick={() => toggleWatched(videoId)}
                className={watched.includes(videoId) ? "watched" : ""}
              >
                {watched.includes(videoId)
                  ? "✅ Watched"
                  : "Mark as Watched"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;