import Head from "next/head";
import { useState, useEffect } from "react";

const Editor = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [selectedAlarm, setSelectedAlarm] = useState({
    id: "",
    aid: "",
    tid: "",
    message: "",
    severity: ""
  });

  const fetchAlarms = () => {
    fetch("/api/alarms")
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => {
          return a.id - b.id;
        });
        setData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchAlarms();
  }, []);

  const saveCurrentAlarm = (alarm) => {
    fetch("/api/alarms", {
      method: 'PUT',
      body: JSON.stringify(alarm),
    }).then((res) => res.json)
    .then((data) => {
      console.log(data);
    });
  };

  const alarmPointClicked = (e, alarm) => {
    e.preventDefault();
    setSelectedAlarm(alarm);
    console.log(alarm);
  };

  const inputChanged = (e) => {
    const value = e.target.value;
    setSelectedAlarm({
      ...selectedAlarm,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCurrentAlarm(selectedAlarm);
    fetchAlarms();
  };

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <title>Spindle NMS - Alarm Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="window">
          <header className="toolbar toolbar-header">
            <h1 className="title">Alarm Point Editor</h1>
          </header>
          <div className="window-content">
            <div className="pane-group">
              <div className="pane">
                <table className="table-striped">
                  <thead>
                    <tr>
                      <th>Edit</th>
                      <th>Id</th>
                      <th>TID</th>
                      <th>AID</th>
                      <th>Message</th>
                      <th>Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((alarm) => (
                      <tr key={alarm.id}>
                        <td>
                          <button className="btn btn-default" onClick={(e) => alarmPointClicked(e, alarm)}>
                            <span className="icon icon-pencil"></span>
                          </button>
                        </td>
                        <td>{alarm.id}</td>
                        <td>{alarm.tid}</td>
                        <td>{alarm.aid}</td>
                        <td>{alarm.message}</td>
                        <td>{alarm.severity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pane sidebar">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Target ID (Location)</label>
                      <input name="tid" type="text" className="form-control" value={selectedAlarm?.tid} onChange={inputChanged}/>
                  </div>
                  <div className="form-group">
                    <label>Alarm ID (Specific Device)</label>
                      <input name="aid" type="text" className="form-control"value={selectedAlarm?.aid} onChange={inputChanged}/>
                  </div>
                  <div className="form-group">
                    <label>Alarm Message</label>
                      <input name="message" type="text" className="form-control" value={selectedAlarm?.message} onChange={inputChanged}/>
                  </div>
                  <div className="form-group">
                    <label>Alarm Description</label>
                      <textarea name="description" className="form-control" rows="3" onChange={inputChanged} value={selectedAlarm?.description}></textarea>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-form btn-default">Cancel</button>
                    <button type="submit" className="btn btn-form btn-primary">OK</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <footer className="toolbar toolbar-footer">
            <h1 className="title">Footer</h1>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Editor;
