// These types describe the shape of the JSON files in src/data/.
// If you add a field to a project or skill in the JSON, add it here too.

export interface Project {
  id: number; // unique, used to open the right popup and to cross-reference from skills
  name: string;
  skills: number[]; // references Skill.id
  status: 'ongoing' | 'standby' | 'finished';
  short_desc: string;
  long_desc: string;
  date_started: string; // free text, e.g. "2026-02" or "March 2026"
  date_ended: string | null; // null means "still ongoing / no end date yet"
}

export interface Skill {
  id: number;
  name: string;
  category: 'soft' | 'hard'; // as a union in case it's ever relevant to add a type of skill
  description: string; // shown in the popup when the skill card is clicked
}
