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
# Add support for adding new alarm points (if active add and display immeadiately)
# Add support for alarm metadata and handlebars templating in alarm message/description/link
# Add support to clear an active alarm (turn green)
# Add support to edit existing point
# Create new nav item for ping list and functionality (periodically pinging/fetching then returning status);


