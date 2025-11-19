import type { FC } from 'react';
import { Button } from '../Button';
import { PlainFilesList } from '../PlainFilesList';
import './WorkspaceViews.css';

export interface FilesListViewProps {
  onContinue?: () => void;
}

export const FilesListView: FC<FilesListViewProps> = ({ onContinue }) => {
  return (
    <section className="workspace-view workspace-view--files" aria-label="Uploaded files list">
      <header className="workspace-view__header">
        <p className="workspace-view__title">Files ready to review</p>
        <p className="workspace-view__subtitle">Confirm the imported attachments before chatting.</p>
      </header>

      <div className="workspace-view__list" role="region" aria-live="polite">
        <PlainFilesList />
      </div>

      <footer className="workspace-view__footer">
        <Button
          variant="primary"
          className="workspace-view__footer-button"
          onClick={onContinue}
        >
          Continue to chat
        </Button>
      </footer>
    </section>
  );
};
