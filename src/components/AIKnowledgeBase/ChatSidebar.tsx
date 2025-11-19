import type { FC } from 'react';
import { ListChat } from '../ListChat';
import { PlainFilesList } from '../PlainFilesList';

export interface ChatThread {
  id: string;
  title: string;
}

export interface SidebarFile {
  id: string;
  name: string;
}

export interface ChatSidebarProps {
  /** Array of chat threads */
  chats: ChatThread[];
  /** Array of files in the knowledge base */
  files: SidebarFile[];
  /** Custom class name */
  className?: string;
}

/**
 * ChatSidebar displays the sidebar with Chats and Files sections.
 *
 * Design Source: Figma "AI Knowledge Base - Chat" (Node ID: 40016943-6246)
 */
export const ChatSidebar: FC<ChatSidebarProps> = ({
  chats,
  files,
  className = ''
}) => {
  const classNames = ['ai-kb-sidebar', className].filter(Boolean).join(' ');

  return (
    <aside className={classNames}>
      <section className="ai-kb-sidebar__section">
        <h3 className="ai-kb-sidebar__section-title">Chats</h3>
        <div className="ai-kb-sidebar__list">
          {chats.map((chat) => (
            <ListChat
              key={chat.id}
              title={chat.title}
            />
          ))}
        </div>
      </section>

      <section className="ai-kb-sidebar__section">
        <h3 className="ai-kb-sidebar__section-title">Files</h3>
        <div className="ai-kb-sidebar__list">
          {files.map((file) => (
            <PlainFilesList
              key={file.id}
              fileName={file.name}
            />
          ))}
        </div>
      </section>
    </aside>
  );
};

ChatSidebar.displayName = 'ChatSidebar';
