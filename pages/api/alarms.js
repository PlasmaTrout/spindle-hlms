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

  if(req.method === 'PUT'){
    db.read();
    const incomingUpdate = JSON.parse(req.body);
    const { alarms } = db.data;

    const alarmToUpdate = alarms.find((a) => a.id === incomingUpdate.id);
    alarmToUpdate.message = incomingUpdate.message;
    alarmToUpdate.description = incomingUpdate.description;
    alarmToUpdate.tid = incomingUpdate.tid;
    alarmToUpdate.aid = incomingUpdate.aid;
    
    db.write();
    return res.status(200).json(alarmToUpdate);
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
