import { useState, useEffect } from 'react';
import skillsData from '../data/skills.json';
import projectsData from '../data/projects.json';
import type { Skill, Project } from '../types';
import SkillCard from '../components/SkillCard';
import Modal from '../components/Modal';

const skills = skillsData as Skill[];
const projects = projectsData as Project[];

interface SkillsProps {
  // set by App when a skill tag was clicked on a project; null on a normal visit
  highlightSkillId: number | null;
  // tells App the highlight has been shown and can be cleared
  onHighlightDone: () => void;
}

export default function Skills({ highlightSkillId, onHighlightDone }: SkillsProps) {
  // id of the skill whose popup is currently open (null = no popup)
  const [openSkillId, setOpenSkillId] = useState<number | null>(null);
  const openSkill = skills.find((s) => s.id === openSkillId) ?? null;

  // Runs after this page renders. If we were sent here to point at a specific
  // skill, scroll that card into view and clear the highlight a moment later.
  useEffect(() => {
    if (highlightSkillId === null) return;

    const card = document.getElementById(`skill-row-${highlightSkillId}`);
    card?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const timer = setTimeout(onHighlightDone, 2000);
    return () => clearTimeout(timer);
  }, [highlightSkillId, onHighlightDone]);

  // Projects that use the currently open skill, computed on the fly so it's
  // always in sync with projects.json — nothing to keep up to date by hand.
  const relatedProjects = openSkill
    ? projects.filter((project) => project.skills.includes(openSkill.id))
    : [];

  return (
    <section>
      <h2 className="section-title">Skills</h2>

      <div className="card-list">
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            index={index}
            highlighted={skill.id === highlightSkillId}
            onOpen={setOpenSkillId}
          />
        ))}
      </div>

      {openSkill && (
        <Modal onClose={() => setOpenSkillId(null)}>
          <div className="modal-top">
            <h3>{openSkill.name}</h3>
            <span className={`badge badge-${openSkill.category}`}>
              {openSkill.category === 'hard' ? 'Hard skill' : 'Soft skill'}
            </span>
          </div>
          <p className="modal-long-desc">{openSkill.description}</p>

          {relatedProjects.length > 0 && (
            <>
              <p className="modal-subheading">Used in</p>
              <ul className="modal-related-list">
                {relatedProjects.map((project) => (
                  <li key={project.id}>{project.name}</li>
                ))}
              </ul>
            </>
          )}
        </Modal>
      )}
    </section>
  );
}
