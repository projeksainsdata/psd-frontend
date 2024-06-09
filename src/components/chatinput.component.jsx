import React, { useState } from 'react';

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSubmit(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ketik pertanyaanmu disini..."
        className="flex-grow border-2 bg-grey border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-300 resize-none max-h-32"
        rows="1"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <button type="submit" className="flex items-center bg-light-green text-white px-4 py-2 rounded-lg">
        <i className='fi fi-br-angle-double-small-up text-2xl'></i>
      </button>
    </form>
  );
};

export default ChatInput;
