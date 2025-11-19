import type { FC } from 'react';
import { Button } from '../Button';
import { FileDropzone } from '../FileDropzone';
import { MaterialIcon } from '../MaterialIcon';

export interface UploadViewProps {
  /** Callback when files are selected */
  onFilesSelected: (files: File[]) => void;
  /** Custom class name */
  className?: string;
}

/**
 * UploadView displays the upload screen with header, dropzone, and disabled analyze button.
 *
 * Design Source: Figma "AI Knowledge Base - Upload" (Node ID: 40016945-8043)
 */
export const UploadView: FC<UploadViewProps> = ({
  onFilesSelected,
  className = ''
}) => {
  const classNames = ['ai-kb-upload', className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <header className="ai-kb-upload__header">
        <div className="ai-kb-upload__title-container">
          <div className="ai-kb-upload__title-row">
            <MaterialIcon
              name="auto_awesome"
              size={32}
              variant="outlined"
              className="ai-kb-upload__header-icon"
            />
            <h2 className="ai-kb-upload__title">AI Knowledge Base</h2>
          </div>
          <p className="ai-kb-upload__subtitle">
            Upload your files to get started
          </p>
        </div>
      </header>

      <div className="ai-kb-upload__content">
        <FileDropzone
          onFilesSelected={onFilesSelected}
          ariaLabel="Drop files to upload"
          className="ai-kb-upload__dropzone"
          renderContent={() => (
            <>
              <MaterialIcon
                name="upload"
                size={64}
                variant="outlined"
                className="ai-kb-upload__dropzone-icon"
              />
              <span className="ai-kb-upload__dropzone-title">
                Drop your files here
              </span>
              <span className="ai-kb-upload__dropzone-text">
                or click to browse
              </span>
            </>
          )}
        />
      </div>

      <footer className="ai-kb-upload__footer">
        <Button
          variant="primary"
          size="medium"
          label="Analyze files"
          disabled={true}
          className="ai-kb-upload__button"
        />
      </footer>
    </div>
  );
};

UploadView.displayName = 'UploadView';
