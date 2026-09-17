
# MedVault — Healthcare Website

A modern, responsive healthcare platform built with **React**, **TypeScript**, **Tailwind CSS v4**, and **Vite**, featuring interactive glowing cards, dynamic particle neural background, comprehensive medical services, and lifetime health records showcase.

---

Opening in VS Code

You can open this project in VS Code using any of the following methods:

### Method 1: Using Terminal (Fastest)
Open your terminal and run:
```bash
cd /Users/kirtipriya/.gemini/antigravity/scratch/healthcare-website-design
open -a "Visual Studio Code" .
```
*(Or if you have the `code` CLI installed: `code .`)*

### Method 2: From Finder
Run:
```bash
open /Users/kirtipriya/.gemini/antigravity/scratch/healthcare-website-design
```
Then drag and drop the opened folder into VS Code.

Method 3: From VS Code Menu
1. Open VS Code.
2. Go to **File > Open Folder...**
3. Press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>G</kbd> to open the path navigator.
4. Paste:
   ```
   /Users/kirtipriya/.gemini/antigravity/scratch/healthcare-website-design
   ```
5. Click **Open**.

---

 Running the Website

All dependencies are already installed!

1. Open the integrated terminal in VS Code:
   - Shortcut: <kbd>Ctrl</kbd> + <kbd>`</kbd> (or **Terminal > New Terminal**)
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open your browser at:
   ```
   http://localhost:5173
   ```

Alternatively, you can run it using VS Code Tasks:
- Go to menu **Terminal > Run Task... > npm: dev (Start Development Server)**

---

Available Scripts

- `npm run dev` — Starts local Vite development server with Hot Module Replacement (HMR).
- `npm run build` — Compiles TypeScript and builds production bundles into `dist/`.
- `npm run preview` — Previews the production build locally.

---
Project Structure

```
healthcare-website-design/
├── .vscode/               # Pre-configured VS Code tasks and debug launch settings
├── src/
│   ├── app/
│   │   ├── components/    # Header, Hero, Services, Features, HealthRecords, About, Contact, Footer
│   │   │   └── ui/        # Accessible Radix UI components
│   │   └── App.tsx        # Main application layout
│   ├── styles/            # Tailwind CSS v4 & theme styling
│   └── main.tsx           # React DOM root entry point
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript & path alias configuration (@/*)
└── vite.config.ts         # Vite build configuration
```

  
