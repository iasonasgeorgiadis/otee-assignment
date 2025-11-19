import type { FC } from 'react';
import { Button } from '../Button';
import { DetailedFilesList } from '../DetailedFilesList';
import { MaterialIcon } from '../MaterialIcon';

export interface FileData {
  id: string;
  name: string;
  size: string;
  icon?: string;
  iconVariant?: 'filled' | 'outlined' | 'symbols-outlined';
}

export interface FilesListViewProps {
  /** Array of uploaded files */
  files: FileData[];
  /** Callback when "Analyze files" is clicked */
  onAnalyze: () => void;
  /** Callback when "Add more files" is clicked */
  onAddMore: () => void;
  /** Callback when a file is removed */
  onRemoveFile: (fileId: string) => void;
  /** Custom class name */
  className?: string;
}

/**
 * FilesListView displays the list of uploaded files with actions.
 *
 * Design Source: Figma "AI Knowledge Base - Files List" (Node ID: 40016943-6246)
 */
export const FilesListView: FC<FilesListViewProps> = ({
  files,
  onAnalyze,
  onAddMore,
  onRemoveFile,
  className = ''
}) => {
  const classNames = ['ai-kb-files', className].filter(Boolean).join(' ');
  const fileCount = files.length;

  return (
    <div className={classNames}>
      <header className="ai-kb-files__header">
        <MaterialIcon
          name="auto_awesome"
          size={24}
          variant="outlined"
          className="ai-kb-files__header-icon"
        />
        <div className="ai-kb-files__header-text">
          <h2 className="ai-kb-files__title">AI Knowledge Base</h2>
        </div>
      </header>

      <div className="ai-kb-files__content">
        <div className="ai-kb-files__info">
          <span className="ai-kb-files__counter">
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

        <div className="ai-kb-files__list">
          {files.map((file) => (
            <DetailedFilesList
              key={file.id}
              fileName={file.name}
              fileSize={file.size}
              fileTypeIcon={file.icon || 'picture_as_pdf'}
              fileTypeIconVariant={file.iconVariant || 'outlined'}
              onAction={() => onRemoveFile(file.id)}
              actionAriaLabel={`Remove ${file.name}`}
            />
          ))}
        </div>
      </div>

      <footer className="ai-kb-files__footer">
        <Button
          variant="primary"
          size="medium"
          label="Analyze files"
          onClick={onAnalyze}
        />
      </footer>
    </div>
  );
};

FilesListView.displayName = 'FilesListView';
