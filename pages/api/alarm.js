import { LowSync, JSONFileSync } from "lowdb";

const handler = (req, res) => {
  const { id, mode, link } = req.query;
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

  res.status(200).json({ id: id, state: mode });
};

export default handler;
