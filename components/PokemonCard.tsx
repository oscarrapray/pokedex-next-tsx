import { SmallPokemon } from "../interfaces"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

interface Props{
  pokemons:SmallPokemon
}

export const PokemonCard:FC<Props> = ({pokemons}) => {
  return (
    <div className="card">
        <Link href={`/name/${ pokemons.name }`}>
            <Image src={pokemons.img} width={40} height={40} alt={pokemons.name}/>
        </Link>
        <p>{ pokemons.name }</p>
    </div>
  )
}
