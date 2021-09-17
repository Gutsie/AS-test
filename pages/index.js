import Head from 'next/head'
import Image from 'next/image'
import { useEffect,useState } from 'react'

export default function Home(props) {
  return (
    <div className="bg-blue-100 w-full min-h-screen flex flex-wrap p-2">
      {props.matches.map((match)=>(
        <div key={match.teams} className="bg-white rounded-md p-4 m-2 shadow-md">
          <h2>{match.teams}</h2>
          <p>{match.date}</p>
          </div>
      ))}
    </div>
  )
}

export async function getServerSideProps(context) {
  const data = await fetch('http://localhost:3000/api/hello').then(res=> res.json()).then(json => json.matches)
  return {
    props: {matches:data}, // will be passed to the page component as props
  }
}