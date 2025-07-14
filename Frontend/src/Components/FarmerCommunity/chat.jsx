import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../madhuni/components/Navbar";
import { useAuth } from "../context/AuthContext";
import send from "../../assets/send.png"

const WS_URL = "ws://localhost:8000/ws";

function Chat() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const farmer = location.state?.farmer;
    
    const ws = useRef(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Redirect if no farmer data is provided
    useEffect(() => {
        if (!farmer) {
            navigate("/farmercommunity");
            return;
        }
    }, [farmer, navigate]);

    useEffect(() => {
        if (!farmer) return;
        
        ws.current = new WebSocket(WS_URL);

        ws.current.onopen = () => {
            console.log("WebSocket connected");
            setIsConnected(true);
        };

        ws.current.onmessage = (event) => {
            const isOwnMessage = !event.data.startsWith(`${user?.email || "You"}:`)

            const messageData = {
                text: event.data,
                sender: user?.email || "You",
                timestamp: new Date(),
                isOwn: isOwnMessage
            };
            setMessages((prev) => [...prev, messageData]);
        };

        ws.current.onclose = () => {
            console.log("WebSocket disconnected");
            setIsConnected(false);
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
            setIsConnected(false);
        };

        return () => {
            ws.current.close();
        };
    }, [farmer]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim() && ws.current.readyState === WebSocket.OPEN) {
            const messageData = {
                text: input.trim(),
                sender: user?.email || "You",
                timestamp: new Date(),
                isOwn: true
            };
            // setMessages((prev) => [...prev, messageData]);
            
            // Send to WebSocket
            ws.current.send(input.trim());
            setInput("");
        }
    };

    if (!farmer) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-lg text-gray-600">Loading chat...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100">
            <Navbar />
            <div className="p-6 flex flex-col h-screen">
                {/* Chat Header */}
                <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => navigate("/farmercommunity")}
                            className="text-green-50 hover:text-green-800 transition-colors font-medium"
                        >
                            ← Back to Community
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-green-800">{farmer.name}</h1>
                            <p className="text-sm text-gray-600">{farmer.location}</p>
                            <p className="text-xs text-gray-500">Crops: {farmer.crops?.join(", ")}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold text-lg">
                                {farmer.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="text-xs mt-1">
                            <span className={`inline-block w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <span className="ml-1 text-gray-500">{isConnected ? 'Online' : 'Offline'}</span>
                        </div>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 bg-white border rounded-lg p-4 overflow-y-auto mb-4 min-h-96">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">
                            <p>Start a conversation with {farmer.name}</p>
                            <p className="text-sm mt-2">Say hello and share your farming experiences!</p>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg, index) => (
                                <div key={index} className={`mb-3 flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex items-start space-x-2 max-w-xs ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 font-bold text-sm">
                                                {msg.isOwn ? 
                                                    (user?.email?.charAt(0).toUpperCase() || 'Y') : 
                                                    farmer.name?.charAt(0).toUpperCase()
                                                }
                                            </span>
                                        </div>
                                        <div className={`p-3 rounded-lg ${msg.isOwn ? 'bg-green-600 text-white' : 'bg-green-50 text-gray-700'}`}>
                                            <p className={`text-sm font-medium ${msg.isOwn ? 'text-green-100' : 'text-green-800'}`}>
                                                {msg.sender}
                                            </p>
                                            <p>{msg.text}</p>
                                            <p className={`text-xs mt-1 ${msg.isOwn ? 'text-green-200' : 'text-gray-500'}`}>
                                                {msg.timestamp.toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Message Input */}
                <div className="flex items-end space-x-2">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                        placeholder={`Type your message to ${farmer.name}...`}
                        rows={2}
                    />
                    <img
                        src={send}
                        alt="Send"
                        className={`w-10 h-10 cursor-pointer ${!input.trim() ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={(e) => {
                            if (input.trim()) sendMessage(e);
                        }}
                        style={{ objectFit: "contain" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Chat;