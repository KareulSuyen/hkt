import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import { useState, useRef, useEffect } from 'react';
import { sendPrompt } from '../api';
import { IoIosSend } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import ReportIssueForm from '../components/ReportIssueForm';


const Layout = () => {
    const [open, setOpen] = useState(false);
    
    const [isReportIssueOpen, setIsReportIssueOpen] = useState(false);
    const handleOpenReportIssue = () => setIsReportIssueOpen(true);
    const handleCloseReportIssue = () => setIsReportIssueOpen(false);
        
    const [prompt, setPrompt] = useState('');
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);
    
    useEffect(() => {
        if (open && inputRef.current && !isLoading) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 100);
        }
    }, [open, isLoading]);
    
    const handleChat = async (customPrompt = null) => {
        const messageToSend = customPrompt || prompt;
        if (!messageToSend.trim()) return;
        
        setIsLoading(true);
        
        const fullPrompt = history
        .map(msg => (msg.sender === 'user' ? `User: ${msg.text}` : `AI: ${msg.text}`))
        .join('\n') + `\nUser: ${messageToSend}\nAI:`;
        
        try {
            console.log('Sending full prompt:', fullPrompt);
            const res = await sendPrompt(fullPrompt);
            console.log('Received response:', res);
            
            const botReply = res.response || "I couldn't generate a response. Please try again.";
            
            setHistory(prev => [
                ...prev,
                { sender: 'user', text: messageToSend },
                { sender: 'ai', text: botReply }
            ]);
            setPrompt('');
            setOpen(true);
        } catch (err) {
            console.error("AI Error:", err);
            
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
                { sender: 'user', text: messageToSend },
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
    
    const handleGuidelinesRequest = () => {
        setOpen(true);
        setTimeout(() => {
            handleChat("Please show me the guidelines");
        }, 100);
    };
    
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);
    
    {/* Boneng Malakas */}

    {/* Sidebar State */}
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    
    {/* Profile state */}
    const [isProfileOpen, setProfileOpen] = useState(false);
    const toggleProfile = () => setProfileOpen(prev => !prev);
    
    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} toggleProfile={toggleProfile} />
            <Profile 
                isProfileOpen={isProfileOpen} 
                toggleProfile={toggleProfile}
                onGuidelinesClick={handleGuidelinesRequest}
            />
            <ReportIssueForm 
                isOpen={isReportIssueOpen} 
                onClose={handleCloseReportIssue} 
            />

            <Sidebar 
                isSidebarOpen={isSidebarOpen} 
                toggleSidebar={toggleSidebar} 
                onOpenReportIssue={handleOpenReportIssue}
            />
            <main>
                <Outlet />
            </main>
            
            {!open && (
                <div
                    onClick={() => setOpen(true)}
                    className="floating-ai-button"
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2c3f56ff 0%, #000000ff 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: '1px solid gray',
                        zIndex: 1000
                    }}
                >
                    <FaRobot size={30}/>
                </div>
            )}
            
            {/* AI Chatbox */}
            {open && (
                <div
                    className="ai-chatbox"
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '350px',
                        maxHeight: '500px',
                        background: 'linear-gradient(145deg, #3d3e5aff 0%, #0d0d0d 100%)',
                        border: '1px solid #333',
                        borderRadius: '16px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
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
                                from { opacity: 0; transform: translateY(20px); }
                                to { opacity: 1; transform: translateY(0); }
                            }
                            .floating-ai-button:hover {
                                transform: scale(1.1) rotate(5deg);
                                box-shadow: 0 6px 25px rgba(74, 144, 226, 0.5);
                            }
                            .message-typing-indicator span {
                                display: inline-block;
                                width: '8px';
                                height: '8px';
                                border-radius: '50%';
                                background: '#4ade80';
                                margin: '0 2px';
                                animation: 'bounce 1.4s infinite ease-in-out';
                            }
                            .message-typing-indicator span:nth-child(2) {
                                animation-delay: '0.2s';
                            }
                            .message-typing-indicator span:nth-child(3) {
                                animation-delay: '0.4s';
                            }
                            @keyframes bounce {
                                0%, 80%, 100% { transform: 'translateY(0)'; }
                                40% { transform: 'translateY(-8px)'; }
                            }
                        `}
                    </style>

                    <div
                        style={{
                            background: 'linear-gradient(90deg, #18222dff 0%, #2f3a5cff 100%)',
                            color: 'white',
                            padding: '16px',
                            fontWeight: '600',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '16px'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaRobot size={18} />
                            BonengGPT
                            {isLoading && (
                                <div className="message-typing-indicator" style={{ marginLeft: '10px' }}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            style={{
                                background: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                color: 'white',
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                        >
                            ✕
                        </button>
                    </div>

                    <div
                        style={{
                            flex: 1,
                            padding: '16px',
                            overflowY: 'auto',
                            fontSize: '14px',
                            color: 'white',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#000000ff transparent'
                        }}
                    >
                        {history.length === 0 && (
                            <div style={{ 
                                color: '#888', 
                                fontStyle: 'italic', 
                                textAlign: 'center',
                                padding: '40px 0',
                                fontSize: '15px'
                            }}>
                                <div style={{ marginBottom: '10px' }}>Hi there! I'm BonengGPT</div>
                                <div>You can ask me anything about Overpopulation</div>
                            </div>
                        )}

                        {history.map((msg, index) => (
                           <div
                            key={index}
                            style={{
                                marginBottom: '16px',
                                textAlign: msg.sender === 'user' ? 'right' : 'left',
                                animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`,
                                display: 'flex',
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
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
                                    padding: '12px 16px',
                                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                    background: msg.sender === 'user' 
                                        ? 'linear-gradient(135deg, #000000ff 0%, #000000ff 100%)' 
                                        : '#2a2a2a',
                                    maxWidth: '85%',
                                    wordWrap: 'break-word',
                                    lineHeight: '1.5',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    border: msg.sender === 'ai' ? '1px solid #333' : 'none',
                                    textAlign: 'left' 
                                }}
                            >
                                {msg.text}
                            </div>
                        </div>
                        ))}

                        {isLoading && history[history.length - 1]?.sender === 'user' && (
                            <div
                                style={{
                                    marginBottom: '16px',
                                    textAlign: 'left',
                                    animation: 'fadeIn 0.3s ease-out'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'inline-block',
                                        padding: '12px 16px',
                                        borderRadius: '18px 18px 18px 4px',
                                        background: '#2a2a2a',
                                        maxWidth: '85%',
                                        wordWrap: 'break-word',
                                        lineHeight: '1.5',
                                        border: '1px solid #333'
                                    }}
                                >
                                    <div className="message-typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    <div style={{ 
                        padding: '12px 16px', 
                        borderTop: '1px solid #333',
                        background: '#1a1a1a'
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                            background: '#2a2a2a',
                            borderRadius: '12px',
                            padding: '4px',
                            border: '1px solid #333'
                        }}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
                                disabled={isLoading}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    border: 'none',
                                    background: 'transparent',
                                    color: 'white',
                                    fontSize: '14px',
                                    outline: 'none',
                                    minHeight: '40px'
                                }}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                onClick={() => handleChat()}
                                disabled={isLoading || !prompt.trim()}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    background: isLoading || !prompt.trim() ? '#333' : '#000000ff',
                                    color: 'white',
                                    border: 'none',
                                    cursor: isLoading || !prompt.trim() ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isLoading && prompt.trim()) {
                                        e.target.style.background = '#000000ff';
                                        e.target.style.transform = 'scale(1.05)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isLoading && prompt.trim()) {
                                        e.target.style.background = '#000000ff';
                                        e.target.style.transform = 'scale(1)';
                                    }
                                }}
                            >
                                {isLoading ? (
                                    <div style={{ 
                                        width: '16px', 
                                        height: '16px', 
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTopColor: 'white',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}>
                                        <style>
                                            {`@keyframes spin { to { transform: rotate(360deg); } }`}
                                        </style>
                                    </div>
                                ) : (
                                    <IoIosSend size={20}/>
                                )}
                            </button>
                        </div>
                        <div style={{
                            color: '#666',
                            fontSize: '11px',
                            textAlign: 'center',
                            marginTop: '8px'
                        }}>
                            {isLoading ? 'Generating response...' : 'Press Enter to send'}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Layout;