import type { Project } from '../types';
import StatusMarker from './StatusMarker';
import SkillTag from './SkillTag';

interface ProjectCardProps {
  project: Project;
  index: number; // position in the list, used only for the little "01" label
  onOpen: (projectId: number) => void;
  onSkillClick: (skillId: number) => void;
}

export default function ProjectCard({ project, index, onOpen, onSkillClick }: ProjectCardProps) {
  return (
    <div className="card" onClick={() => onOpen(project.id)}>
      <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
      <div className="card-body">
        <div className="card-top">
          <h3 className="card-title">{project.name}</h3>
          <StatusMarker status={project.status} />
        </div>
        <p className="card-desc">{project.short_desc}</p>
        <div className="card-tags">
          {project.skills.map((skillId) => (
            <SkillTag key={skillId} skillId={skillId} onClick={onSkillClick} />
          ))}
        </div>
        <div className="card-dates">
          {project.date_started} — {project.date_ended ?? 'present'}
        </div>
      </div>
    </div>
  );
}
