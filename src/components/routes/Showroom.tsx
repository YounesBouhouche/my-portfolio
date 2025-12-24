import { useState } from "react";
import "./Showroom.css";

// Placeholder data for showroom items since we don't have actual images yet
const showroomItems = [
  {
    id: 1,
    title: "Neon Cityscape",
    description: "Cyberpunk inspired illustrated city skyline.",
    image: "https://placehold.co/600x400/09090b/3b82f6?text=Neon+City",
    tags: ["Vector", "Cyberpunk", "City"],
  },
  {
    id: 2,
    title: "Abstract Geometric",
    description: "Exploration of shapes and sharp angles.",
    image: "https://placehold.co/600x800/09090b/3b82f6?text=Geometric",
    tags: ["Abstract", "Geometry", "Minimal"],
  },
  {
    id: 3,
    title: "Logo Design Concept",
    description: "Modern minimalist logo for a tech startup.",
    image: "https://placehold.co/500x500/09090b/3b82f6?text=Logo+Concept",
    tags: ["Logo", "Branding"],
  },
  {
    id: 4,
    title: "Character Illustration",
    description: "Flat design character study.",
    image: "https://placehold.co/400x600/09090b/3b82f6?text=Character",
    tags: ["Character", "Flat Design"],
  },
  {
    id: 5,
    title: "Icon Set",
    description: "Custom icon set for a web application.",
    image: "https://placehold.co/800x400/09090b/3b82f6?text=Icon+Set",
    tags: ["Icons", "UI Assets"],
  },
  {
    id: 6,
    title: "Typography Experiment",
    description: "Custom lettering and typography layout.",
    image: "https://placehold.co/600x600/09090b/3b82f6?text=Typography",
    tags: ["Typography", "Lettering"],
  },
];

export default function Showroom() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  return (
    <div className="showroom-page min-h-screen bg-[#09090b] text-white pt-20">
      {/* Hero Section */}
      <div className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white">Design</span>
            <span className="text-primary">.Showroom</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A curated collection of my vector art, illustrations, and design
            experiments created with Adobe Illustrator.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {showroomItems.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid group relative cursor-pointer"
              onClick={() => setSelectedItem(item.id)}
            >
              <div className="relative overflow-hidden border border-white/5 bg-surface hover:border-primary/50 transition-all duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-primary mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-primary/20 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#09090b] border border-white/10 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors top-button"
              onClick={() => setSelectedItem(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {(() => {
              const item = showroomItems.find((i) => i.id === selectedItem);
              if (!item) return null;

              return (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto flex items-center justify-center bg-[#050505]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-w-full max-h-[70vh] object-contain"
                    />
                  </div>
                  <div className="p-6 bg-[#09090b] border-t border-white/5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {item.title}
                        </h2>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                      <div className="flex gap-2">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 bg-white/5 text-gray-300 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
