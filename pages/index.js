import Head from "next/head";
import NavBar from "../components/navbar";
import TopBar from "../components/topbar";
import AlarmTable from "../components/alarmtable";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => socketInitializer(), []);

  const fetchData = () => {
    fetch("/api/alarms")
      .then((res) => res.json())
      .then((data) => {
        console.log("REFETCH!");
        setData(data);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/alarms")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        const socket = io();
        socket.on("alarm", () => {
          fetchData();
        });
      });
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("Socket connected!");
    });

    return null;
  };

  const refreshPressed = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <title>Spindle NMS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="window">
          <TopBar refreshEvent={refreshPressed}></TopBar>
          <div className="window-content">
            <div className="pane-group">
              <div className="pane-sm sidebar">
                <NavBar></NavBar>
              </div>
              <div className="pane">
                <AlarmTable data={data}></AlarmTable>
              </div>
            </div>
          </div>
          <footer className="toolbar toolbar-footer">
            <h1 className="title">Footer</h1>
          </footer>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
