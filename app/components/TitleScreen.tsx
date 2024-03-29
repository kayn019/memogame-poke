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
    <div className="flex min-h-screen flex-col bg-[#F7F4F5] bg-[url('/poke.png')] content-start items-center justify-between p-24" >
      <div className="text-6xl font-extrabold font-black font-pokemon tracking-wider bg-white p-4 rounded-3xl shadow-lg">Pokemon Memory Game</div>
      <div className="flex flex-col content-start border-2 border-[#ffe1d4] p-5 bg-white rounded-2xl shadow-xl">
        <div className="bg-white font-bold">Please choose game mode:</div>
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
          <button className="bg-[#F27139] p-4 px-8 rounded-full shadow-xl text-[#FEE378]" onClick={handleStart}>
            Start Game
          </button>
        ) : (
          <button className="bg-gray-300 p-4 px-8 rounded-full text-gray-50" disabled onClick={handleStart}>
            Start Game
          </button>
        )}
      </div>
    </div>
  );
}
