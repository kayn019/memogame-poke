'use client'
import Image from "next/image";
import { useState } from "react";
import TitleScreen from "./components/TitleScreen";
import Game from "./components/Game";

export default function Home() {
  const [mode, setMode] = useState('');
  const [showTitle, setShowTitle] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleTitle = () => {
    setShowTitle(!showTitle);
  }

  

  return (
    <main className="w-full h-screen font-mono">
      
      {showTitle && <TitleScreen mode={mode} setMode={setMode} onStart={handleToggleTitle} setIsPlaying={setIsPlaying} />}
     {isPlaying && <Game mode={mode} />}
    </main>
  );
}
