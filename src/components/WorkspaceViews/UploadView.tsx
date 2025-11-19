import type { FC } from 'react';
import { Button } from '../Button';
import { FileDropzone } from '../FileDropzone';
import { MaterialIcon } from '../MaterialIcon';
import './WorkspaceViews.css';

export interface UploadViewProps {
  onFilesSelected: (files: File[]) => void;
  onAnalyze?: () => void;
}

export const UploadView: FC<UploadViewProps> = ({ onFilesSelected, onAnalyze }) => {
  return (
    <section className="workspace-view workspace-view--upload" aria-label="AI knowledge base upload panel">
      <header className="workspace-view__header">
        <div className="workspace-view__header-icon" aria-hidden="true">
          <MaterialIcon name="auto_awesome" variant="symbols-outlined" size={28} />
        </div>
        <div className="workspace-view__header-copy">
          <p className="workspace-view__title">AI Knowledge Base</p>
          <p className="workspace-view__subtitle">Upload your files to get started</p>
        </div>
      </header>

      <FileDropzone
        onFilesSelected={onFilesSelected}
        ariaLabel="Drop files or click to browse"
        className="workspace-view__dropzone workspace-view__dropzone--upload"
        renderContent={() => (
          <div className="workspace-view__dropzone-inner">
            <MaterialIcon
              name="file_upload"
              variant="outlined"
              size={48}
              className="workspace-view__dropzone-icon"
            />
            <p className="workspace-view__dropzone-title">Drop your files here</p>
            <p className="workspace-view__dropzone-helper">or click to browse</p>
          </div>
        )}
      />

      <footer className="workspace-view__footer">
        <Button
          variant="secondary"
          className="workspace-view__footer-button"
          onClick={onAnalyze}
        >
          Analyze files
        </Button>
      </footer>
    </section>
  );
};
