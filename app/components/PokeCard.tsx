
interface PokeCardProps{
    pokemon:number[];
    pokemonData:any;
    onClick:Function;
}

export default function PokeCard({pokemon, pokemonData, onClick}:PokeCardProps) {

    `https://pokeapi.co/api/v2/pokemon/{number}/`
    console.log(pokemonData);
    console.log(pokemon);
    return(
        <>
            {pokemon.map((num, index) => {
              
                return(
                  <div className=" w-200px h-400px  bg-white hover:bg-gray-100 rounded-xl grid justify-center content-center shadow-xl " key={pokemonData[index].id} onClick={() => onClick(pokemonData[index].id)}>
                    <div className="text-center">{pokemonData[index].species.name}</div>
                    <img className="max-w-max h-auto" src={pokemonData[index].sprites.front_default} alt="" />
                  </div>   )
                })}
        </>
       
    )
}