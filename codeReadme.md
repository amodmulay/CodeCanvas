## Project Structure

This project, Panasonic Avionics, is structured as a Next.js application with TypeScript and Tailwind CSS. The core components are organized within the `src` directory.

- **`.idx`**: Contains development-related files, including the Nix environment configuration (`dev.nix`) and an icon (`icon.png`).
- **`docs`**: Contains project documentation, including the `blueprint.md` file which details the application's core features and style guidelines.
- **`src/ai`**: Contains files related to artificial intelligence features, such as `dev.ts` and `genkit.ts`.
- **`src/app`**: Contains the main application pages and layout components.
    - `favicon.ico`: Application favicon.
    - `globals.css`: Global styles.
    - `layout.tsx`: Root layout component.
    - `page.tsx`: Home page component.
    - `develop/page.tsx`: Development page component.
- **`src/components/code-canvas`**: Contains components specific to the code canvas functionality.
    - `editor-tabs.tsx`: Manages and displays the open files in tabs.
    - `file-explorer.tsx`: Provides a file explorer interface.
    - `ide-sidebar.tsx`: The main sidebar component for the IDE layout.
    - `mermaid-chart.tsx`: Component for rendering Mermaid diagrams.
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

- **File Navigation and Display**: The `src/components/code-canvas/file-explorer.tsx` component handles file browsing, while `src/components/code-canvas/editor-tabs.tsx` is responsible for displaying the content of selected files in a tabbed interface.
- **Integrated Terminal**: The `src/components/code-canvas/terminal-panel.tsx` component provides the integrated terminal functionality.
- **Layout and UI**: The overall layout of the IDE, including the sidebar, editor area, and terminal, is managed by components within `src/components/code-canvas` and the reusable UI components in `src/components/ui`.
- **State Management**: State persistence and management of open files and active file is handled within the relevant components, likely utilizing React's state management capabilities.
- **Styling**: Tailwind CSS is used for styling, with the configuration in `tailwind.config.ts` and global styles in `src/app/globals.css`. The style guidelines are documented in `docs/blueprint.md`.
- **AI Features**: Files in `src/ai` are related to any AI-driven features implemented in the application.
- **Utility Functions**: Common utility functions used throughout the project are located in `src/lib/utils.ts`.