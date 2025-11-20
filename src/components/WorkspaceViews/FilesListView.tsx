import type { FC } from 'react';
import { Button } from '../Button';
import { DetailedFilesList } from '../DetailedFilesList';
import { MaterialIcon } from '../MaterialIcon';
import './WorkspaceViews.css';

export interface WorkspaceFileData {
  id: string;
  name: string;
  size: string;
  icon?: string;
  iconVariant?: 'filled' | 'outlined' | 'symbols-outlined';
}

export interface FilesListViewProps {
  onContinue?: () => void;
  onAddMore?: () => void;
  onRemoveFile?: (fileId: string) => void;
  files?: WorkspaceFileData[];
}

const DEFAULT_FILES: WorkspaceFileData[] = [
  { id: '1', name: 'document-file.pdf', size: '82.0 KB', icon: 'picture_as_pdf', iconVariant: 'outlined' },
  { id: '2', name: 'spreadsheet-data.xlsx', size: '256.3 KB', icon: 'table_chart', iconVariant: 'outlined' }
];

export const FilesListView: FC<FilesListViewProps> = ({
  onContinue,
  onAddMore,
  onRemoveFile,
  files = DEFAULT_FILES
}) => {
  const fileCount = files.length;

  return (
    <section className="workspace-view workspace-view--files" aria-label="Uploaded files list">
      <header className="workspace-view__header">
        <div className="workspace-view__header-icon" aria-hidden="true">
          <MaterialIcon name="auto_awesome" variant="symbols-outlined" size={32} />
        </div>
        <div className="workspace-view__header-copy">
          <p className="workspace-view__title">AI Knowledge Base</p>
        </div>
      </header>

      <div className="workspace-view__files-container" role="region" aria-live="polite">
        <div className="workspace-view__files-row">
          <span className="workspace-view__files-counter">
            {fileCount} {fileCount === 1 ? 'file' : 'files'} uploaded
          </span>
          <Button
            variant="neutral"
            size="small"
            label="Add more files"
            outlined
            iconLead={<MaterialIcon name="add" size={16} variant="outlined" />}
            onClick={onAddMore}
          />
        </div>

        <div className="workspace-view__files-list">
          {files.map((file) => (
            <DetailedFilesList
              key={file.id}
              fileName={file.name}
              fileSize={file.size}
              fileTypeIcon={file.icon}
              fileTypeIconVariant={file.iconVariant}
              onAction={onRemoveFile ? () => onRemoveFile(file.id) : undefined}
            />
          ))}
        </div>

        <div className="workspace-view__divider" aria-hidden="true" />
      </div>

      <footer className="workspace-view__footer">
        <Button
          variant="primary"
          className="workspace-view__footer-button"
          onClick={onContinue}
        >
          Analyze files
        </Button>
      </footer>
    </section>
  );
};
