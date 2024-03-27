import Game from "./Game";

interface TitleScreenProps {
    mode: string;
    setMode: Function;
    onStart: Function;
    setIsPlaying: Function;
}

export default function TitleScreen({mode, setMode, onStart, setIsPlaying}:TitleScreenProps) {
    const modeBtn = ['Easy', 'Medium', 'Endless'];

    const handleSetMode = (e:any) => {
        setMode(e.target.textContent);
        console.log(e.target.textContent);
      };

    const handleStart = () => {
        onStart();
        setIsPlaying(true);
    }

  return (
    <div className="flex min-h-screen flex-col content-start items-center justify-between p-24">
      <div>Pokemon Memory Game</div>
      <div className="flex flex-col content-start border-black border-2 p-5">
        <div>Please choose game mode</div>
        {modeBtn.map((ele, index) => (
          <div key={index} className="flex gap-4">
            {mode === ele ? <p className="animate-ping">&#9658;</p> : null}
            <button className="self-start" onClick={handleSetMode}>
              {ele}
            </button>
          </div>
        ))}


      </div>
      <div>
        {mode ? (
          <button className="bg-gray-400 p-4 px-8 rounded-full" onClick={handleStart}>
            Start Game
          </button>
        ) : (
          <button className="bg-gray-200 p-4 px-8 rounded-full" disabled onClick={handleStart}>
            Start Game
          </button>
        )}
      </div>
    </div>
  );
}
