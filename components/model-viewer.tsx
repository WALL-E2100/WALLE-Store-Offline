"use client";
import { useEffect, useState } from "react";

// Allow using the custom <model-viewer> element in TSX without type errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

interface ModelViewerProps {
  modelPath: string;
  modelName: string;
  heroName: string;
}

export default function ModelViewer({
  modelPath,
  modelName,
  heroName,
}: ModelViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load the model-viewer library
    import("@google/model-viewer").catch(() => {
      setError("Failed to load model-viewer library");
    });
    setLoading(false);
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-800/50 rounded-lg">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    // keep container backgrounds transparent so the <model-viewer> blends into the page
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-transparent">
      <model-viewer
        src={modelPath}
        alt={heroName}
        autoplay
        camera-controls
        ar
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
        }}
        className="w-full h-full"
      />

      {/* subtle label — kept minimal and translucent so it doesn't break the visual blend */}
      <div className="absolute bottom-3 left-3 bg-black/30 px-2 py-1 rounded text-xs">
        <p className="text-cyan-200 font-medium">{heroName}</p>
      </div>
    </div>
  );
}
