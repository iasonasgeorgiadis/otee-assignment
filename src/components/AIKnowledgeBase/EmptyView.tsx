import type { FC } from 'react';
import { Button } from '../Button';
import { FileDropzone } from '../FileDropzone';

export interface EmptyViewProps {
  /** Callback when files are selected via drag & drop or file picker */
  onFilesSelected: (files: File[]) => void;
  /** Callback when "Or create one" button is clicked */
  onCreateClick: () => void;
  /** Custom class name */
  className?: string;
}

/**
 * EmptyView displays the initial empty state with a centered dropzone card.
 *
 * Design Source: Figma "AI Knowledge Base - Empty" (Node ID: 40016943-6246)
 */
export const EmptyView: FC<EmptyViewProps> = ({
  onFilesSelected,
  onCreateClick,
  className = ''
}) => {
  const classNames = ['ai-kb-empty', className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <FileDropzone
        onFilesSelected={onFilesSelected}
        ariaLabel="Drop files to create AI knowledge base"
        renderContent={() => (
          <div className="ai-kb-empty__dropzone">
            <h2 className="ai-kb-empty__title">Drop your files here</h2>
            <Button
              variant="primary"
              size="medium"
              label="Or create one"
              onClick={(e) => {
                e.stopPropagation();
                onCreateClick();
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

EmptyView.displayName = 'EmptyView';
