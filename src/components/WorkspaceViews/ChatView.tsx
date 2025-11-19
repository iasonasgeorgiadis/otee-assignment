import type { FC } from 'react';
import { Button } from '../Button';
import { MaterialIcon } from '../MaterialIcon';
import './WorkspaceViews.css';

export interface ChatViewProps {
  onReset?: () => void;
}

export const ChatView: FC<ChatViewProps> = ({ onReset }) => {
  return (
    <section className="workspace-view workspace-view--chat" aria-label="Chat workspace placeholder">
      <div className="workspace-view__placeholder" role="status" aria-live="polite">
        <MaterialIcon name="forum" variant="outlined" size={40} className="workspace-view__placeholder-icon" />
        <p className="workspace-view__title">Chat workspace preview</p>
        <p className="workspace-view__subtitle">
          We will switch to the conversational experience in the following step.
        </p>
        <Button
          variant="secondary"
          className="workspace-view__footer-button"
          onClick={onReset}
        >
          Reset flow
        </Button>
      </div>
    </section>
  );
};
