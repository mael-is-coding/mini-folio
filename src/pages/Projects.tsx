import { useState } from 'react';
import projectsData from '../data/projects.json';
import type { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';
import StatusMarker from '../components/StatusMarker';
import SkillTag from '../components/SkillTag';

const projects = projectsData as Project[];

interface ProjectsProps {
  // called when a skill tag is clicked, so App can switch to the Skills page
  onSkillClick: (skillId: number) => void;
}

export default function Projects({ onSkillClick }: ProjectsProps) {
  // id of the project whose popup is currently open (null = no popup)
  const [openProjectId, setOpenProjectId] = useState<number | null>(null);
  const openProject = projects.find((p) => p.id === openProjectId) ?? null;

  return (
    <section>
      <h2 className="section-title">Projects</h2>

      <div className="card-list">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpen={setOpenProjectId}
            onSkillClick={onSkillClick}
          />
        ))}
      </div>

      {openProject && (
        <Modal onClose={() => setOpenProjectId(null)}>
          <div className="modal-top">
            <h3>{openProject.name}</h3>
            <StatusMarker status={openProject.status} />
          </div>
          <p className="modal-dates">
            {openProject.date_started} — {openProject.date_ended ?? 'present'}
          </p>
          <p className="modal-long-desc">{openProject.long_desc}</p>
          <div className="card-tags">
            {openProject.skills.map((skillId) => (
              <SkillTag key={skillId} skillId={skillId} onClick={onSkillClick} />
            ))}
          </div>
        </Modal>
      )}
    </section>
  );
}
