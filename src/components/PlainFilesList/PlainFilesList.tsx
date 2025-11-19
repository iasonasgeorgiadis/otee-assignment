import type { FC } from 'react';
import { Button } from '../Button';
import { MaterialIcon } from '../MaterialIcon';
import './PlainFilesList.css';

export interface PlainFilesListProps {
  /** File name rendered inside the row */
  fileName?: string;
  /** Forces hover visuals (useful for Storybook/QA) */
  forceHover?: boolean;
  className?: string;
}

const DEFAULT_FILENAME = 'document-file.pdf';

export const PlainFilesList: FC<PlainFilesListProps> = ({
  fileName = DEFAULT_FILENAME,
  forceHover = false,
  className
}) => {
  const rootClassName = [
    'plain-files-list',
    forceHover && 'plain-files-list--hover',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName}>
      <span className="plain-files-list__name" title={fileName}>
        {fileName}
      </span>
      <Button
        aria-label={`File options for ${fileName}`}
        label=""
        variant="neutral"
        ghost={true}
        size="small"
        className="plain-files-list__action"
        iconLead={<MaterialIcon name="more_horiz" variant="outlined" size={20} />}
      />
    </div>
  );
};
