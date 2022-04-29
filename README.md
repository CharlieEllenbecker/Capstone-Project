# Capstone-Project

Download Node.js:
[Node.js download](https://nodejs.org/en/download/)

Download VSCode:
[VSCode download](https://code.visualstudio.com/download)

# Intro
To run this program, the user will need to set up the database, server, and client. These services will provide the user access to the app along with the ability to test its functionality. The database will host the user and pin data, while the client provides the frontend experience for the user which is connected through the backend by the server. Download and set up the database, populate the database with our populate.js script included for the testing user's convenience, run the server, client, then view the app through the andriod emulator. Follow the steps listed below in order.

# Set Up Local Database

Download MongoDB with MongoDB Compass:
[MongoDb Community download](https://www.mongodb.com/try/download/community)

- Once installed, navagate to your C: drive > Program Files > MongoDB > Server > version# folder (Ex. 5.0) > bin
- Copy the path at this from the bin directory (Ex. C:\Program Files\MongoDB\Server\5.0\bin)
- In your search bar Type in "View advanced system settings" and open it
- Click on "Environment Variables..."
- In System Variables select "Path" and press the "Edit" button
- Click on the "New" button and paste in the path
- Click "Ok" to save on all of the System Properties windows until they are closed
- Open a new command prompt and type in the following and press enter to run Mongo Daemon on your pc:

```console
mongod
```

- Ctrl + c to stop running Mongo Daemon

# Populate the Database
The populate script contains pre-made data to demonstrate the app's functionality
- Open another new command prompt at '/capstone-project/server'
- Type the following into the prompt and press enter:

```console
npm run populate
```

- This script will have cleared your 'capstone-project' database if it already existed and populate it for you
- You now have users and pins available in the database

# Ensure Network Access
- Type the following into a command prompt and press enter

```console
ipconfig /all
```

- Under 'Ethernet adapter Ethernet' find 'IPv4 Address'
- Copy the value => Ex. '123.456.7.89'
- Open the folder 'client' folder at '/capstone-project/client' in VSCode
- Make a new file in this folder using the following name:

```file name
ip.js
```

- Put the following code in the file:

```js
export default function getIp() {
    return '123.456.7.89'
}
```

- **Remember to replace the example IPv4 Address with your own!**
- Save the file

# Running the Server

To run the program:

- Run database and populate it (steps above)
- Open another new command prompt at '/capstone-project/server'
- Set the JWT Private Key:
- Type the following into the prompt and press enter (windows):

```console
set capstone-project_jwtPrivateKey=privateKeyHere
```

- Type the following into the prompt and press enter (mac):

```console
export capstone-project_jwtPrivateKey=privateKeyHere
```

To run server:
- You will want to run this command before starting the server or running tests for the first time in a session:
```console
npm i
```

- Then type the following into the prompt and press enter:
```console
npm start
```

Or to run tests:

- Type the following into the prompt and press enter:

```console
npm test
```

- Ctrl + c to stop running

# Running the Client

To run program:

- To download Android Studio (Windows): https://developer.android.com/studio?authuser=1
- To download xCode (MacOS): https://developer.apple.com/documentation/xcode/running-your-app-in-the-simulator-or-on-a-device
- Open another new command prompt at '/capstone-project/client'

- The first time you run ever, type the following into the prompt and press enter:
```console
npm i -g expo-cli 
```
- The first time you run in a session, you'll want to run the following command:
```console
npm i
```

-Now you're ready to start the client:

```console
expo start
```
!!NOTE: If it asks for "audit fix" after running an npm command, ignore. Especially do NOT run npm audit fix --force

- Open android emulator if using one
- Type 'a' for android emulator or scan QR code for ios device
