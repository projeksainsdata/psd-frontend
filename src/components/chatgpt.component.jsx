import React, { useState, useEffect } from "react";
import ChatBubble from './chatbuble.component';
import ChatInput from './chatinput.component';


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
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center px-4 py-2">
        <h1 className="text-xl text-light-green">PSD-GPT Version 1.0</h1>
        <p className="text-xl font-bold">(GPT-4 Turbo Preview)</p>
      </div>
      
      <div className="flex flex-col flex-grow h-full w-full max-w-6xl mx-auto mb-10 bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="flex flex-col flex-grow overflow-y-auto p-4 max-h-[58vh]">
          {messages.map((msg, i) => (
            <ChatBubble key={i} message={msg.message} isUser={msg.isUser} />
          ))}
          {loading && <div className="loading-text">{loadingText}</div>}
        </div>
        <div className="bg-white p-4">
          <ChatInput onSubmit={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatAI;
