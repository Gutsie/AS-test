import Head from 'next/head'
import Image from 'next/image'
import { useEffect,useState } from 'react'

export default function Home() {
  const [matches,setMatches] = useState([])

  useEffect(()=>{
    if(matches.length < 1){
      console.log('Hämtar matcher')
      fetch('/api/hello').then(res=> res.json()).then(json => setMatches(json.matches))
    }
  },[])
  console.log(matches)
  return (
    <div className="bg-blue-100 w-full min-h-screen flex flex-wrap p-2">
      {matches.map((match)=>(
        <div key={match.teams} className="bg-white rounded-md p-4 m-2 shadow-md">
          <h2>{match.teams}</h2>
          <p>{match.date}</p>
          </div>
      ))}
    </div>
  )
}
