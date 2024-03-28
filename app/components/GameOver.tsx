interface GameOverProps {
    isGameOver:boolean;
    onRestart:any;
    handleGameOver:React.FormEventHandler<HTMLFormElement>;
    win:boolean;
}

export default function GameOver({isGameOver, onRestart, handleGameOver, win}:GameOverProps) {
    if (!isGameOver) return null;
    return (
        <div className="fixed  z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full mx-auto px-4 ">
      <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md p-5 text-black">
        <form onSubmit={handleGameOver}>
        {win ? (<h3 className="font-bold text-lg">You Win</h3>) : (<h3 className="font-bold text-lg">Game Over</h3>)
        }
          <div className="modal-action">
            
            <button
              type="submit"
              className="btn bg-green-500 hover:bg-green-600 py-1 px-2 mr-2 rounded-sm font-medium text-white"
            >
              Back to Title
            </button>
            <button
              type="reset"
              className="btn bg-red-500 hover:bg-red-600 py-1 px-2 rounded-sm font-medium text-white"
              onClick={onRestart}
            >
              Restart
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}