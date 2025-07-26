
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

export const apiDocs: File[] = [
    { id: 'android-api-doc', name: 'Android API', content: 'Comprehensive documentation for the Android API...', type: 'file' },
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
