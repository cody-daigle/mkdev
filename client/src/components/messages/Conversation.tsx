import React, { ReactElement } from 'react';

interface PropsType {
    id: number;
    select: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newId: number) => void;
}

const Conversation: React.FC<PropsType> = (props): ReactElement => {
  const { id, select } = props;

  // pass selected conversation id to Messages component to change conId state
  const selectConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newId: number): void => {
    select(e, newId);
  }

  return (
    <div>
      <button onClick={ (e)=> {selectConversation(e, id)} }>Conversation {id}</button>
    </div>
  );
}

export default Conversation;