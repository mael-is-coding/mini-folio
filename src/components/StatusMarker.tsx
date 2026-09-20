import type { Project } from '../types';

// Edit these two maps if you want different wording or symbols for each status.
const STATUS_LABELS: Record<Project['status'], string> = {
  ongoing: 'Ongoing',
  standby: 'On standby',
  finished: 'Finished',
};

const STATUS_GLYPHS: Record<Project['status'], string> = {
  ongoing: '●',
  standby: '◐',
  finished: '○',
};

export default function StatusMarker({ status }: { status: Project['status'] }) {
  return (
    <span className={`status status-${status}`}>
      <span className="status-glyph">{STATUS_GLYPHS[status]}</span>
      {STATUS_LABELS[status]}
    </span>
  );
}
