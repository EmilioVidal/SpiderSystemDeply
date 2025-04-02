import styled from "styled-components";
import { ThemeProvider } from "@ui5/webcomponents-react";

export const ChatPageContainer = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  width: 100%;
  background-color: var(--sapBackgroundColor);
  overflow: hidden;
`;

export const SidebarContainer = styled.div`
  width: 280px;
  min-width: 280px;
  height: 100%;
  border-right: 1px solid var(--sapList_BorderColor);
  display: flex;
  flex-direction: column;
  background-color: var(--sapBackgroundColor);
`;

export const SearchContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--sapList_BorderColor);
  background-color: var(--sapBackgroundColor);
`;

export const UserList = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: var(--sapBackgroundColor);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--sapBackgroundColor);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--sapScrollBar_FaceColor);
    border-radius: 3px;
  }
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid var(--sapList_BorderColor);
  background-color: ${props => props.isSelected ? 'var(--sapList_SelectionBackgroundColor)' : 'var(--sapBackgroundColor)'};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--sapList_Hover_Background);
  }
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--sapAccentColor6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: var(--sapTextColor);
  
  ui5-icon {
    width: 24px;
    height: 24px;
  }
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserName = styled.div`
  font-weight: 500;
  color: var(--sapTextColor);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LastMessage = styled.div`
  font-size: 0.875rem;
  color: var(--sapContent_LabelColor);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--sapBackgroundColor);
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--sapList_BorderColor);
  background-color: var(--sapBackgroundColor);
`;

export const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: var(--sapBackgroundColor);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--sapBackgroundColor);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--sapScrollBar_FaceColor);
    border-radius: 3px;
  }
`;

export const Message = styled.div`
  max-width: 70%;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 1rem;
  position: relative;
  word-break: break-word;
  background-color: ${props => props.isSent ? 'var(--sapAccentColor6)' : 'var(--sapList_Hover_Background)'};
  color: ${props => props.isSent ? 'var(--sapTextColor)' : 'var(--sapTextColor)'};
  align-self: ${props => props.isSent ? 'flex-end' : 'flex-start'};
  
  /* Forzar actualización del tema */
  transition: background-color 0.3s ease, color 0.3s ease;
`;

export const MessageTime = styled.div`
  font-size: 0.75rem;
  color: var(--sapContent_LabelColor);
  margin-top: 0.25rem;
  text-align: right;
`;

export const InputContainer = styled.div`
  display: flex;
  padding: 1rem;
  border-top: 1px solid var(--sapList_BorderColor);
  background-color: var(--sapBackgroundColor);
  
  ui5-input {
    margin-right: 0.5rem;
  }
`;

export const NoChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: var(--sapBackgroundColor);
  color: var(--sapTextColor);
  
  ui5-icon {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
    color: var(--sapAccentColor6);
  }
`;

export const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.status) {
      case 'online':
        return 'var(--sapPositiveColor)';
      case 'away':
        return 'var(--sapWarningColor)';
      case 'offline':
        return 'var(--sapNegativeColor)';
      default:
        return 'var(--sapNeutralColor)';
    }
  }};
  margin-left: 0.5rem;
`;
