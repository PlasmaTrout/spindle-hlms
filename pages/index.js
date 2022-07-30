import Head from "next/head";
import NavBar from '../components/navbar';
import AlarmTable from "../components/alarmtable";
import { useEffect } from "react";
import io from 'socket.io-client'
let socket;

export default function Home() {

  useEffect(() => socketInitializer(), []);

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log("Socket connected!");
     
    });

    return null;
  }

  return (
    <div className="container">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta> 
        <title>Spindle NMS</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
        <link rel="stylesheet" href="/alarmtable.css"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
       <NavBar></NavBar>
       <AlarmTable></AlarmTable>
        <div className="container"></div>
      </main>

      <footer></footer>
    </div>
  );
}
