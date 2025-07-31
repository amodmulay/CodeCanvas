
## Project Structure

This project, Avionics, is structured as a Next.js application with TypeScript and Tailwind CSS. The core components are organized within the `src` directory.

- **`.idx`**: Contains development-related files, including the Nix environment configuration (`dev.nix`) and an icon (`icon.png`).
- **`docs`**: Contains project documentation, including the `blueprint.md` file which details the application's core features and style guidelines.
- **`src/ai`**: Contains files related to artificial intelligence features, such as `dev.ts` and `genkit.ts`.
- **`src/app`**: Contains the main application pages and layout components.
    - `favicon.ico`: Application favicon.
    - `globals.css`: Global styles.
    - `layout.tsx`: Root layout component.
    - `page.tsx`: The application's main landing page.
    - `develop/page.tsx`: The VS Code-like development environment page.
- **`src/components/code-canvas`**: Contains components specific to the code canvas functionality.
    - `editor-tabs.tsx`: Manages and displays the open files in tabs, including support for rendering Mermaid diagrams.
    - `file-explorer.tsx`: Provides a file explorer interface.
    - `ide-sidebar.tsx`: The main sidebar component for the IDE layout.
    - `mermaid-chart.tsx`: A component specifically for rendering Mermaid diagrams from text.
    - `source-control-panel.tsx`: Component for source control features.
    - `terminal-panel.tsx`: Component for the integrated terminal.
- **`src/components/ui`**: Contains reusable UI components built with Tailwind CSS and Shadcn UI.
- **`src/hooks`**: Contains custom React hooks.
    - `use-mobile.tsx`: Hook for detecting mobile devices.
    - `use-toast.ts`: Hook for displaying toasts/notifications.
- **`src/lib`**: Contains utility functions and data types.
    - `code-canvas-data.ts`: Defines data structures for the code canvas.
    - `utils.ts`: General utility functions.

## Core Functionality Mapping:

- **Landing Page**: The main entry point of the application is `src/app/page.tsx`, which provides an overview and a link to the development environment.
- **File Navigation and Display**: The `src/components/code-canvas/file-explorer.tsx` component handles file browsing. `src/components/code-canvas/editor-tabs.tsx` is responsible for displaying the content of selected files, and it uses `src/components/code-canvas/mermaid-chart.tsx` to render any Mermaid diagrams found in Markdown files.
- **Integrated Terminal**: The `src/components/code-canvas/terminal-panel.tsx` component provides the integrated terminal functionality.
- **Layout and UI**: The overall layout of the IDE is managed by components within `src/components/code-canvas`. This now includes a `Menubar` at the top of the development page for global actions. Reusable UI components are located in `src/components/ui`.
- **State Management**: State persistence and management of open files and the active file is handled within the `develop/page.tsx` component, utilizing React's state management and `localStorage`.
- **Styling**: Tailwind CSS is used for styling, with the configuration in `tailwind.config.ts` and global styles in `src/app/globals.css`. The style guidelines are documented in `docs/blueprint.md`.
- **AI Features**: Files in `src/ai` are related to any AI-driven features implemented in the application.
- **Utility Functions**: Common utility functions used throughout the project are located in `src/lib/utils.ts`.
