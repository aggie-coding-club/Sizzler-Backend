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

   Replace `<Supabase Secret Key>` with the database key (provided to you privately). Replace `<Your WiFi IP>` with your local WiFi IP. If you are using the TAMU WiFi, then leave the option blank as `EXPO_PUBLIC_WIFI_HOST=`.

   If for whatever reason the frontend port changes, change the `EXPO_PORT` variable accordingly.

   If you wish to change the port the backend runs on, modify the `BACKEND_PORT` variable.

   ```txt
   SUPABASE_KEY=<Supabase Secret Key>
   SUPABASE_URL=https://fdbqtdftqqslqatesqlu.supabase.co
   BACKEND_PORT=3000

   EXPO_LOCALHOST_URL=http://localhost:8081
   EXPO_PORT=8081
   TAMU_WIFI_HOST=10.247.6.151
   WIFI_HOST=<Your Local WiFi IP>
   ```

3. Get local WiFi IP

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
