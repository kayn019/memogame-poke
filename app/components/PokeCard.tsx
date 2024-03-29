

interface PokeCardProps{
    pokemon:number[];
    pokemonData:any;
    onClick:Function;
}

export default function PokeCard({ pokemon, pokemonData, onClick }: PokeCardProps) {
  return (
    <>
      {pokemon.map((num, index) => {
        const data = pokemonData.find((poke: any) => poke.id === num);
        if (!data) {
          return <div key={"wait" + index} className="w-200px h-400px bg-white hover:bg-gray-100 rounded-xl grid justify-center content-center shadow-xl ">
                  
                    <img src="/loading.gif" alt="" />
                
                </div>; // If data is not available yet, 
        }else{
        return (
          <div className="w-200px h-400px bg-white hover:bg-[#FEE378] rounded-xl grid justify-center content-center shadow-xl min-h-full border-2 border-[#ffe1d4]" key={data.id} onClick={() => onClick(data.id)}>
            <div className="text-center font-bold">{data.species.name}</div>
            <img className="max-w-max h-auto" src={data.sprites.front_default || 'https://via.placeholder.com/150'} alt="" />
          </div>
        );}
      })}
    </>
  );
}
