import { useCallback, useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { Button } from '../components/Button';
import { FileDropzone } from '../components/FileDropzone';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { RightRail } from '../components/RightRail';
import { ChatView, FilesListView, UploadView } from '../components/WorkspaceViews';
import './LandingPage.css';

type FlowState = 'empty' | 'upload' | 'filesList' | 'chat';

export const LandingPage: FC = () => {
  const [flowState, setFlowState] = useState<FlowState>('empty');
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSidePanelOpen) {
      panelRef.current?.focus();
    }
  }, [isSidePanelOpen, flowState]);

  const openPanelWithState = useCallback(
    (state: FlowState) => {
      if (state === 'empty') {
        setIsSidePanelOpen(false);
        setFlowState('empty');
        return;
      }

      setIsSidePanelOpen(true);
      setFlowState(state);
    },
    []
  );

  const handleFilesSelected = useCallback(
    (files: File[]) => {
      if (!files.length) {
        return;
      }

      openPanelWithState('upload');
    },
    [openPanelWithState]
  );

  const handleAnalyzeFiles = useCallback(() => {
    openPanelWithState('filesList');
  }, [openPanelWithState]);

  const handleContinueToChat = useCallback(() => {
    openPanelWithState('chat');
  }, [openPanelWithState]);

  const handleResetFlow = useCallback(() => {
    openPanelWithState('empty');
  }, [openPanelWithState]);

  const handleRailToggle = (selected: boolean) => {
    if (!selected) {
      handleResetFlow();
      return;
    }

    openPanelWithState(flowState === 'empty' ? 'upload' : flowState);
  };

  const renderSidePanelContent = () => {
    if (!isSidePanelOpen) {
      return null;
    }

    if (flowState === 'filesList') {
      return <FilesListView onContinue={handleContinueToChat} />;
    }

    if (flowState === 'chat') {
      return <ChatView onReset={handleResetFlow} />;
    }

    return <UploadView onFilesSelected={handleFilesSelected} onAnalyze={handleAnalyzeFiles} />;
  };

  return (
    <>
      <Header />
      <main className="landing-page" aria-label="Workspace layout">
        <div className="landing-page__grid">
          <aside
            className="landing-page__column landing-page__column--left"
            aria-hidden="true"
          />

          <section className="landing-page__canvas" aria-live="polite">
            <div className="landing-page__surface" role="presentation">
              <div className={`landing-page__empty-state ${isSidePanelOpen ? 'landing-page__empty-state--hidden' : ''}`}>
                <div className="landing-page__empty-inner">
                  <p className="landing-page__eyebrow">AI knowledge base</p>
                  <h1 className="landing-page__title">Drop your files here</h1>
                  <FileDropzone
                    onFilesSelected={handleFilesSelected}
                    ariaLabel="Drop files to begin the workflow"
                    className="workspace-dropzone workspace-dropzone--hero"
                    renderContent={({ openFileDialog }) => (
                      <div className="workspace-dropzone__content">
                        <p className="workspace-dropzone__title">Drop your files here</p>
                        <Button
                          variant="secondary"
                          className="workspace-dropzone__pill"
                          onClick={(event) => {
                            event.stopPropagation();
                            openFileDialog();
                          }}
                        >
                          Or create one
                        </Button>
                      </div>
                    )}
                  />
                </div>
              </div>

              <div
                ref={panelRef}
                className={`landing-page__side-panel ${isSidePanelOpen ? 'landing-page__side-panel--open' : ''}`}
                aria-hidden={!isSidePanelOpen}
                tabIndex={isSidePanelOpen ? -1 : undefined}
              >
                {renderSidePanelContent()}
              </div>
            </div>
          </section>

          <aside className="landing-page__column landing-page__column--right">
            <RightRail selected={isSidePanelOpen} onToggle={handleRailToggle} />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};
