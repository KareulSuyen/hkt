import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useState, useRef, useEffect } from 'react';
import { sendPrompt } from '../api';
import { IoIosSend } from "react-icons/io";
import { FaRobot } from "react-icons/fa";



const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
      // Persist chat open state in localStorage to survive remounts
      const [open, setOpen] = useState(() => {
        try {
          return JSON.parse(localStorage.getItem('chatOpen')) || false;
        } catch {
          return false;
        }
      });
    
      // Save open state to localStorage on change
      useEffect(() => {
        localStorage.setItem('chatOpen', JSON.stringify(open));
      }, [open]);
    
      const [prompt, setPrompt] = useState('');
      const [history, setHistory] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const chatEndRef = useRef(null);
      const inputRef = useRef(null); // Add ref for input field
    
      // Auto-focus input when chat opens or after sending message
      useEffect(() => {
        if (open && inputRef.current && !isLoading) {
          // Small delay to ensure the chat is fully rendered
          setTimeout(() => {
            inputRef.current.focus();
          }, 100);
        }
      }, [open, isLoading]); // Focus when chat opens or loading state changes
    
      const handleChat = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
    
        const fullPrompt = history
          .map(msg => (msg.sender === 'user' ? `User: ${msg.text}` : `AI: ${msg.text}`))
          .join('\n') + `\nUser: ${prompt}\nAI:`;
    
        try {
          console.log('📤 Sending full prompt:', fullPrompt);
          const res = await sendPrompt(fullPrompt);
          console.log('📥 Received response:', res);
    
          const botReply = res.response || "Empty response from AI.";
    
          setHistory(prev => [
            ...prev,
            { sender: 'user', text: prompt },
            { sender: 'ai', text: botReply }
          ]);
          setPrompt('');
    
          // Make sure chatbox stays open after sending
          setOpen(true);
        } catch (err) {
          console.error("🚨 AI Error:", err);
    
          let errorMessage = "Error talking to AI.";
    
          if (err.response) {
            if (err.response.data?.error) {
              errorMessage = `${err.response.data.error}`;
            } else if (err.response.status === 500) {
              errorMessage = "Server configuration error.";
            } else if (err.response.status === 400) {
              errorMessage = "Bad request to AI service.";
            }
          } else if (err.request) {
            errorMessage = "No response from server.";
          } else {
            errorMessage = `${err.message}`;
          }
    
          setHistory(prev => [
            ...prev,
            { sender: 'user', text: prompt },
            { sender: 'ai', text: errorMessage }
          ]);
          setPrompt('');
        } finally {
          setIsLoading(false);
        }
      };
    
      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (!isLoading && prompt.trim()) {
            handleChat();
          }
        }
      };
    
      useEffect(() => {
        if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [history]);
    
     return (
        <>
            <Navbar toggleSidebar={toggleSidebar}/>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
            <main>
                <Outlet />
            </main>
            {!open && (
                    <div
                      onClick={() => setOpen(true)}
                      style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: '#000000ff',
                        color: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        zIndex: 1000
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                      }}
                    >
                      <FaRobot size={30}/>
                    </div>
                  )}
            
                  {/* Chatbox */}
                  {open && (
                    <div
                      style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '320px',
                        maxHeight: '450px',
                        backgroundColor: 'black',
                        border: '1px solid #333',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        zIndex: 1000,
                        animation: 'slideUp 0.3s ease-out'
                      }}
                    >
                      <style>
                        {`
                          @keyframes slideUp {
                            from {
                              opacity: 0;
                              transform: translateY(20px);
                            }
                            to {
                              opacity: 1;
                              transform: translateY(0);
                            }
                          }
                        `}
                      </style>
            
                      {/* Header */}
                      <div
                        style={{
                          backgroundColor: '#494b4eff',
                          color: '#fff',
                          padding: '12px',
                          fontWeight: 'bold',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderRadius: '12px 12px 0 0'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          BonengGPT
                          {isLoading && (
                            <div style={{ 
                              width: '8px', 
                              height: '8px', 
                              backgroundColor: '#4ade80',
                              borderRadius: '50%',
                              animation: 'pulse 2s infinite'
                            }}>
                              <style>
                                {`
                                  @keyframes pulse {
                                    0%, 100% { opacity: 1; }
                                    50% { opacity: 0.3; }
                                  }
                                `}
                              </style>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => setOpen(false)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#fff',
                            fontSize: '18px',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          ✕
                        </button>
                      </div>
            
                      {/* Chat History */}
                      <div
                        style={{
                          flex: 1,
                          padding: '16px',
                          overflowY: 'auto',
                          fontSize: '14px',
                          color: 'white',
                          scrollbarWidth: 'thin',
                          scrollbarColor: '#333 transparent'
                        }}
                      >
                        {history.length === 0 && (
                          <div style={{ 
                            color: '#666', 
                            fontStyle: 'italic', 
                            textAlign: 'center',
                            padding: '20px 0'
                          }}>
                            👋 Start a conversation...
                          </div>
                        )}
            
                        {history.map((msg, index) => (
                          <div
                            key={index}
                            style={{
                              marginBottom: '12px',
                              textAlign: msg.sender === 'user' ? 'right' : 'left',
                              animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`
                            }}
                          >
                            <style>
                              {`
                                @keyframes fadeIn {
                                  from { opacity: 0; transform: translateY(10px); }
                                  to { opacity: 1; transform: translateY(0); }
                                }
                              `}
                            </style>
                            <div
                              style={{
                                display: 'inline-block',
                                padding: '8px 12px',
                                borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                backgroundColor: msg.sender === 'user' ? '#4A90E2' : '#2a2a2a',
                                maxWidth: '85%',
                                wordWrap: 'break-word',
                                lineHeight: '1.4',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                              }}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}
            
                        <div ref={chatEndRef} />
                      </div>
            
                      {/* Input */}
                      <div style={{ 
                        display: 'flex', 
                        padding: '16px', 
                        borderTop: '1px solid #333',
                        gap: '8px'
                      }}>
                        <input
                          ref={inputRef} // Add ref to input
                          type="text"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder={isLoading ? "AI is thinking..." : "Type something..."}
                          disabled={isLoading}
                          style={{
                            flex: 1,
                            padding: '10px 12px',
                            border: '1px solid #444',
                            borderRadius: '8px',
                            backgroundColor: isLoading ? '#111' : '#1a1a1a',
                            color: 'white',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#4A90E2';
                            e.target.style.boxShadow = '0 0 0 2px rgba(74, 144, 226, 0.2)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#444';
                            e.target.style.boxShadow = 'none';
                          }}
                          onKeyDown={handleKeyDown}
                        />
                        <button
                          onClick={handleChat}
                          disabled={isLoading || !prompt.trim()}
                          style={{
                            padding: '10px 16px',
                            backgroundColor: isLoading || !prompt.trim() ? '#333' : '#4A90E2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: isLoading || !prompt.trim() ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.2s ease',
                            minWidth: '50px'
                          }}
                          onMouseEnter={(e) => {
                            if (!isLoading && prompt.trim()) {
                              e.target.style.backgroundColor = '#357abd';
                              e.target.style.transform = 'translateY(-1px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isLoading && prompt.trim()) {
                              e.target.style.backgroundColor = '#4A90E2';
                              e.target.style.transform = 'translateY(0)';
                            }
                          }}
                        >
                          {isLoading ? '⏳' : <IoIosSend size={20}/>}
                        </button>
                      </div>
                    </div>
                  )}
        </>
    );
};

export default Layout;