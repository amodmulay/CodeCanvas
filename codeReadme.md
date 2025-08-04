
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
    - `login/page.tsx`: The user login page.
    - `onboarding/page.tsx`: The developer onboarding selection page.
    - `register/page.tsx`: The new developer registration page.
    - `workspace/page.tsx`: The workspace selection page.
    - `develop/page.tsx`: The VS Code-like development environment page.
- **`src/components/code-canvas`**: Contains components specific to the code canvas functionality.
    - `editor-tabs.tsx`: Manages and displays the open files in tabs, including support for rendering Mermaid diagrams.
    - `file-explorer.tsx`: Provides a file explorer interface.
    - `chat-panel.tsx`: Component for the "PAC Coding Agent" with model selection.
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

- **Landing Page**: The main entry point of the application is `src/app/page.tsx`, which provides an overview and a link to the login flow. It features an animated text element.
- **Authentication & Onboarding**:
    - `src/app/login/page.tsx`: Handles user authentication with email/password or GitHub.
    - `src/app/onboarding/page.tsx`: Allows new developers to select an onboarding path (internal or external).
    - `src/app/register/page.tsx`: A simulated registration form for new developers.
- **Workspace Selection**: After login, `src/app/workspace/page.tsx` allows users to select a development environment (e.g., Android, Python).
- **Development Environment**: The `src/app/develop/page.tsx` component is the main IDE interface.
    - **User Profile**: A profile icon in the header allows users to switch themes and log out.
    - **File Navigation and Display**: `src/components/code-canvas/file-explorer.tsx` handles file browsing, and `src/components/code-canvas/editor-tabs.tsx` displays file content.
    - **Source Control & Build System**: `src/components/code-canvas/source-control-panel.tsx` manages Git changes, and the "Build System" panel in `src/app/develop/page.tsx` simulates an ArgoCD view.
    - **Integrated Terminal**: The `src/components/code-canvas/terminal-panel.tsx` provides terminal functionality.
    - **AI Agent**: The `src/components/code-canvas/chat-panel.tsx` provides an AI assistant with selectable models.
- **Layout and UI**: The overall layout of the IDE is managed by components within `src/components/code-canvas`. Reusable UI components are in `src/components/ui`.
- **State Management**: State for open files and the active file is handled in `develop/page.tsx` using React state and `localStorage`.
- **Styling**: Tailwind CSS is used for styling, with configuration in `tailwind.config.ts` and global styles in `src/app/globals.css`.
- **AI Features**: Files in `src/ai` are related to any AI-driven features implemented in the application.
- **Utility Functions**: Common utility functions are in `src/lib/utils.ts`.
