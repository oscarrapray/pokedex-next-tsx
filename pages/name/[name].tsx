import { PokemonLayout } from "@/components/layouts/PokemonLayout"
import { Pokemon, PokemonListResponse } from "@/interfaces";
import axios from "axios"
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Image from "next/image"

interface Props {
    pokemon: Pokemon;
  }

 const PokemonPage: NextPage<Props> = ({pokemon}) => {
  return (
     <PokemonLayout>
        <div className="poke-info">
           <Image src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'} 
              width={40} height={40} alt={pokemon.name}/>
              <div className="poke-title">
                 <p>{pokemon.name}</p>
              </div>
        </div>
     </PokemonLayout>
  )
}

export default PokemonPage




export const getStaticPaths: GetStaticPaths = async () => {
    const {data:{results}} = await  axios.get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=151')

     const paths = results.map(poke =>({
        params:{
            name:poke.name
        }
     }))
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {name} = params as { name: string };
    const { data } = await  axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    
    const pokemon= {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }

    return {
        props: {
            pokemon
        }
    }
}
