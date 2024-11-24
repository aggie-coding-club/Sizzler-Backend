# Welcome to Sizzler Backend

## Get started

The project runs with the expectation you have node installed and some form of a package manager. This document will assume you are using `npm`, so change the commands as needed. This is an express application linked to a database stored and managed on supabase.

1. Clone Files

   **HTTPS**

   ```bash
   git clone https://github.com/aggie-coding-club/Sizzler-Backend.git
   ```

   **SSH**

   ```bash
   git clone git@github.com:aggie-coding-club/Sizzler-Backend.git
   ```

2. Enter Project

   ```bash
   cd Sizzler-Backend
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Start the app

   ```bash
   npm run dev
   ```

<<<<<<< HEAD
=======
## Working On New Features

   The only requirement is to work on new features in your own independent branch. Changes you make should not immediately interfere with other's work and should always be peer reviewed prior to merging changes into the main branch. To branch of from the main, simply run the following command:

   ```bash
   git checkout -b <new branch name>
   ```

   This command will create a branch of the project stemming from wherever you are currently located. Typically you should be branching from main. If you are not located in main, and wish to be, run the following command **BEFORE** checking out to a new branch.

   ```bash
   git checkout main
   ```

   Note that this command does not include the `-b` flag. The flag serves to let git now that you wish to create a new branch if that name does not already exist.

>>>>>>> 379f3407307f8e95641148c1abe8b90a2d00cd64
## .env Setup

Correctly linking the backend and frontend will require correct .env setup.

1. Create .env at the root of project

   ```bash
   ── public
   │   └── stylesheets
   ├── routes
   │   ├── comments.js
   │   ├── index.js
   │   ├── posts.js
   │   └── users.js
   ├── node_modules
   ├── app.js
   ├── package.json
   ├── README.md
   ├── .gitignore
   ├── .env ←──────────────── here
   └── ...
   ```

2. Add environment variables to .env

<<<<<<< HEAD
   Replace `<Supabase Secret Key>` with the database key (provided to you privately). Replace `<Your WiFi IP>` with your local WiFi IP. If you are using the TAMU WiFi, then leave the option blank as `EXPO_PUBLIC_WIFI_HOST=`.
=======
   Replace `<Supabase Secret Key>` with the database key (provided to you privately). Replace `<Your WiFi IP>` with your WiFi IP. Local host should only be used if you are testing the frontend via the web version and it is also configured to use localhost for the backend api calls. Once the IP is configured once, you should not need to modify the `.env` again.
>>>>>>> 379f3407307f8e95641148c1abe8b90a2d00cd64

   If for whatever reason the frontend port changes, change the `EXPO_PORT` variable accordingly.

   If you wish to change the port the backend runs on, modify the `BACKEND_PORT` variable.

   ```txt
   SUPABASE_KEY=<Supabase Secret Key>
   SUPABASE_URL=https://fdbqtdftqqslqatesqlu.supabase.co
   BACKEND_PORT=3000

   EXPO_LOCALHOST_URL=http://localhost:8081
   EXPO_PORT=8081
<<<<<<< HEAD
   TAMU_WIFI_HOST=10.247.6.151
   WIFI_HOST=<Your Local WiFi IP>
   ```

3. Get local WiFi IP
=======
   LOCAL_HOST=localhost
   WIFI_HOST=<Your WiFi IP>
   ```

3. Get WiFi IP
>>>>>>> 379f3407307f8e95641148c1abe8b90a2d00cd64

   - **Windows 10:**
     1. `Command Prompt`
     2. run command `ipconfig`
     3. copy IP labeled as `IPv4 Address`
   - **Windows 11:**
     - Option 1
       1. `Windows Terminal`→`Command Prompt`
       2. run command `ipconfig`
       3. copy IP labeled as `IPv4 Address`
     - Option 2
       1. <kbd>⊞ Win</kbd> + <kbd>I</kbd> (open `Windows Settings`)
       2. `Network & Internet`
       3. `Properties`
       4. `IPv4 Address`
   - **macOS:**
     1. `System Settings`
     2. `Network`
     3. `Wi-Fi`
     4. `Details...`
     5. `IP Address`

## Debugging

For any unaddressed issues, please contact Andrew Mao or Art Young for assistance.
