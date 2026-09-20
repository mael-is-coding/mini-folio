import type { Page } from '../App';

interface NavbarProps {
  page: Page;
  setPage: (page: Page) => void;
}

// Add a page here (and to the Page type + App.tsx) if you ever want a fourth page.
const NAV_ITEMS: { key: Page; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Skills' },
];

export default function Navbar({ page, setPage }: NavbarProps) {
  return (
    <nav className="navbar">
      <span className="navbar-brand">Portfolio</span>
      <div className="navbar-links">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`navbar-link${page === item.key ? ' navbar-link-active' : ''}`}
            onClick={() => setPage(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
