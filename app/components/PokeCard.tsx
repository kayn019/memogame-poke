
interface PokeCardProps{
    pokemon:number[];
    pokemonData:any;
}

export default function PokeCard({pokemon, pokemonData}:PokeCardProps) {

    `https://pokeapi.co/api/v2/pokemon/{number}/`

    return(
        <>{console.log(pokemonData)}
            {pokemon.map((num, index) => {
                return(<div className=" w-200px h-400px border-black border-2" key={index}>
                  
                  <div>{pokemonData[index].species.name}</div>
                  <img src={pokemonData[index].sprites.front_default} alt="" />
              </div>   )
                })}
        </>
       
    )
}