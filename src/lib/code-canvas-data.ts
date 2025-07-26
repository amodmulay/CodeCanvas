
export interface File {
  id: string;
  name: string;
  content: string;
  type: 'file';
}

export interface Folder {
  id: string;
  name: string;
  children: (File | Folder)[];
  type: 'folder';
}

export type FileSystemNode = File | Folder;

const readmeContent = `
# Panasonic Avionics Corporation

Welcome to Panasonic Avionics Corporation! This is a simple interactive web page designed to emulate the visual layout and feel of VS Code.

## Features

- **File Explorer**: An interactive sidebar to navigate through a mock file system.
- **Tabbed Editor**: View and switch between multiple "open" files.
- **Integrated Terminal**: A collapsible panel simulating a terminal.
- **State Persistence**: Your open files are saved in your browser's local storage.

Enjoy exploring the demo!
`;

const pageTsxContent = `
"use client";

import * as React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
      </div>
    </main>
  );
}
`;

const packageJsonContent = `
{
  "name": "panasonic-avionics-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "^18",
    "react-dom": "^18",
    "lucide-react": "^0.378.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8",
    "tailwindcss": "^3.4.1"
  }
}
`;

const telemetryTsContent = `
import { NextApiRequest, NextApiResponse } from 'next';

// A mock in-memory store for telemetry data
const telemetryDataStore: Record<string, any[]> = {};

/**
 * Represents a single telemetry event.
 */
interface TelemetryEvent {
  timestamp: number;
  source: 'cuttlefish' | 'graviton';
  type: 'performance' | 'error' | 'usage';
  payload: Record<string, any>;
}

/**
 * @swagger
 * /api/telemetry:
 *   post:
 *     description: Ingests a new telemetry event from a device.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: string
 *               event:
 *                 $ref: '#/components/schemas/TelemetryEvent'
 *     responses:
 *       201:
 *         description: Event successfully ingested.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { deviceId, event }: { deviceId: string; event: TelemetryEvent } = req.body;
    
    if (!deviceId || !event) {
      return res.status(400).json({ message: 'Missing deviceId or event data.' });
    }

    if (!telemetryDataStore[deviceId]) {
      telemetryDataStore[deviceId] = [];
    }

    telemetryDataStore[deviceId].push(event);

    console.log(\`Received event from \${deviceId}: \`, event);
    return res.status(201).json({ message: 'Event ingested' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(\`Method \${req.method} Not Allowed\`);
}
`;

const androidAutoApiContent = `
# Android Auto App Library API Reference

This documentation provides a detailed reference for the Android Auto App Library, which enables developers to build navigation, parking, and charging apps for Android Auto.

---

## Core Components

The library is built around a few key components that manage the app's lifecycle and UI.

### 1. CarAppService

The entry point for your Android Auto app. This service is responsible for creating a \`Session\` when the car connects.

\`\`\`java
public class MyCarAppService extends CarAppService {
    @NonNull
    @Override
    public Session onCreateSession() {
        return new MySession();
    }
}
\`\`\`

### 2. Session

Manages the app's lifecycle, from connection to disconnection. It's responsible for creating the initial \`Screen\` to be displayed.

\`\`\`java
public class MySession extends Session {
    @NonNull
    @Override
    public Screen onCreateScreen(@NonNull Intent intent) {
        return new MainScreen(getCarContext());
    }
}
\`\`\`

### 3. Screen

Represents a screen in your app's UI. You manage the UI by pushing and popping screens from a screen stack.

\`\`\`java
public class MainScreen extends Screen {
    public MainScreen(@NonNull CarContext carContext) {
        super(carContext);
    }

    @NonNull
    @Override
    public Template onGetTemplate() {
        Row row = new Row.Builder()
            .setTitle("Welcome to Panasonic Avionics!")
            .addText("Select an option to continue.")
            .build();

        return new PaneTemplate.Builder(new Pane.Builder().addRow(row).build())
            .setHeaderAction(Action.APP_ICON)
            .build();
    }
}
\`\`\`

---

## UI Templates

Android Auto provides a set of curated templates to ensure a consistent and safe user experience.

- **PaneTemplate**: A template that shows a simple pane of information with rows of text.
- **GridTemplate**: Displays a grid of items, typically for selection.
- **PlaceListMapTemplate**: Shows a map with a corresponding list of places.
- **NavigationTemplate**: The primary template for turn-by-turn navigation apps.

### Example: Using a GridTemplate

\`\`\`java
GridItem item = new GridItem.Builder()
    .setTitle("System Diagnostics")
    .setText("View system status")
    .setImage(new CarIcon.Builder(R.drawable.ic_settings).build())
    .setOnClickListener(() -> {
        // Handle click event
    })
    .build();

return new GridTemplate.Builder()
    .setTitle("Main Menu")
    .addGridItem(item)
    .build();
\`\`\`

---

## Hardware Access

Access vehicle hardware data through the \`CarHardwareManager\`.

### Available Data:
- **CarInfo**: Model, year, make.
- **EnergyLevel**: Fuel or battery level.
- **Speed**: Vehicle speed.

### Example: Getting Vehicle Speed

\`\`\`java
CarHardwareManager hardwareManager = getCarContext().getCarService(CarHardwareManager.class);
Speed speed = hardwareManager.getCarSpeed();

speed.getDisplaySpeedMetersPerSecond().setListener(speedValue -> {
    // Update UI with the new speed
});
\`\`\`

For more details, refer to the official Android for Cars App Library documentation.
`;

export const apiDocs: File[] = [
    { id: 'android-api-doc', name: 'Android API', content: androidAutoApiContent, type: 'file' },
    { id: 'golang-doc', name: 'Golang Documentation', content: 'Extensive documentation for the Go programming language...', type: 'file' },
    { id: 'typescript-doc', name: 'TypeScript Documentation', content: 'Detailed documentation for TypeScript...', type: 'file' },
];

export const fileSystem: FileSystemNode[] = [
  {
    id: 'public',
    name: 'public',
    type: 'folder',
    children: [
      { id: 'favicon.ico', name: 'favicon.ico', type: 'file', content: '' },
      { id: 'logo.svg', name: 'logo.svg', type: 'file', content: '<svg>...</svg>' },
    ],
  },
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: 'app',
        name: 'app',
        type: 'folder',
        children: [
          {
            id: 'api',
            name: 'api',
            type: 'folder',
            children: [
              {
                id: 'auth',
                name: 'auth',
                type: 'folder',
                children: [
                  { id: 'route.ts', name: 'route.ts', type: 'file', content: '// Authentication API routes' },
                ]
              },
              { id: 'user.ts', name: 'user.ts', type: 'file', content: '// User API routes' },
              { id: 'telemetry.ts', name: 'telemetry.ts', type: 'file', content: telemetryTsContent },
            ],
          },
          { id: 'layout.tsx', name: 'layout.tsx', type: 'file', content: '// Root layout' },
          { id: 'page.tsx', name: 'page.tsx', type: 'file', content: pageTsxContent },
        ],
      },
      {
        id: 'components',
        name: 'components',
        type: 'folder',
        children: [
            {
                id: 'common',
                name: 'common',
                type: 'folder',
                children: [
                  { id: 'Button.tsx', name: 'Button.tsx', type: 'file', content: '// Button component' },
                  { id: 'Input.tsx', name: 'Input.tsx', type: 'file', content: '// Input component' },
                ]
            },
            {
                id: 'layout',
                name: 'layout',
                type: 'folder',
                children: [
                  { id: 'Header.tsx', name: 'Header.tsx', type: 'file', content: '// Header component' },
                  { id: 'Footer.tsx', name: 'Footer.tsx', type: 'file', content: '// Footer component' },
                ]
            }
        ],
      },
      {
        id: 'hooks',
        name: 'hooks',
        type: 'folder',
        children: [
          { id: 'use-auth.ts', name: 'use-auth.ts', type: 'file', content: '// Auth hook' },
        ],
      },
      {
        id: 'lib',
        name: 'lib',
        type: 'folder',
        children: [
          { id: 'utils.ts', name: 'utils.ts', type: 'file', content: '// Utility functions' },
        ],
      },
      {
        id: 'styles',
        name: 'styles',
        type: 'folder',
        children: [
          { id: 'globals.css', name: 'globals.css', type: 'file', content: '/* Global styles */' },
        ],
      },
    ],
  },
  { id: '.eslintrc.json', name: '.eslintrc.json', type: 'file', content: '{ "extends": "next/core-web-vitals" }' },
  { id: 'next.config.js', name: 'next.config.js', type: 'file', content: '/** @type {import(\'next\').NextConfig} */\nconst nextConfig = {};\nmodule.exports = nextConfig;' },
  { id: 'package.json', name: 'package.json', type: 'file', content: packageJsonContent },
  { id: 'readme', name: 'README.md', type: 'file', content: readmeContent },
  { id: 'tsconfig.json', name: 'tsconfig.json', type: 'file', content: '{ "compilerOptions": { ... } }' },
];

const flattenNodes = (nodes: FileSystemNode[]): File[] => {
  let files: File[] = [];
  for (const node of nodes) {
    if (node.type === 'file') {
      files.push(node);
    } else {
      files = files.concat(flattenNodes(node.children));
    }
  }
  return files;
};

const allFiles = [...flattenNodes(fileSystem), ...apiDocs];

export const getFileById = (id: string): File | undefined => {
    return allFiles.find(file => file.id === id);
}
