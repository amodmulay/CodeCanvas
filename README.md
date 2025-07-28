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
