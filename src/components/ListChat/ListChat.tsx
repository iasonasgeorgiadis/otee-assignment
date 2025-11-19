import type { FC } from 'react';
import { Button } from '../Button';
import { MaterialIcon } from '../MaterialIcon';
import './ListChat.css';

export interface ListChatProps {
  /** Chat thread title rendered within the row */
  title?: string;
  /** Accessible label for the trailing icon-only action */
  actionAriaLabel?: string;
  /** Callback fired when the action button is clicked */
  onAction?: () => void;
  /** Forces hover visuals for QA/Storybook */
  forceHover?: boolean;
  className?: string;
}

const DEFAULT_TITLE = 'Safety Checklist Summary – Packaging Line PLC';

export const ListChat: FC<ListChatProps> = ({
  title = DEFAULT_TITLE,
  actionAriaLabel,
  onAction,
  forceHover = false,
  className
}) => {
  const resolvedActionLabel = actionAriaLabel ?? `Open actions for ${title}`;

  const rootClassName = [
    'list-chat',
    forceHover && 'list-chat--hover',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName}>
      <span className="list-chat__title" title={title}>
        {title}
      </span>
      <Button
        aria-label={resolvedActionLabel}
        variant="neutral"
        size="small"
        label=""
        className="list-chat__action"
        iconLead={<MaterialIcon name="more_horiz" variant="outlined" size={20} />}
        onClick={onAction}
      />
    </div>
  );
};
