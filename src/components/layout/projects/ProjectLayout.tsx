import type { Project } from "../../../types/Project";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ProjectLayout({ project }: { project: Project }) {
  const {
    name,
    description,
    features,
    technologies,
    requirements = [],
    lastUpdated,
    downloadLink,
    liveDemoLink,
    githubLink,
    heroImage,
    image,
    screenshots = [],
  } = project;

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <div
        className="relative h-screen min-h-[800px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-slate-950"></div>
        <div className="absolute bottom-0 w-full z-10 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
            <div className="flex flex-col items-center   lg:flex-row gap-8 w-full">
              <div className="lg:w-1/4 flex-shrink-0">
                <div className="aspect-square overflow-hidden shadow-2xl border border-gray-600 bg-black/20 backdrop-blur-sm">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full bg-white object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="lg:w-3/4 space-y-6 text-center lg:text-left">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                    {name}
                  </h1>
                  <p className="text-xl lg:text-2xl text-gray-200 drop-shadow-md">
                    {description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {downloadLink && (
                    <a
                      href={downloadLink}
                      className="px-8 py-3 bg-primary hover:bg-primary/80 text-black font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Download
                    </a>
                  )}
                  {liveDemoLink && (
                    <a
                      href={liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Live Demo
                    </a>
                  )}
                  {githubLink && (
                    <a
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 border-2 border-gray-400 hover:border-gray-200 text-white font-bold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Screenshots */}
            {screenshots.length > 0 && (
              <section className="w-full">
                <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
                <div className="flex gap-6 w-full overflow-x-auto">
                  {screenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      className="shrink-0 overflow-hidden shadow-lg border border-gray-600 hover:shadow-2xl transition-shadow duration-300"
                    >
                      <img
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        className="w-60 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-6">About this project</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {description}
                </p>
              </div>
            </section>

            {/* Features */}
            {features.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                <div className="grid gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-800/50 border border-gray-700"
                    >
                      <span className="text-primary text-xl">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Project Info Card */}
            <div className="bg-gray-800/50 p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4">Project Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Updated</span>
                  <span>{lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="bg-gray-800/50 p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-gray-300 text-sm border border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {requirements.length > 0 && (
              <div className="bg-gray-800/50 p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {requirements.map((req, index) => (
                    <li
                      key={index}
                      className="text-gray-300 text-sm flex items-start gap-2"
                    >
                      <span className="text-primary">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
