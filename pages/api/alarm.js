import { LowSync, JSONFileSync } from "lowdb";

const handler = (req, res) => {
  const { id, mode, link, tid, aid } = req.query;
  if (id) {
    console.log(req.query);
    const db = new LowSync(new JSONFileSync("alarmdb.json"));
    db.read();
    const alarmPoint = db.data.alarms.find((a) => a.id == id);
    alarmPoint.state = mode || "active";
    alarmPoint.date = new Date();

    // If link is provided as a query string option
    if (link) {
      alarmPoint.link = link;
    }

    db.write();
    res.socket.server.io.emit("alarm", alarmPoint);
  }

  if (tid) {
    const db = new LowSync(new JSONFileSync("alarmdb.json"));
    db.read();
    var points = db.data.alarms.filter((a) => a.tid == tid);

    if (aid) {
      points = points.filter((a) => a.aid == aid);
    }

    if (points) {
      points.forEach((element) => {
        element.state = mode || "active";
        element.date = new Date();
        if (link) {
          element.link = link;
        }
      });
    }
    db.write();
    res.socket.server.io.emit("alarm", null);
  }

  res.status(200).json({ id: id, state: mode, tid: tid, aid: aid });
};

export default handler;
