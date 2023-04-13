import React, { useState } from 'react';
import ReactPlayer from 'react-player';

type Track = {
  id: number;
  title: string;
  artist: string;
  url: string;
};

const AudioPlayer: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<number>(0);

  const tracks: Track[] = [
    {
        id: 1,
        title: 'Resonance',
        artist: 'HOME',
        url: 'public/Home.mp3',
    },
    {
        id: 2,
        title: 'Running in the 90\'s',
        artist: 'Max Coveri',
      url: 'public/Running.mp3',
    },
    // Adicione mais músicas à lista conforme necessário
  ];

  const handleTrackChange = (trackId: number) => {
    setCurrentTrack(trackId);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-purple-900 rounded-lg overflow-hidden">

      <div className="px-4 py-2">
        <h2 className="text-white text-xl font-bold mb-2">{tracks[currentTrack].title}</h2>
        <p className="text-white text-sm">{tracks[currentTrack].artist}</p>
      </div>
      <div className="flex justify-center m-2">
            <ReactPlayer
      
      url={tracks[currentTrack].url}
      controls={true}
      volume={0.8}
      width="100%"
      height="50px"
    />
      </div>
      <ul className="mt-4">
        {tracks.map((track) => (
          <li
            key={track.id}
            className={`flex items-center px-4 py-2 cursor-pointer ${
              currentTrack === track.id - 1 ? 'bg-purple-700' : 'hover:bg-purple-700'
            }`}
            onClick={() => handleTrackChange(track.id - 1)}
          >
            <span
              className={`mr-2 text-white ${
                currentTrack === track.id - 1 ? 'font-semibold' : ''
              }`}
            >
              {track.id}.
            </span>
            <div>
              <p className="text-white text-sm">{track.title}</p>
              <p className="text-gray-400 text-xs">{track.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioPlayer;
