import { Link } from '@tanstack/react-router';
import './ProjectCard.css';

export default function ProjectCard(
  { title, description, imageUrl, projectUrl, pictureInLeft = true }:
  { title: string; description: string; imageUrl: string; projectUrl: string, pictureInLeft?: boolean }
) {
  return (
    <div className={"glass-container mx-4 lg:mx-20 flex flex-col " + (pictureInLeft ? 'lg:flex-row' : 'lg:flex-row-reverse')}>
      <img src={imageUrl} alt={title} className='rounded-xl w-full shrink-0 lg:shrink lg:w-1/2' />
      <div className='p-6 lg:p-10 w-full lg:w-1/2 flex flex-col justify-center space-y-5'>
        <h3 className='text-4xl font-bold mb-5'>{title}</h3>
        
        {/* Terminal-style container for description */}
        <div className='terminal-window w-full'>
          <div className='terminal-header'>
            <div className='terminal-buttons'>
              <span className='terminal-button close'></span>
              <span className='terminal-button minimize'></span>
              <span className='terminal-button maximize'></span>
            </div>
            <span className='terminal-title'>project-info.txt</span>
          </div>
          <div className='terminal-body'>
            <p className='terminal-text'>{description}</p>
          </div>
        </div>
        
        <Link to={projectUrl} className='terminal-button-link mt-5 px-10 py-5 w-fit text-center'>
          <span>View Project</span>
        </Link>
      </div>
    </div>
    
  );
}