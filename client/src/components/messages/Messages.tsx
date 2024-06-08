import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import ConversationList from './ConversationList';
import ConversationView from './ConversationView';

interface Conversation {
  id: number;
}

const Messages = (): ReactElement => {

  const [conId, setConId] = useState<number>(0);
  const [allConversations, setAllConversations] = useState<Conversation[]>([])

  const getAllConversations = (): void => {
    axios
      .get('/api/conversations')
      .then((conversations) => {
        setAllConversations(conversations.data);
      })
      .catch((err) => {
        console.error('Failed to retrieve conversations:\n', err);
      })
  }

  // get array of conversations upon page load
  useEffect(() => {
    getAllConversations();
  }, [])

  // TODO: upon user click of conversationList item, conversation id should be changed and passed down to conversation view
  // TODO: use similar logic for a selectConversation function
  const handleAddConversation = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {

    // create conversation, get conversation id
    axios
      .post('/api/conversations', {})
      .then((conversation) => {
        const { id } = conversation.data;
        setConId(id);
      })
      .then(() => {
        getAllConversations();
      })
      .catch((err) => {
        console.error('Failed to create a conversation:\n', err);
      });
  }

  const selectConversation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    // value can be id from props or conId from state
    console.log('clicked: ', conId);
    // set conversationId and pass it: up to Messages, over to conversationView, and down to MessageInput
    setConId(conId);
  }

  return (
    <div>
      <h1>Direct Messages</h1>
      <button onClick={ handleAddConversation }>➕</button>
      <ConversationList allCons={ allConversations } select={ selectConversation }/>
      { conId ? <ConversationView conId={ conId }/> : '' }
    </div>
  );
}

export default Messages;
