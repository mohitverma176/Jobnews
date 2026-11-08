import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';
import { BASE_URL } from '../config';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const suggestionOptions = [
    'Find jobs',
    'Resume help',
    'Career advice',
    'Interview preparation',
    'Skills required'
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hi! 👋 I'm JobNews AI.\nHow can I help you today?",
      suggestions: suggestionOptions,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Intelligent Response Generator
  const generateAIResponse = async (userPrompt) => {
    const q = userPrompt.toLowerCase().trim();

    if (q.includes('find job') || q.includes('search job') || q.includes('opening') || q.includes('vacancy')) {
      return {
        text: `Here is how you can find top opportunities on **JobNews**:\n\n1. **Search by Role**: Search keywords like *Software Engineer, Fresher, Writer, Sales, Designer*.\n2. **Filter by Tech**: Use skills like *React, Python, Java, AWS*.\n3. **Location Search**: Look for *Remote, Bengaluru, Berlin, London*.\n\n👉 Head over to our **Jobs Page** to explore all active listings!`,
        action: { label: 'Go to Jobs Page ↗', path: '/jobs' },
        suggestions: ['Resume help', 'Skills required', 'Interview preparation']
      };
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('ats')) {
      return {
        text: `📄 **Top ATS-Friendly Resume Tips for 2026**:\n\n• **Format**: Clean single or two-column layout, standard modern fonts.\n• **Formula**: Use Google's XYZ formula (*Accomplished [X] as measured by [Y], by doing [Z]*).\n• **Keywords**: Mirror skills and tech stack from target job listings.\n• **Projects**: Include live deployed demo links and GitHub repositories.\n\n✨ You can use our built-in **Resume Builder** to design and download a professional PDF resume right now!`,
        action: { label: 'Open Resume Builder 📝', path: '/resume' },
        suggestions: ['Interview preparation', 'Skills required', 'Find jobs']
      };
    }

    if (q.includes('interview') || q.includes('prep') || q.includes('dsa') || q.includes('coding')) {
      return {
        text: `🎯 **Interview Preparation Roadmap**:\n\n1. **DSA & Problem Solving**: Master key patterns — Two Pointers, Sliding Window, BFS/DFS, Binary Search, and Dynamic Programming.\n2. **System Design**: Understand Load Balancers, Caching (Redis), Database Indexing, and REST vs GraphQL.\n3. **Behavioral (STAR Method)**: Situation, Task, Action, Result for questions like *"Tell me about a difficult challenge."*\n4. **Mock Interviews**: Practice articulating your thought process out loud.`,
        suggestions: ['Skills required', 'Career advice', 'Find jobs']
      };
    }

    if (q.includes('skill') || q.includes('tech stack') || q.includes('learn')) {
      return {
        text: `⚡ **Most In-Demand Tech Skills (2026)**:\n\n• **Frontend**: React 19, Next.js, TypeScript, Modern CSS / Tailwind.\n• **Backend**: Node.js / Express, Java (Spring Boot), Python (FastAPI), PostgreSQL, MongoDB.\n• **AI & Modern Tech**: LLM Integration, LangChain, Vector Databases, Prompt Engineering.\n• **DevOps & Cloud**: Docker, Kubernetes, CI/CD pipelines, AWS / GCP.`,
        suggestions: ['Find jobs', 'Resume help', 'Interview preparation']
      };
    }

    if (q.includes('career') || q.includes('advice') || q.includes('fresher') || q.includes('transition')) {
      return {
        text: `💡 **Strategic Career Advice**:\n\n• **Build in Public**: Share your projects, learnings, and solutions on LinkedIn and GitHub.\n• **Portfolio Over Certificates**: Ship 2-3 production-grade full-stack applications with clean code and live URLs.\n• **Network Smarter**: Connect with engineers and hiring managers at target companies before applying.\n• **Stay Updated**: Track industry and tech news regularly.`,
        action: { label: 'Read Latest Tech News 📰', path: '/news' },
        suggestions: ['Find jobs', 'Resume help', 'Skills required']
      };
    }

    if (q.includes('news') || q.includes('tech trend') || q.includes('ai news')) {
      return {
        text: `📰 We scrape real-time feeds from top technology sources like Wired and Ars Technica covering AI breakthroughs, tech industry updates, and startup news!`,
        action: { label: 'Explore News Feed ↗', path: '/news' },
        suggestions: ['Find jobs', 'Career advice', 'Interview preparation']
      };
    }

    // Default Fallback
    return ({
      text: await defaultfallback(userPrompt),
      suggestions: suggestionOptions
    });
  };
  const defaultfallback = async (userPrompt) => {
    const apiPath = '/chat';
    const targetEndpoint = BASE_URL ? `${BASE_URL}${apiPath}` : apiPath;
    const requestPayload = {
      prompt: `You are JobNews AI, a career assistant chatbot. Respond concisely to the user's query. If the user asks for jobs, resume tips, interview prep, skills, or tech news, provide relevant guidance. Avoid generic responses. If unsure, suggest visiting the Jobs or News page. This is the user query: ${userPrompt}`,
      maxOutputTokens: 200,
      temperature: 0.7
    };

    let response;
    try {
      response = await fetch(targetEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestPayload)
      });
      if (!response.ok) {
        throw new Error(`Server status: ${response.status}`);
      }
    } catch (err) {
      if (BASE_URL) {
        response = await fetch(apiPath, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestPayload)
        });
      } else {
        throw err;
      }
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || 'Unable to reach the AI service');
    }
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to assist you with your career queries!";
  };


  const handleSend = (textToSend) => {
    const messageText = (textToSend || inputVal).trim();
    if (!messageText) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      try {
        const aiResponse = await generateAIResponse(messageText);
        const aiMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiResponse.text,
          action: aiResponse.action,
          suggestions: aiResponse.suggestions,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      } catch (error) {
        setMessages((prev) => [...prev, {
          id: Date.now() + 1,
          sender: 'ai',
          text: 'I could not connect to the AI service. Please try again later.',
          suggestions: suggestionOptions,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } finally {
        setIsTyping(false);
      }
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: "Chat cleared! How else can I assist you with your career?",
        suggestions: suggestionOptions,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="chatbot-trigger-wrapper">
      {/* Floating Trigger Button (Bottom-Right) */}
      <button
        type="button"
        className={`chatbot-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle JobNews AI Chatbot"
      >
        <span>{isOpen ? '✕' : '🤖'}</span>
        {!isOpen && <span className="chatbot-online-ring" />}
      </button>

      {/* Tooltip on hover when closed */}
      {!isOpen && (
        <div className="chatbot-tooltip">
          JobNews AI • Career Assistant
        </div>
      )}

      {/* Modern Chat Window */}
      {isOpen && (
        <aside className="chatbot-window" aria-label="JobNews AI Chat Window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-header-avatar">🤖</div>
              <div>
                <h3 className="chatbot-header-title">JobNews AI</h3>
                <p className="chatbot-header-subtitle">
                  <span className="chatbot-status-dot" /> Your Career Assistant
                </p>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button
                type="button"
                className="chatbot-header-btn"
                onClick={handleClearChat}
                title="Clear conversation"
                aria-label="Clear chat"
              >
                🔄
              </button>
              <button
                type="button"
                className="chatbot-header-btn"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-msg-row ${msg.sender}`}>
                {msg.sender === 'ai' && (
                  <div className="chatbot-msg-avatar">🤖</div>
                )}

                <div className="chatbot-msg-bubble">
                  <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>

                  {/* Optional Action Button Link */}
                  {msg.action && (
                    <div>
                      <button
                        type="button"
                        className="chatbot-chat-link"
                        onClick={() => {
                          navigate(msg.action.path);
                          setIsOpen(false);
                        }}
                      >
                        {msg.action.label}
                      </button>
                    </div>
                  )}

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="chatbot-suggestions-section">
                      <div className="chatbot-suggestions-title">Suggestions:</div>
                      <div className="chatbot-suggestions-grid">
                        {msg.suggestions.map((sug, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="chatbot-suggestion-btn"
                            onClick={() => handleSend(sug)}
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="chatbot-msg-time">{msg.time}</div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chatbot-msg-row ai">
                <div className="chatbot-msg-avatar">🤖</div>
                <div className="chatbot-msg-bubble chatbot-typing">
                  <span className="chatbot-typing-dot" />
                  <span className="chatbot-typing-dot" />
                  <span className="chatbot-typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer Area */}
          <form
            className="chatbot-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask about jobs, resume, skills..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={!inputVal.trim() || isTyping}
              title="Send message"
              aria-label="Send message"
            >
              ➤
            </button>
          </form>
        </aside>
      )}
    </div>
  );
}
