import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { AIKnowledgeBase } from '../components/AIKnowledgeBase';
import type { AIKnowledgeBaseScreen } from '../components/AIKnowledgeBase';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ProjectBrowser } from '../components/ProjectBrowser';
import { RightRail } from '../components/RightRail';
import './ProjectWorkspace.css';

export const ProjectWorkspace: FC = () => {
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<AIKnowledgeBaseScreen>('empty');

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Handle RightRail toggle - opens/closes knowledge base
  const handleRightRailToggle = useCallback((isSelected: boolean) => {
    setIsKnowledgeBaseOpen(isSelected);
    if (isSelected) {
      setCurrentScreen('upload');
    } else {
      // Reset to empty state when closing
      setCurrentScreen('empty');
    }
  }, []);

  // Handle screen changes from AIKnowledgeBase
  const handleScreenChange = useCallback((screen: AIKnowledgeBaseScreen) => {
    setCurrentScreen(screen);
    // Keep the rail selected if we're in any state other than empty
    if (screen !== 'empty') {
      setIsKnowledgeBaseOpen(true);
    }
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
            <div className="project-workspace__canvas-content">
              <AIKnowledgeBase
                screen={currentScreen}
                onScreenChange={handleScreenChange}
              />
            </div>
          </section>

          <aside className="project-workspace__rail" aria-label="Right rail">
            <RightRail
              className="project-workspace__rail-panel"
              selected={isKnowledgeBaseOpen}
              onToggle={handleRightRailToggle}
            />
          </aside>
        </div>
      </main>
      <div className="project-workspace__footer">
        <Footer />
      </div>
    </div>
  );
};
