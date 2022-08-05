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
    alarmToUpdate.severity = incomingUpdate.severity;
    
    db.write();
    return res.status(200).json(alarmToUpdate);
  }

  if(req.method === 'POST'){
    db.read();
    db.data ||= { alarms: [] }
    const incomingUpdate = JSON.parse(req.body);
    incomingUpdate.id = db.data.alarms.length + 1;
    db.data.alarms.push(incomingUpdate);
    db.write();
    return res.status(200).json(incomingUpdate);
  }

  return res.status(404);
};

export default handler;
