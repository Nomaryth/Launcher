"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { musicData } from "@/lib/musicData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
  Move,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import "./MusicPlayer.css";
import WeatherClockWidget from "./WeatherClockWidget";
import type { CharacterTransform } from "@/app/page";

const MusicPlayerPopoverContent = ({ isPlaying, onPlayPause }: { isPlaying: boolean, onPlayPause: () => void }) => {
  const [volume, setVolume] = useState(50);

  return (
    <div className="music-player-popover">
      <div className="music-player-popover-content">
        <div className="music-info-section">
          <div className="album-art-large-wrapper">
            <Image
              src={musicData.albumArt}
              alt="Album Art"
              fill
              className="album-art-large"
              unoptimized
            />
          </div>
          <div className="track-details">
            <h2 className="track-title">{musicData.title}</h2>
            <p className="track-artist">{musicData.artist}</p>
          </div>
        </div>
        
        <div className="progress-section">
          <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
          <div className="time-display">
            <span>{musicData.currentTime}</span>
            <span>{musicData.duration}</span>
          </div>
        </div>

        <div className="controls-section">
          <button className="control-button">
            <SkipBack size={20} />
          </button>
          <button
            onClick={onPlayPause}
            className="control-button play-pause-button"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button className="control-button">
            <SkipForward size={20} />
          </button>
        </div>

        <div className="volume-section">
          <Volume2 size={18} className="text-white/70"/>
          <Slider 
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
            max={100} 
            step={1} 
            className="w-24"
          />
        </div>
      </div>
    </div>
  )
};

const ServerStatus = () => (
  <div className="server-status-widget">
    <div className="server-status-header">
      <span className="server-status-title">NODE: 03 ONLINE</span>
      <div className="server-ping">
        <div className="online-indicator"></div>
        <span>24ms</span>
      </div>
    </div>
    <div className="server-utilization-bar">
        <div className="server-utilization-fill" style={{ width: '30%' }}></div>
    </div>
  </div>
);


const QuickShortcuts = ({ 
  onCommandPaletteToggle,
  characterTransform,
  onCharacterTransformChange,
  onSave
}: { 
  onCommandPaletteToggle: () => void;
  characterTransform: CharacterTransform;
  onCharacterTransformChange: (newTransform: CharacterTransform) => void;
  onSave: (transform: CharacterTransform) => void;
}) => (
    <div className="quick-shortcuts">
        <Popover onOpenChange={(isOpen) => { if(!isOpen) { onSave(characterTransform) } }}>
          <PopoverTrigger asChild>
            <button className="shortcut-key" title="Character Controls">
              <Move className="h-4 w-4 text-white/80"/>
            </button>
          </PopoverTrigger>
          <PopoverContent side="top" align="center" className="popover-container">
            <div className="character-control-popover">
              <div className="grid gap-4">
                <div className="control-item">
                  <div className="control-label-wrapper">
                    <label className="control-label">Posição X</label>
                    <span className="control-value">{characterTransform.x}px</span>
                  </div>
                  <Slider
                    value={[characterTransform.x]}
                    onValueChange={([val]) => onCharacterTransformChange({ ...characterTransform, x: val })}
                    max={500}
                    min={-500}
                    step={1}
                    className="control-slider"
                  />
                </div>
                <div className="control-item">
                  <div className="control-label-wrapper">
                    <label className="control-label">Posição Y</label>
                    <span className="control-value">{characterTransform.y}px</span>
                  </div>
                  <Slider
                    value={[characterTransform.y]}
                    onValueChange={([val]) => onCharacterTransformChange({ ...characterTransform, y: val })}
                    max={100}
                    min={-200}
                    step={1}
                    className="control-slider"
                  />
                </div>
                <div className="control-item">
                  <div className="control-label-wrapper">
                    <label className="control-label">Escala</label>
                    <span className="control-value">{characterTransform.scale}%</span>
                  </div>
                  <Slider
                    value={[characterTransform.scale]}
                    onValueChange={([val]) => onCharacterTransformChange({ ...characterTransform, scale: val })}
                    max={150}
                    min={50}
                    step={1}
                    className="control-slider"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <button onClick={onCommandPaletteToggle} className="shortcut-key" title="Command Palette (Ctrl+K)">
          <span className="text-white/80">⌘</span>
        </button>
    </div>
);

interface MusicPlayerProps {
  onCommandPaletteToggle: () => void;
  characterTransform: CharacterTransform;
  onCharacterTransformChange: (newTransform: CharacterTransform) => void;
  onSave: (transform: CharacterTransform) => void;
}


const MusicPlayer = ({ 
  onCommandPaletteToggle,
  characterTransform,
  onCharacterTransformChange,
  onSave
}: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <motion.div
      className="music-player-bar"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
    >
      <div className="music-player-content">
        <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <div className="track-info-trigger group">
                  <div className="album-art-wrapper group-hover:scale-110">
                    <Image
                      src="https://i.ibb.co/6RrL3dsh/pngwing-com.png"
                      alt="Vinyl Record"
                      width={48}
                      height={48}
                      className={`${isPlaying ? 'spinning' : ''}`}
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="track-info-title group-hover:text-primary">
                      {musicData.title}
                    </h3>
                    <p className="track-info-artist">
                      {musicData.artist}
                    </p>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                align="start"
                className="popover-container"
              >
                <MusicPlayerPopoverContent 
                  isPlaying={isPlaying} 
                  onPlayPause={() => setIsPlaying(!isPlaying)}
                />
              </PopoverContent>
            </Popover>
        </div>
        
        <div className="center-info-wrapper">
            <QuickShortcuts 
              onCommandPaletteToggle={onCommandPaletteToggle}
              characterTransform={characterTransform}
              onCharacterTransformChange={onCharacterTransformChange}
              onSave={onSave}
            />
            <ServerStatus />
        </div>

        <div className="right-info-wrapper">
          <WeatherClockWidget />
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
