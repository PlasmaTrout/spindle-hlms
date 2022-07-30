import Head from "next/head";
import NavBar from "../components/navbar";
import AlarmTable from "../components/alarmtable";
import { useEffect } from "react";
import io from "socket.io-client";
let socket;

export default function Home() {
  useEffect(() => socketInitializer(), []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("Socket connected!");
    });

    return null;
  };

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <title>Spindle NMS</title>
        <link rel="stylesheet" href="../photon/css/photon.min.css" />
        <link rel="stylesheet" href="/alarmtable.css"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="window">
          <header className="toolbar toolbar-header">
            <h1 className="title">Spindle NMS</h1>
            <div className="toolbar-actions">
              <div className="btn-group">
                
              </div>
              <button className="btn btn-default pull-right">
                  <span className="icon icon-retweet"></span>
                </button>
            </div>
          </header>
          <div className="window-content">
            <div className="pane-group">
              <div class="pane-sm sidebar">
                <NavBar></NavBar>
              </div>
              <div class="pane">
                <AlarmTable></AlarmTable>
              </div>
            </div>
          </div>
          <footer class="toolbar toolbar-footer">
            <h1 class="title">Footer</h1>
          </footer>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
