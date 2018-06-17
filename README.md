# ph-instant
Code repository for the chrome extension with nodejs backend to instantly notify users on every Product Hunt post.

Try the production version of the extension here: https://chrome.google.com/webstore/detail/producthunt-instant/hjaaedonkogknpppgdghjdnnjeahoghe

# Development
## Server
Run the following to start the server:
```
cd server
npm install
node src/index.js   #For local
#or
npm start           #For production
```

## Client(Chrome extension)
Run the following to build the code:
```
cd client
npm run dev         #For local development
#or
npm run build       #For production release
```
This will generate the bundle and other required files in ./client/dist directory.

Load the generated chrome extension in chrome by `Kebab menu(⋮) -> More Tools -> Extensions` and then click on `LOAD UNPACKED` and select the dist folder.
Chrome extension is loaded and ready to send the ph-instant notifications.
