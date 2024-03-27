"use client";
import { useState, useEffect } from "react";
import PokeCard from "./PokeCard";

interface GameProps {
  mode: string;
}

export default function Game({ mode }: GameProps) {
  const [pokemonData, setPokemonData] = useState<any>([]);
  let [pokemon, setPokemon] = useState<number[]>([]);
  let pokeToShow = 0;

  switch (mode) {
    case "Easy":
      pokeToShow = 5;
      break;
    case "Medium":
      pokeToShow = 10;
      break;
    case "Endless":
      pokeToShow = 100;
      break;
    default:
      break;
  }

  async function getPokemon(num:number) {
    
    try {
      const apiURL = `https://pokeapi.co/api/v2/pokemon/${num}`;
      const response = await fetch(apiURL);
      const data = await response.json();
      setPokemonData((prevData:any) => [...prevData, data]); 

      
    } catch (error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    const newPoke = [];
    for (let i = 0; i < pokeToShow; i++) {
      const pokeNum = Math.floor(Math.random() * 721);
      newPoke.push(pokeNum);
    }
    setPokemon(newPoke);

    newPoke.forEach(parameter => {
        
        getPokemon(parameter);
        
        
      });
  
  }, []); // Empty dependency array to run this effect only once



    // useEffect to render PokeCard when all data is fetched
    useEffect(() => {
        if (pokemonData.length === pokeToShow) {
          console.log("All data fetched:", pokemonData);
        }
      }, [pokemonData, pokeToShow]);
    
  

  return (
    <>
      <div className="flex min-h-screen w-full h-full flex-col content-start items-center justify-between p-10">
        <div>Memogame Pokemon</div>
        <div>
          <p>Score</p>
          <p>Best</p>
        </div>
        <div className="grid grid-cols-5 auto-cols-max bg-gray-200  w-full h-full gap-2">
          {pokemonData.length === pokeToShow && (
            <PokeCard pokemon={pokemon} pokemonData={pokemonData} />
          )}
        </div>
      </div>
    </>
  );
}
