import Head from 'next/head'
import Image from 'next/image'
import { useEffect,useState } from 'react'
import  useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home(props) {
  return (
    <div className="bg-blue-100 w-full min-h-screen grid grid-cols-12 grid-rows-6 gap-8 p-8">
      <LunchCard lunchData={props.lunchData}/>
    </div>
  )
}

const LunchCard = ({lunchData}) => {
  const { data, error } = useSWR(
    "/api/lunch",
    fetcher, { refreshInterval: 180*1000 }
  );
  if(!data){
    return null;
  }
  return (
  <div className="bg-white p-4 col-span-4">
  <h2 className="font-bold text-xl">Dagens på astern</h2>
  <ul className="list-disc list-inside">
    {data.today.map(food => <li className="text-sm" key={food}>{food}</li>)}
  </ul>
</div>
)}
