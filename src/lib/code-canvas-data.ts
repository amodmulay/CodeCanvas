
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

Welcome to Panasonic Avionics Corporation! 

# Panasonic Avionics Studio

Technologies that are being evaluated for this topic
1. Eclipse Theia platform: https://theia-ide.org/theia-platform/

An Open, Flexible and Extensible Platform to efficiently develop and deliver Cloud & Desktop IDEs and tools with modern web technologies. The Theia IDE is a standard IDE built on the Theia Platform.

A versatile framework for developing custom tools and IDEs, suitable for desktop or cloud environments. Its modularity and extensibility make it applicable for a wide range of applications beyond standard coding environments.

The open-source initiative by the Eclipse Foundation, encompassing the Theia platform and the Theia IDE. It aims to provide a robust foundation for building modern tools and IDEs. While Theia reuses components from VS Code, such as the Monaco editor, it is independently developed with a modular architecture, Theia is not a fork of VS Code, see also "Is forking VS Code a good idea?"

An out-of-the-box IDE built on the Theia platform, combining flexibility with modern web technologies. It supports the Language Server Protocol (LSP), the Debug Adapter Protocol (DAP), and integrates the Monaco Code Editor.

2. VS Code

A popular code editor developed by Microsoft, known for its extensive features, ease of use, and rich ecosystem of extensions available through the VS Code Marketplace. It includes some proprietary components and telemetry.

# Similarities Between Theia IDE and VS code

Before diving into their differences, it is important to acknowledge the substantial similarities between Theia IDE and VS Code:

1. Monaco Code Editor: Both Theia IDE and VS Code use the Monaco Code Editor, which provides a powerful and versatile code editing experience.

2. Language Server Protocol (LSP): Both IDEs support LSP, enabling consistent and efficient language support, which is crucial for modern development environments.

3. Debug Adapter Protocol (DAP): DAP is also supported by both Theia IDE and VS Code, providing robust debugging capabilities that developers rely on.

4. VS Code Extensions: Theia IDE is compatible with VS Code extensions through the Open VSX registry, allowing users to enhance their development environment from the huge ecosystem of available VS Code extensions.

5. User Experience Concept: Both Theia IDE and VS Code prioritize a streamlined and efficient user experience. Theia IDE, by default, mirrors many of the UX concepts found in VS Code but offers greater flexibility for customization to meet specific needs, e.g. via a user-customizable toolbar and how views can be layouted.

# Differences Between the Theia IDE vs. VS Code

1. Features

Both Theia IDE and VS Code leverage the Monaco Code Editor and support LSP and DAP. Therefore, the core feature set of both tools is very similar. VS Code offers some exclusive features such as the 3-way merge editor. In turn, the The Theia IDE offers additional features such as detachable views (e.g., the terminal), an enhanced tab preview, and a customizable toolbar, enhancing the user experience. It also has features interesting for corporate environments such as the support for multiple extension registries (see next section).

Many relevant features for both tools are provided by VS Code extensions, which can be installed into both tools. Some of the latest feature additions in VS Code, like Live Share, Copilot, and remote development, were unfortunately provided as proprietary extensions. This means they are not open source, are exclusive to the VS Code product, and are not available in Theia, Code OSS, or VSCodium. In these cases, the Theia community often strives toward open alternatives.

For example, Theia IDE now offers AI support, a new feature that enables AI-driven code completion, intelligent chat assistance, terminal support, and more, while providing users with full transparency and control over AI interactions. This is a response to proprietary solutions like GitHub Copilot.

Additionally, Theia introduced Open Collaboration tools, which allow for live, real-time collaboration without vendor lock-in, providing an open alternative to VS Code’s closed-source Live Share extension.

In summary, the feature set of the Theia IDE and VS Code is very similar. The differences might be important for some users and influence their tool choice, for others, the differences might not matter at all. We observe a tendency that some newer features in VS Code are closed source and sometimes subscription-based, a trend that might continue. In Theia, the available feature set is community-driven—contributors can influence it easily—and implementations are always completely open.

2. Extensibility and Customization

VS Code supports extensibility primarily through VS Code extensions, which are limited to the APIs provided by VS Code. Theia IDE is compatible with the VS Code extension API and can host almost all VS Code extensions. As Theia has to implement any new API after VS Code has published it, it is usually one month behind. However, this does not really play a role in practice, as extensions usually do not pick up new API that fast. Extensions can be installed into VS Code from the VS Code marketplace, Theia uses openVSX by default (and can be adapted to any compatible registry). The VS Code marketplace hosts more extensions, but openVSX offers the important and popular ones as well (excluding proprietary ones mentioned before).

Additionally, Theia enables users to control which extension registry it connects to for installing VS Code extensions. While the Open VSX registry is a popular choice, users can also opt for other registries, including self-hosted ones. This control over extensions is particularly beneficial in corporate environments, where security and compliance are paramount, especially considering recent security risks associated with VS Code extensions.

While the VS Code extension model is simple and strives for isolation from the core application, it considerably restricts the extent of customization possible in VS Code. The Theia IDE is based on the Theia platform, which is by itself highly extensible and customizable, thanks to its modular architecture. Via the underlying platform, Theia provides a second extension mechanism–called “Theia extension”–that is not limited to a specific API as VS Code extensions are. Therefore, adopters can modify the workbench, add custom features, and even remove default elements. Theia’s flexible architecture allows it to be adapted for a variety of use cases, from simple code editing to complex, domain-specific tools. This might not be relevant for users who just want to download and use a generic IDE. However, if you look for an IDE that you can customize to a specific use case or environment, e.g. a corporate set-up, this extensibility comes in handy. The flexible architecture also allows the Theia community to develop features that can then be optionally deployed into tools based on Theia. As an example, the Theia IDE, as a tool based on Theia, can decide whether it wants to include specific features provided by the platform and users can revise this decision.


In a nutshell, both VS Code and the Theia IDE support VS Code extensions and can therefore benefit from a huge ecosystem of available features. Additionally, the Theia IDE is based on the modular Theia platform and therefore allows deep customizations without forking the code.


\`\`\`mermaid
flowchart TD
    A[Start] --> B{Is it responsive?};
    B -- Yes --> C[Check accessibility];
    B -- No --> D[Apply responsive styles];
    D --> C;
    C -- Yes --> F[Launch!];
    C -- No --> E[Improve accessibility];
    E --> F;
\`\`\`
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
