Spindle NMS is a super lightweight next based alarm point NMS designed to run in lightweight arm
or SBC controllers.

Development:
```
npm install -g next
npm install
npm run dev 
```

Production:
```
npm install -g next
npm install
npm run build
npm start
```

To Build Docker: 
```
sudo docker buildx build --platform=linux/arm/v8 -t spindle-nms .
sudo docker run -p 3000:3000 -d -rm spindle-nms
```
Note: If you want arm64 you will need to change the dockerfiles starting image.


API To Turn Alarms On And Off:
```
http://localhost:3000/api/alarm?id=1&mode=active
http://localhost:3000/api/alarm?id=1&mode=inactive
```

# WIP LIST:
1. ~~Alarms should be sorted by time and new alarms come in the top~~
1. Add support for adding new alarm points (if active add and display immeadiately). Right now you have to add them to alarmdb.json before startup.
1. Add support for alarm metadata and templating in alarm message/description/link
1. ~~Add support to clear an active alarm (turn green) and give allow toggle to determine whether or not to show it.~~
1. ~~Add support to edit existing point~~
1. Create new nav item for ping list and functionality (periodically pinging/fetching then returning status);
1. Add some rudimentary sound for new alarms, maybe even based on severity.
1. Move mechanics and db to appwrite cloud once we develop a casaos version.
1. Create exposed API call that will allow easy hookup to new alarms agents or providers as long as the tid/aid are consistent.
This will allow onboarding of new alarms on the fly.
   
1. Integrate with gotify?
1. Integrate with homeassistant or at least provide a minimal dashboard for assitant applications.


