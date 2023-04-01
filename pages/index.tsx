import { NextPage, GetServerSideProps } from 'next';

import { PokemonCard } from '@/components/PokemonCard'
import { PokemonLayout } from '@/components/layouts/PokemonLayout'
import axios from 'axios'
import { PokemonListResponse, SmallPokemon } from '@/interfaces';

interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({pokemons}) => {

  return (
    <PokemonLayout title='Listado de Pokémons'>
        <h1>Simple Pokedex</h1>
        <div className='container-card'>
            {pokemons.map(poke =>(
              <PokemonCard key={poke.id} pokemons={poke}/>
            ))}
            
        </div>
    </PokemonLayout>
  )
}

export default Home ;

export const getServerSideProps:GetServerSideProps = async () => {
  const { data } = await  axios.get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=151')
  const pokemons: SmallPokemon[] = data.results.map((poke,i)=>({
    ...poke,
    id : i+1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i + 1 }.svg`
  }))
   
  return {
    props: {
      pokemons
    }
  }
}


// export const getStaticProps = async (ctx) => {
//   const { data } = await  axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')

//   return {
//     props: {
//       pokemon:data.results
//     }
//   }
// }
