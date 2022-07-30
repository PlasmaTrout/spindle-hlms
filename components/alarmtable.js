import { useState, useEffect } from "react";
import io from "socket.io-client";

export default function AlarmTable() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

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
        console.log("listening for sockets");
        socket.on("alarm", () => {
          fetchData();
        });
      });
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <td>
            <abbr title="Id">Id</abbr>
          </td>
          <td>
            <abbr title="Date">Date</abbr>
          </td>
          <td>
            <abbr title="TID">TID</abbr>
          </td>
          <td>
            <abbr title="AID">AID</abbr>
          </td>
          <td>
            <abbr title="Severity">Severity</abbr>
          </td>
          <td>
            <abbr title="Message">Message</abbr>
          </td>
          <td>
            <abbr title="State">State</abbr>
          </td>
          <td>
            <abbr title="Group">Group</abbr>
          </td>
          <td>
            <abbr title="Link">Link</abbr>
          </td>
        </tr>
      </thead>
      <tbody>
        {data
          ?.filter((alarm) => alarm.state === "active")
          .map((alarm) => (
            <tr
              className={alarm.severity}
              title={alarm.description}
              key={alarm.id}
            >
              <td>{alarm.id}</td>
              <td>{alarm.date}</td>
              <td>{alarm.tid}</td>
              <td>{alarm.aid}</td>
              <td>{alarm.severity}</td>
              <td>{alarm.message}</td>
              <td>{alarm.state}</td>
              <td>{alarm.group}</td>
              <td>
                <a href={alarm.link}>Link</a>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
