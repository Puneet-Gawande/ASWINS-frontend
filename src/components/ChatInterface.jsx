import { useEffect, useState } from 'react';
import { socket } from '../services/socket';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (msg) => setMessages((prev) => [...prev, msg]));
    return () => socket.off('message');
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Doctor-Patient Chat</h2>
      <div className="h-60 overflow-y-auto border p-3 mb-3 rounded bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className="mb-1">{msg}</div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          className="flex-grow border p-2 rounded-l"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">Send</button>
      </form>
    </div>
  );
};

export default ChatInterface;