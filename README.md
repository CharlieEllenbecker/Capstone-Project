# Capstone-Project

Download Node.js:
[Node.js download](https://nodejs.org/en/download/)

Download VSCode:
[VSCode download](https://code.visualstudio.com/download)

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

Fix network error:
- Download Notepad++ (Windows): https://notepad-plus-plus.org/downloads/
- Run Notepad++ as an administrator
- In Notepad++ navigate to File > Open...  and navigate to 'C:\Windows\System32\drivers\etc' folder
- In this folder select and open the 'hosts' file
- Type the following into a command prompt and press enter

```console
ipconfig /all
```

- Under 'Ethernet adapter Ethernet' find 'IPv4 Address'
- Copy the value => Ex. '123.456.7.89'
- In Notepad++ add the following line to the bottom of the 'hosts' file

```console
photo-app   123.456.7.89
```

- Where **inbetween** photo-app and your IPv4 Address is a **tab**
- **Remember to replace the example IPv4 Address with your own!**
- Save the file before running the program

# Running the Server

To run the program:

- Download MongoDB (steps above)
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

- Type the following into the prompt and press enter:

```console
npm start
```

To run tests:

- Type the following into the prompt and press enter:

```console
npm test
```

- Ctrl + c to stop running

# Running the Client

To run program:

- To download Android Studio (Windows): https://developer.android.com/studio?authuser=1
- To download xCode (MacOS): https://developer.apple.com/documentation/xcode/running-your-app-in-the-simulator-or-on-a-device
- Type the following into the prompt and press enter:

```console
npm start
```

- Open android emulator if using one
- Type 'a' for android emulator or scan QR code for ios device
