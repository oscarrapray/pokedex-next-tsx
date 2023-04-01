import { FC, ReactNode } from 'react';
import Head from "next/head"
import { NavBar } from "../NavBar"

interface Props {
  title?: string;
  children:ReactNode
}

export const PokemonLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
    <Head>
        <title>{ title || 'PokemonApp' }</title>
        <meta name="author" content="Oscar Rapray" />
    </Head>
    <NavBar/>
    <main className='container'>
        {children}
    </main>
    </> 
  )
}
