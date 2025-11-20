import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AIKnowledgeBaseScreen } from '../components/AIKnowledgeBase';
import { AIKnowledgeBase } from '../components/AIKnowledgeBase';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import type { ProjectBrowserState } from '../components/ProjectBrowser';
import { ProjectBrowser } from '../components/ProjectBrowser';
import { RightRail } from '../components/RightRail';
import './OTeeAssignment.css';

/**
 * OTeeAssignment recreates the Figma "Main" layout with a fixed left rail,
 * flexible canvas, and fixed right rail. The left rail can collapse and the
 * right rail’s primary (yellow) action drives AIKnowledgeBase screen changes.
 */
export const OTeeAssignment: FC = () => {
  const [sidebarState, setSidebarState] = useState<ProjectBrowserState>('expanded');
  const [railSelected, setRailSelected] = useState(false);
  const [knowledgeBaseScreen, setKnowledgeBaseScreen] = useState<AIKnowledgeBaseScreen>('empty');

  // Lock the viewport to prevent background scrolling behind the full-height layout
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const rootClassName = useMemo(() => {
    return [
      'otee-assignment',
      `otee-assignment--sidebar-${sidebarState}`
    ].join(' ');
  }, [sidebarState]);

  const handleSidebarToggle = useCallback((nextState: ProjectBrowserState) => {
    setSidebarState(nextState);
  }, []);

  const handleRailToggle = useCallback((isSelected: boolean) => {
    setRailSelected(isSelected);
    setKnowledgeBaseScreen(isSelected ? 'upload' : 'empty');
  }, []);

  const handleKnowledgeBaseScreenChange = useCallback((nextScreen: AIKnowledgeBaseScreen) => {
    setKnowledgeBaseScreen(nextScreen);
    setRailSelected(nextScreen !== 'empty');
  }, []);

  return (
    <div className={rootClassName}>
      <Header />

      <main className="otee-assignment__main" aria-label="OTee three-column workspace">
        <div className="otee-assignment__grid">
          <aside className="otee-assignment__sidebar" aria-label="Project browser column">
            <ProjectBrowser
              expanded={sidebarState === 'expanded'}
              onToggle={handleSidebarToggle}
            />
          </aside>

          <section className="otee-assignment__canvas" aria-label="AI knowledge base column">
            <div className="otee-assignment__canvas-inner">
              <AIKnowledgeBase
                screen={knowledgeBaseScreen}
                onScreenChange={handleKnowledgeBaseScreenChange}
              />
            </div>
          </section>

          <aside className="otee-assignment__rail" aria-label="Right rail column">
            <RightRail
              selected={railSelected}
              onToggle={handleRailToggle}
            />
          </aside>
        </div>
      </main>

      <div className="otee-assignment__footer">
        <Footer />
      </div>
    </div>
  );
};

OTeeAssignment.displayName = 'OTeeAssignment';
