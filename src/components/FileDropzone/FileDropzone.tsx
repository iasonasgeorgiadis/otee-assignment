import type { FC, ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';
import './FileDropzone.css';

export type FileDropzoneRenderProps = {
  /** Whether a drag operation is currently active over the dropzone */
  isDragActive: boolean;
  /** Imperatively open the hidden file picker */
  openFileDialog: () => void;
};

export interface FileDropzoneProps {
  /** Fired when files are selected either via drag & drop or the file picker */
  onFilesSelected: (files: File[]) => void;
  /** Render prop that receives drag helpers to build the dropzone UI */
  renderContent: (helpers: FileDropzoneRenderProps) => ReactNode;
  /** Optional accept attribute forwarded to the file input */
  accept?: string;
  /** Defaults to allowing multiple file uploads */
  multiple?: boolean;
  /** Visual label for assistive tech */
  ariaLabel?: string;
  /** Additional class names */
  className?: string;
}

export const FileDropzone: FC<FileDropzoneProps> = ({
  onFilesSelected,
  renderContent,
  accept,
  multiple = true,
  ariaLabel = 'Upload files',
  className
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);
  const [isDragActive, setIsDragActive] = useState(false);

  const resetDragState = () => {
    dragCounter.current = 0;
    setIsDragActive(false);
  };

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) {
        return;
      }

      onFilesSelected(Array.from(files));

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [onFilesSelected]
  );

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    dragCounter.current += 1;
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    dragCounter.current = Math.max(0, dragCounter.current - 1);

    if (dragCounter.current === 0) {
      setIsDragActive(false);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { files } = event.dataTransfer;
    resetDragState();
    handleFiles(files);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openFileDialog();
    }
  };

  const baseClassName = [
    'file-dropzone',
    isDragActive && 'file-dropzone--active',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={baseClassName}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-live="polite"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onKeyDown={handleKeyDown}
      onClick={openFileDialog}
      data-state={isDragActive ? 'drag-active' : undefined}
    >
      <input
        ref={inputRef}
        type="file"
        className="file-dropzone__input"
        multiple={multiple}
        accept={accept}
        tabIndex={-1}
        aria-hidden="true"
        onChange={handleInputChange}
      />

      {renderContent({ isDragActive, openFileDialog })}
    </div>
  );
};
