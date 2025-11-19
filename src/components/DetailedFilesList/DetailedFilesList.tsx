import type { FC } from 'react';
import { Button } from '../Button';
import { MaterialIcon } from '../MaterialIcon';
import type { MaterialIconProps } from '../MaterialIcon';
import './DetailedFilesList.css';

export interface DetailedFilesListProps {
  /** Primary file label shown on the first line */
  fileName?: string;
  /** Secondary metadata string shown below the filename */
  fileSize?: string;
  /** Optional uppercase label rendered inside the thumbnail (takes precedence over the icon) */
  fileTypeLabel?: string;
  /** Material icon name rendered in the thumbnail */
  fileTypeIcon?: string;
  /** Material icon variant to match the Figma asset */
  fileTypeIconVariant?: MaterialIconProps['variant'];
  /** Accessible label for the trailing action button */
  actionAriaLabel?: string;
  /** Click handler for the trailing action button */
  onAction?: () => void;
  /** Forces hover visuals for QA */
  forceHover?: boolean;
  className?: string;
}

const DEFAULT_FILE_NAME = 'document-file.pdf';
const DEFAULT_FILE_SIZE = '82.0 KB';
const DEFAULT_FILE_TYPE_ICON = 'picture_as_pdf';
const DEFAULT_FILE_TYPE_ICON_VARIANT: MaterialIconProps['variant'] = 'outlined';

export const DetailedFilesList: FC<DetailedFilesListProps> = ({
  fileName = DEFAULT_FILE_NAME,
  fileSize = DEFAULT_FILE_SIZE,
  fileTypeLabel,
  fileTypeIcon = DEFAULT_FILE_TYPE_ICON,
  fileTypeIconVariant = DEFAULT_FILE_TYPE_ICON_VARIANT,
  actionAriaLabel,
  onAction,
  forceHover = false,
  className
}) => {
  const rootClassName = [
    'detailed-files-list',
    forceHover && 'detailed-files-list--hover',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const thumbnailContent = fileTypeLabel ? (
    <span className="detailed-files-list__type-label" aria-hidden="true">
      {fileTypeLabel}
    </span>
  ) : (
    <MaterialIcon
      name={fileTypeIcon}
      variant={fileTypeIconVariant}
      size={24}
      className="detailed-files-list__thumbnail-icon"
    />
  );

  const resolvedActionLabel = actionAriaLabel ?? `Remove ${fileName}`;

  return (
    <div className={rootClassName}>
      <div className="detailed-files-list__thumbnail">
        {thumbnailContent}
      </div>
      <div className="detailed-files-list__info">
        <span className="detailed-files-list__name" title={fileName}>
          {fileName}
        </span>
        <span className="detailed-files-list__meta">{fileSize}</span>
      </div>
      <Button
        aria-label={resolvedActionLabel}
        variant="neutral"
        size="small"
        label=""
        ghost={true}
        iconLead={<MaterialIcon name="close" variant="outlined" size={20} />}
        className="detailed-files-list__action"
        onClick={onAction}
      />
    </div>
  );
};
