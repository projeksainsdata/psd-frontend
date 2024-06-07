import React, { useState, useEffect } from "react";
import ChatBubble from './chatbuble.component';
import ChatInput from './chatinput.component';
import chatpsd from '../imgs/chattingbot.png'

function ChatAI() {
  const [prompt, updatePrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loadingText, setLoadingText] = useState("");


  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((prevText) => (prevText.length < 3 ? prevText + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);
  

  const sendMessage = async (message) => {
    setMessages((prevMessages) => [...prevMessages, { message, isUser: true }]);
    updatePrompt(message);

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/chat`, {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt: message }),
      });
      if (!response.ok || !response.body) {
        throw new Error(response.statusText);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let loopRunner = true;

      let answer = "";
      while (loopRunner) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        answer += decodedChunk;
      }
      setMessages((prevMessages) => [...prevMessages, { message: answer, isUser: false }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div>
      <div className='position-relative w-auto flex justify-center items-center'>
        <img src={chatpsd} alt="PSD-GPT" className="max-w-[200px] max-h-[200px]" />
      </div>

      <div className="flex justify-between items-center p-2">
        <h1 className="text-xl">PSD-GPT</h1>
        <p className="text-xl font-bold">(Model GPT-4 Turbo Preview)</p>
      </div>
      <div className="chat-container">
        <div className="mx-auto my-10 bg-dark shadow-xl rounded-xl w-full max-w-5xl mt-2">
          <div className="chat-messages flex flex-col h-auto max-h-screen">
            <div className="chat-messages overflow-auto flex-grow ">
              {messages.map((msg, i) => (
                <ChatBubble key={i} message={msg.message} isUser={msg.isUser} />
              ))}
              {loading && <div className="loading-text">{loadingText}</div>}
            </div>
            <div className="chat-input">
              <ChatInput onSubmit={sendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}

export default ChatAI;
