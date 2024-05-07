import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you today?", isBot: true }]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = () => {
    if (userInput.trim() !== '') {
      setMessages([...messages, { text: userInput, isBot: false }]);
      messages.push({ text: userInput, isBot: false })
      setUserInput('');

      QueryOpenAI(userInput)
    }
  };

  const QueryOpenAI = (message) => {
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "system",
            "content": "You are an assistent used for Christophers English Project"
          },
          {
            "role": "user",
            "content": message
          }
        ]
      })
    })
    .then(res => res.json())
    .then(res => setMessages([...messages, { text: res.choices[0].message.content, isBot: true }]));
  }

  return (
    <div className="container">
      <div className="content">
        <div className="chat-container">
          <div className="messages">
            <h1>English Passion Project</h1>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.isBot ? 'bot' : 'user'}`}>{message.text}</div>
            ))}
          </div>
          <div className="input-container">
            <input 
              type="text" 
              value={userInput} 
              onChange={(e) => setUserInput(e.target.value)} 
              className="chat-input" 
              placeholder="Type your message here..." 
            />
            <button onClick={sendMessage} className="chat-submit">Send</button>
          </div>
        </div>
        <div className="sidebar">
          <h2>Impact of Software Development and AI on the World</h2>
          <p>Software development and AI have revolutionized numerous aspects of our lives, from how we communicate to how we work and even how we solve complex problems. AI, in particular, has shown immense potential in areas such as healthcare, finance, transportation, and more.</p>
          <p>By automating tasks, analyzing vast amounts of data, and making predictions, AI systems can enhance efficiency, accuracy, and decision-making processes. However, they also raise ethical and societal concerns, such as job displacement, privacy issues, and algorithmic bias.</p>
          <p>Despite these challenges, the continued advancement of software development and AI holds promise for addressing some of humanity's most pressing issues and shaping the future in unprecedented ways.</p>
        </div>
      </div>
      <div className='footer'>
        <a className="git" href='https://github.com/cprofessional/English-Passion-Project'>Christopher Mustard - Source Code</a>
      </div>
    </div>
  );
}

export default App;
