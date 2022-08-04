Project Build Order:

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

API To Turn Alarms On And Off:
```
http://localhost:3000/api/alarm?id=1&mode=active
```

#WIP LIST:
1. ~~Alarms should be sorted by time and new alarms come in the top~~
1. Add support for adding new alarm points (if active add and display immeadiately)
1. Add support for alarm metadata and templating in alarm message/description/link
1. ~~Add support to clear an active alarm (turn green) and give allow toggle to determine whether or not to show it.~~
1. Add support to edit existing point
1. Create new nav item for ping list and functionality (periodically pinging/fetching then returning status);
1. Add some rudimentary sound for new alarms, maybe even based on severity.


