import type { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
  index: number; // position in the list, used only for the little "01" label
  highlighted: boolean; // true right after arriving here from a project's skill tag
  onOpen: (skillId: number) => void;
}

export default function SkillCard({ skill, index, highlighted, onOpen }: SkillCardProps) {
  return (
    <div
      // this id is how the Skills page scrolls to the right card, see pages/Skills.tsx
      id={`skill-row-${skill.id}`}
      className={`card${highlighted ? ' card-highlighted' : ''}`}
      onClick={() => onOpen(skill.id)}
    >
      <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
      <div className="card-body">
        <div className="card-top">
          <h3 className="card-title">{skill.name}</h3>
          <span className={`badge badge-${skill.category}`}>
            {skill.category === 'hard' ? 'Hard skill' : 'Soft skill'}
          </span>
        </div>
      </div>
    </div>
  );
}
