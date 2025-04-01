import React from 'react';
import { useParams } from 'react-router-dom';
import Workspace from '../components/Workspace/Workspace';

const WorkspaceWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Workspace
      problemId={id || ''}
      gameId="dummyGameId" // Placeholder for now
      chatroomId="dummyChatroomId" // Placeholder for now
    />
  );
};

export default WorkspaceWrapper;
