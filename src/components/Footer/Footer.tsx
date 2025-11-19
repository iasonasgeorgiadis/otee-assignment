import React from 'react';
import { Button } from '../Button';
import { MaterialIcon } from '../MaterialIcon';
import './Footer.css';

type StatusId = 'errors' | 'warnings' | 'messages';

interface StatusItem {
  id: StatusId;
  label: string;
  count: number;
  iconName: string;
  iconClass: string;
}

const STATUS_ITEMS: StatusItem[] = [
  { id: 'errors', label: 'Errors', count: 0, iconName: 'error_outline', iconClass: 'igds-footer__icon--error' },
  { id: 'warnings', label: 'Warnings', count: 0, iconName: 'warning_amber', iconClass: 'igds-footer__icon--warning' },
  { id: 'messages', label: 'Messages', count: 0, iconName: 'chat_bubble_outline', iconClass: 'igds-footer__icon--message' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="igds-footer" aria-label="Diagnostics footer">
      <div className="igds-footer__container">
        <div className="igds-footer__button-group">
          <Button
            variant="neutral"
            size="small"
            className="igds-footer__diagnostics-button"
            aria-label="Diagnostics panel expanded"
            iconLead={
              <MaterialIcon
                name="expand_less"
                className="igds-footer__chevron-icon"
              />
            }
            label="Diagnostics"
          />

          <div className="igds-footer__status-group" role="status" aria-live="polite">
            {STATUS_ITEMS.map(({ id, label, count, iconName, iconClass }) => (
              <div
                key={id}
                className={`igds-footer__status-pill igds-footer__status-pill--${id}`}
                aria-label={`${label}: ${count}`}
              >
                <MaterialIcon
                  name={iconName}
                  className={`igds-footer__status-icon ${iconClass}`}
                />
                <span className="igds-footer__status-label">
                  {label}:
                </span>
                <span className="igds-footer__status-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="neutral"
          size="small"
          outlined
          className="igds-footer__clear-button"
          label="Clear messages"
        />
      </div>
    </footer>
  );
};