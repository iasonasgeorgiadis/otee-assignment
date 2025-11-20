import type { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AIKnowledgeBase } from '../components/AIKnowledgeBase';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import type { ProjectBrowserState } from '../components/ProjectBrowser';
import { ProjectBrowser } from '../components/ProjectBrowser';
import { RightRail } from '../components/RightRail';
import type { AIKnowledgeBaseScreen } from '../components/AIKnowledgeBase';
import './OTeeAssignment2.css';

/**
 * OTeeAssignment2 - Fresh implementation of the 3-column workspace layout
 *
 * Features:
 * - Full viewport 3-column layout (Header, ProjectBrowser, Main Content, RightRail, Footer)
 * - Expandable/collapsible left sidebar
 * - Yellow button in right rail controls main content screens
 * - Responsive design across all breakpoints
 */
export const OTeeAssignment2: FC = () => {
  // State management
  const [sidebarState, setSidebarState] = useState<ProjectBrowserState>('expanded');
  const [railSelected, setRailSelected] = useState(false);
  const [knowledgeBaseScreen, setKnowledgeBaseScreen] = useState<AIKnowledgeBaseScreen>('empty');

  // Prevent background scrolling on full-height layout
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // CSS class computation
  const rootClassName = useMemo(() => {
    return [
      'otee-assignment2',
      `otee-assignment2--sidebar-${sidebarState}`
    ].filter(Boolean).join(' ');
  }, [sidebarState]);

  // Event handlers
  const handleSidebarToggle = useCallback((nextState: ProjectBrowserState) => {
    setSidebarState(nextState);
  }, []);

  const handleRailToggle = useCallback((isSelected: boolean) => {
    setRailSelected(isSelected);
    // Cycle through screens when yellow button is clicked
    if (isSelected) {
      // When activating, start with upload screen
      setKnowledgeBaseScreen('upload');
    } else {
      // When deactivating, go back to empty
      setKnowledgeBaseScreen('empty');
    }
  }, []);

  const handleKnowledgeBaseScreenChange = useCallback((nextScreen: AIKnowledgeBaseScreen) => {
    setKnowledgeBaseScreen(nextScreen);
    // Update rail state based on screen
    setRailSelected(nextScreen !== 'empty');
  }, []);

  return (
    <div className={rootClassName}>
      {/* Header */}
      <Header className="otee-assignment2__header" />

      {/* Main content area */}
      <main className="otee-assignment2__main" aria-label="OTee workspace">
        <div className="otee-assignment2__grid">
          {/* Left sidebar - Project Browser */}
          <aside className="otee-assignment2__sidebar" aria-label="Project browser">
            <ProjectBrowser
              expanded={sidebarState === 'expanded'}
              onToggle={handleSidebarToggle}
            />
          </aside>

          {/* Middle content area - AI Knowledge Base */}
          <section className="otee-assignment2__canvas" aria-label="Main content">
            <div className="otee-assignment2__canvas-inner">
              <AIKnowledgeBase
                screen={knowledgeBaseScreen}
                onScreenChange={handleKnowledgeBaseScreenChange}
              />
            </div>
          </section>

          {/* Right rail - Action buttons */}
          <aside className="otee-assignment2__rail" aria-label="Right toolbar">
            <RightRail
              selected={railSelected}
              onToggle={handleRailToggle}
            />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <div className="otee-assignment2__footer">
        <Footer />
      </div>
    </div>
  );
};

OTeeAssignment2.displayName = 'OTeeAssignment2';
