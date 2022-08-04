import { LowSync, JSONFileSync } from "lowdb";

const handler = (req, res) => {
  const db = new LowSync(new JSONFileSync("alarmdb.json"));
  
  if(req.method === 'GET'){
    db.read();
    const { alarms } = db.data;
    alarms.sort((a,b) => {

      return new Date(b.date) - new Date(a.date);
    });

    return res.status(200).json(alarms);
  }

  if(req.method === 'POST'){
    db.read();
    db.data ||= { alarms: [] }
    req.body.id = db.data.alarms.length + 1;
    db.data.alarms.push(req.body);
    db.write();
    return res.status(200).json(req.body);
  }

  return res.status(404);
};

export default handler;
