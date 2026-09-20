import skillsData from '../data/skills.json';
import type { Skill } from '../types';

const skills = skillsData as Skill[];

interface SkillTagProps {
  skillId: number;
  onClick: (skillId: number) => void;
}

export default function SkillTag({ skillId, onClick }: SkillTagProps) {
  const skill = skills.find((s) => s.id === skillId);

  // If a project references a skill id that no longer exists in skills.json,
  // skip it silently instead of crashing.
  if (!skill) return null;

  return (
    <button
      type="button"
      className="skill-tag"
      onClick={(event) => {
        // Prevent this click from also triggering the project card's own onClick.
        event.stopPropagation();
        onClick(skill.id);
      }}
    >
      {skill.name}
    </button>
  );
}
