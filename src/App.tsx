import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';

// Add a value here (and a matching entry in Navbar.tsx) if you add a page.
export type Page = 'home' | 'projects' | 'skills';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  // Which skill card to scroll to & highlight when the Skills page opens.
  // Set by a skill tag click on a project card, cleared once the highlight has shown.
  const [highlightSkillId, setHighlightSkillId] = useState<number | null>(null);

  function goToSkill(skillId: number) {
    setHighlightSkillId(skillId);
    setPage('skills');
  }

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} />
      <main className="page-container">
        {page === 'home' && <Home />}
        {page === 'projects' && <Projects onSkillClick={goToSkill} />}
        {page === 'skills' && (
          <Skills
            highlightSkillId={highlightSkillId}
            onHighlightDone={() => setHighlightSkillId(null)}
          />
        )}
      </main>
    </div>
  );
}
