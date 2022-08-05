import Head from "next/head";
import NavBar from "../components/navbar";
import TopBar from "../components/topbar";
import AlarmTable from "../components/alarmtable";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const Home = () => {
  const [data, setData] = useState(null);
  const [clearVis, setClearVis] = useState(null);
  const [loading, setLoading] = useState(null);
  const [selectedAlarm, setSelectedAlarm] = useState(null);

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

  const rowSelected = (e, alarm) => {
    setSelectedAlarm(alarm.id);
    const mode = alarm.state === "inactive" ? "active" : "inactive";
    fetch(`/api/alarm?id=${alarm.id}&&mode=${mode}`).then((res) =>
      console.log(res)
    );
  };

  const toggleClearVisible = (e) => {
    if (clearVis) {
      setClearVis(false);
    } else {
      console.log("its false");
      setClearVis(true);
    }
  };

  const createStubAlarm = () => {

    const alarm = {
      date: new Date().toJSON,
      tid: "TID",
      aid: "AID",
      severity: "info",
      message: "message",
      state: "inactive",
      description: "description",
      group: "default",
      link: "",
      id: 0
    };
  
    fetch("/api/alarms", {
      method: "POST",
      body: JSON.stringify(alarm),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
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
          <TopBar
            refreshEvent={refreshPressed}
            toggleClearVisible={toggleClearVisible}
            selectedAlarm={selectedAlarm}
            uiMode="alarms"
          ></TopBar>
          <div className="window-content">
            <div className="pane-group">
              <div className="pane-sm sidebar">
                <NavBar></NavBar>
              </div>
              <div className="pane">
                <AlarmTable
                  data={data}
                  hideClear={clearVis}
                  rowSelect={rowSelected}
                ></AlarmTable>
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
