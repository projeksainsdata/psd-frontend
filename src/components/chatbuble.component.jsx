import React from 'react';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

const ChatBubble = ({ message, isUser }) => {
  const bubbleClasses = isUser
    ? 'bg-light-green text-white rounded-full self-end transform rotate-0 text-right'
    : 'bg-grey text-black rounded-bl-none self-start';

  const containerClasses = isUser ? 'd-flex justify-end flex' : 'd-flex justify-content-start flex';

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
        toast.success('Text copied to clipboard');
      })
      .catch((error) => console.error('Could not copy text: ', error));
  };

  return (
    <div className={`${containerClasses} mb-3`}>
      {isUser && (
      <button
        className="flex bottom-2 mt-4 mr-1 text-black hover:text-twitter focus:outline-none"
        onClick={() => handleCopy(message)}
      >
          <i className="fi fi-rr-copy-alt text-dark" />
        </button>
      )}
      <div className={`p-3 rounded-lg ${bubbleClasses} relative`}>
        <div className='mb-0'>
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
        
        <div
          className={`w-4 h-4 absolute top-0 mt-2 rounded-full`}
        />
        {!isUser && (
          <button
            className="flex bottom-1 mt-2 mr-1 text-black hover:text-gray-900 focus:outline-none"
            onClick={() => handleCopy(message)}
          >
            <i className="fi fi-rr-copy-alt text-dark" />
          </button>
        )}

      </div>


    </div>
    
  );
};

export default ChatBubble;
