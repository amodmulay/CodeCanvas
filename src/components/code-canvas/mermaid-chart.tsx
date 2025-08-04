"use client";

import mermaid from "mermaid";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface MermaidChartProps {
  content: string;
}

const extractMermaidContent = (text: string): string => {
  const match = text.match(/```mermaid([\s\S]*?)```/);
  return match ? match[1].trim() : "";
};

export const MermaidChart = ({ content }: MermaidChartProps) => {
  const [svg, setSvg] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === 'dark' ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit',
    });

    const renderMermaid = async () => {
      const mermaidContent = extractMermaidContent(content);
      if (mermaidContent) {
        try {
          // The render function needs a unique ID for each graph
          const { svg } = await mermaid.render(`mermaid-graph-${Date.now()}`, mermaidContent);
          setSvg(svg);
        } catch (error) {
          console.error("Error rendering mermaid chart:", error);
          setSvg(null);
        }
      }
    };

    renderMermaid();
  }, [content, theme]);

  const nonMermaidContent = content.substring(0, content.indexOf("```mermaid"));

  return (
    <div className="p-4">
      <pre className="font-code text-sm leading-relaxed whitespace-pre-wrap">
        <code className="text-foreground">{nonMermaidContent}</code>
      </pre>
      {svg ? (
        <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

    