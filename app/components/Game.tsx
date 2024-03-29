"use client";
import { useState, useEffect } from "react";
import PokeCard from "./PokeCard";
import GameOver from "./GameOver";

interface GameProps {
  mode: string;
}

export default function Game({ mode }: GameProps) {
  const [pokemonData, setPokemonData] = useState<any>([]);
  let [pokemon, setPokemon] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [best, setBest] = useState<number>(0);
  const [isWin, setIsWin] = useState(false);
  let pokeToShow = 0;
  let [pokeToShowUS, setPokeToShowUS] = useState<number>(0);

  let [selPokemon, setSelPokemon] = useState<number[]>([]);

  const [isGameOver, setIsGameOver] = useState(false);

  const toggleModal = () => {
    setIsGameOver(!isGameOver);
  };

  switch (mode) {
    case "Easy":
      pokeToShow = 5;
      break;
    case "Medium":
      pokeToShow = 10;
      break;
    case "Endless":
      pokeToShow = 5;
      break;
    default:
      break;
  }

  async function getPokemon(num: number) {
    try {
      const apiURL = `https://pokeapi.co/api/v2/pokemon/${num}`;
      const response = await fetch(apiURL);
      const data = await response.json();
      setPokemonData((prevData: any) => [...prevData, data]);
    } catch (error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(pokeToShowUS == 0){
      setPokeToShowUS(5);
      
    }
  });

  useEffect(() => {
    setSelPokemon([]);
    reshufflePokemon();
  
  }, []); // Empty dependency array to run this effect only once

  // useEffect to render PokeCard when all data is fetched
  // useEffect(() => {
  //   if (pokemonData.length === pokeToShow) {
  //     console.log("All data fetched:", pokemonData);
  //     console.log(pokemon);
  //     console.log(selPokemon);
  //   }
  // }, [pokemonData, pokeToShow, selPokemon]);

  useEffect(() => {

    if (score > best) {
      setBest(score);
    }

    if (mode !== "Endless" && score === pokeToShow) {
      setIsWin(true);
      toggleModal();
    }
    
  }, [score, pokeToShow]);

  

  const reshufflePokemon = () => {
    let newPoke: number[] = [];
    if (mode === "Endless") {
      
      // For endless mode, keep adding more Pokemon
      newPoke = selPokemon.slice();
      
      
      if(mode == "Endless" && score > pokeToShow - 1){
        pokeToShow = score + 5;
        
      }
      while (newPoke.length < (pokeToShowUS == 0 ?  5 : pokeToShow)) {
        const pokeNum: any = getRandomNum(newPoke);
        newPoke.push(pokeNum);
      }}else{
        if (pokemonData.length == pokeToShow) {
          //if this is not the first time
          newPoke = pokemon;
      
        } else {
          // this is the first time initialized
          console.log("new");
          newPoke = selPokemon; //get how many pokemon already selected
          const newRandomPoke = pokeToShow - newPoke.length; //get how many more new random poke to fill
          for (let i = 0; i < newRandomPoke; i++) {
            const pokeNum: any = getRandomNum(newPoke);
            newPoke.push(pokeNum);
          }
        }
      }
    

    // setPokeToShowUS(pokeToShow);
    newPoke.sort(() => Math.random() - 0.5);
    setPokemon(newPoke);
    // Clear existing Pokemon data
    setPokemonData([]);

    newPoke.forEach((parameter) => {
      getPokemon(parameter);
    });
  };

  // wont get same pokemon number twice
  function getRandomNum(newPoke: number[]) {
    const temp = Math.floor(Math.random() * 721);
    if (!newPoke.includes(temp)) {
      return temp;
    } else {
      return getRandomNum(newPoke);
    }
  }

  const handleCardClick = (id: number) => {
    // Do something with the clicked index, such as showing details or updating state
    console.log("Clicked card id:", id);
    console.log(selPokemon);
    if (selPokemon.includes(id) == true) {
      //lose
      toggleModal();
      setIsWin(false);
    } else {
      setSelPokemon((prevData: any) => [...prevData, id]);
      setScore(score + 1);

      //reshuffle
      reshufflePokemon();
    }
  };

  const handleGameOver = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    window.location.reload();
  };

  const handleBack = (e:any) => {
   

    window.location.reload();
  };

  const handleOnRestart = () => {
    toggleModal();
    setSelPokemon([]); // Clear selected Pokemon
    setScore(0); // Reset score

    // Reshuffle and fetch new Pokemon from pokemonData
    const newPoke: number[] = [];
    const newRandomPoke = pokeToShow;
    for (let i = 0; i < newRandomPoke; i++) {
      const pokeNum: any = getRandomNum(newPoke);
      newPoke.push(pokeNum);
    }
    newPoke.sort(() => Math.random() - 0.5);
    setPokemon(newPoke);

    // Clear existing Pokemon data
    setPokemonData([]);

    newPoke.forEach((parameter) => {
      getPokemon(parameter);
    });
  };

  return (
    <>
      <div className="flex min-h-screen bg-[#F7F4F5] w-full h-full flex-col content-start items-center justify-between px-10 py-5">
        <div className="flex flex-row justify-between w-full mb-4">
          <div>
            <p className=" font-extrabold text-xl">Score: {score}</p>
            <p className=" font-bold">Best: {best}</p>
          </div>
          <div className=" font-bold text-2xl">Don't click the same pokemon twice!</div>
          
          <button className="bg-white rounded-2xl px-5 py-2 hover:bg-[#FEE378]" onClick={handleBack}>
            Back
          </button>
        </div>

        <div className="grid grid-cols-5 auto-cols-max   w-full h-full overflow-visible gap-5">
         
          {pokemonData.length >= pokeToShowUS ? (
            
            <PokeCard
              pokemon={pokemon}
              pokemonData={pokemonData}
              onClick={handleCardClick}
            />
          ) : (
            <>
            <div></div>
            <div></div>
          <div className="flex flex-col w-full h-full justify-center content-center"><img src="/loading.gif" className="self-center" alt="" /></div>
          </>)}
        
        </div>
      </div>

      <GameOver
        isGameOver={isGameOver}
        onRestart={handleOnRestart}
        handleGameOver={handleGameOver}
        win={isWin}
      />
    </>
  );
}
