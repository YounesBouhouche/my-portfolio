import { type ReactNode } from 'react';

interface ProjectLayoutProps {
  children?: ReactNode;
  title: string;
  subtitle: string;
  category: string;
  developer?: string;
  version: string;
  lastUpdated: string;
  heroImage: string;
  appImage: string;
  screenshots: string[];
  description: string;
  features: string[];
  technologies: string[];
  downloadUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  requirements?: string[];
}

export default function ProjectLayout({
  children,
  title,
  subtitle,
  category,
  developer = "YounesBouhouche",
  version,
  lastUpdated,
  heroImage,
  appImage,
  screenshots = [],
  description,
  features = [],
  technologies = [],
  downloadUrl,
  githubUrl,
  demoUrl,
  requirements = []
}: ProjectLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div 
        className="relative h-screen min-h-[800px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-slate-950"></div>
        <div className="absolute bottom-0 w-full z-10 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
            <div className="flex flex-col items-center   lg:flex-row gap-8 w-full">
              <div className="lg:w-1/4 flex-shrink-0">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border border-gray-600 bg-black/20 backdrop-blur-sm">
                  <img 
                    src={appImage} 
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="lg:w-3/4 space-y-6 text-center lg:text-left">
                <div>
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-600 text-blue-100 rounded-full text-sm font-medium">
                      {category}
                    </span>
                    <span className="text-gray-300 text-sm">by {developer}</span>
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">{title}</h1>
                  <p className="text-xl lg:text-2xl text-gray-200 drop-shadow-md">{subtitle}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {downloadUrl && (
                    <a
                      href={downloadUrl}
                      className="px-8 py-3 bg-primary hover:bg-primary/80 text-black font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Download
                    </a>
                  )}
                  {demoUrl && (
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Live Demo
                    </a>
                  )}
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 border-2 border-gray-400 hover:border-gray-200 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10"
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
              <section>
                <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {screenshots.map((screenshot, index) => (
                    <div key={index} className="rounded-xl overflow-hidden shadow-lg border border-gray-600 hover:shadow-2xl transition-shadow duration-300">
                      <img 
                        src={screenshot} 
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
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
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <span className="text-primary text-xl">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Custom Content */}
            {children && (
              <section>
                {children}
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Project Info Card */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4">Project Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Updated</span>
                  <span>{lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Version</span>
                  <span>{version}</span>
                </div>
              </div>
            </div>

            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm border border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {requirements.length > 0 && (
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {requirements.map((req, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
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