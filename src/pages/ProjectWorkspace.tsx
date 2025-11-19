import type { FC } from 'react';
import { useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ProjectBrowser } from '../components/ProjectBrowser';
import { RightRail } from '../components/RightRail';
import './ProjectWorkspace.css';

export const ProjectWorkspace: FC = () => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="project-workspace">
      <Header />
      <main className="project-workspace__main" aria-label="Project workspace layout">
        <div className="project-workspace__grid">
          <aside className="project-workspace__sidebar" aria-label="Project browser">
            <ProjectBrowser className="project-workspace__sidebar-panel" />
          </aside>

          <section className="project-workspace__canvas" aria-label="Workspace canvas">
            <div className="project-workspace__placeholder" role="presentation">
              <span className="project-workspace__placeholder-label">Workspace Canvas Placeholder</span>
            </div>
          </section>

          <aside className="project-workspace__rail" aria-label="Right rail">
            <RightRail className="project-workspace__rail-panel" />
          </aside>
        </div>
      </main>
      <div className="project-workspace__footer">
        <Footer />
      </div>
    </div>
  );
};
