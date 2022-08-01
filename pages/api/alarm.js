import { LowSync, JSONFileSync } from "lowdb";

const handler = (req, res) => {
  const { id, mode } = req.query;
  if (id) {
    console.log(req.query);
    const db = new LowSync(new JSONFileSync("alarmdb.json"));
    db.read();
    const alarmPoint = db.data.alarms.find((a) => a.id == id);
    alarmPoint.state = mode || "active";
    db.write();
    res.socket.server.io.emit("alarm", alarmPoint);
  }
  
  res.status(200).json({ id: id, state: mode });
};

export default handler;
