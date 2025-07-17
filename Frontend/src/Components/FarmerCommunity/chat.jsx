import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../madhuni/components/Navbar";
import { useAuth } from "../context/AuthContext";
import send from "../../assets/send.png";

const WS_URL = "ws://localhost:8000/ws";

function Chat() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const farmer = location.state?.farmer;

    const normalize = (str) => str.toLowerCase().trim().replace(/\s+/g, '');

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

    useEffect(() => {
        if (!farmer) {
            navigate("/farmercommunity");
            return;
        }
    }, [farmer, navigate]);

    useEffect(() => {
        if (!farmer && !user) return;

        // Get normalized emails/usernames for consistent API usage
        const currentUserEmail = normalize(user?.email || localStorage.getItem("username")?.replace(/"/g, '') || '');
        const farmerUsername = normalize(farmer?.username || '');

        if (!currentUserEmail || !farmerUsername) return;

        fetch(`http://localhost:8000/farmers/chat_messages?username=${currentUserEmail}&farmer_name=${farmerUsername}`)
            .then(res => res.json())
            .then(data => {
                // Ensure messages are formatted like the rest of the app expects
                if (Array.isArray(data.messages)) {
                    setMessages(
                        data.messages.map(msg => ({
                            ...msg,
                            timestamp: new Date(msg.timestamp),
                            isOwn: normalize(msg.sender) === currentUserEmail
                        }))
                    );
                }
            })
            .catch(err => console.error(err));
    }, [farmer, user]);


    useEffect(() => {
        if (!farmer) return;

        let currentUserEmail = user?.email || localStorage.getItem("username")?.replace(/"/g, '');
        currentUserEmail = normalize(currentUserEmail);
        ws.current = new WebSocket(`${WS_URL}?user=${currentUserEmail}`);

        ws.current.onopen = () => {
            setIsConnected(true);
        };

        ws.current.onmessage = (event) => {
            const messageObj = JSON.parse(event.data);

            const normalizedCurrentUser = normalize(user?.email || localStorage.getItem("username")?.replace(/"/g, '') || '');
            const normalizedFarmerUsername = normalize(farmer.username);

            // console.log(normalizedCurrentUser, normalizedFarmerUsername, messageObj);

            const messageSender = normalize(messageObj.sender);
            const messageReceiver = normalize(messageObj.receiver);

            const isOwnMessage = messageSender === normalizedCurrentUser;

            // Message belongs to this chat if:
            // 1. I sent it to the farmer OR
            // 2. Farmer sent it to me
            const isMessageForThisChat =
                (messageSender === normalizedCurrentUser && messageReceiver === normalizedFarmerUsername) ||
                (messageSender === normalizedFarmerUsername && messageReceiver === normalizedCurrentUser);

            if (isMessageForThisChat) {
                setMessages(prev => [...prev, {
                    text: messageObj.text,
                    sender: messageObj.sender,
                    receiver: messageObj.receiver,
                    timestamp: new Date(messageObj.timestamp),
                    isOwn: isOwnMessage
                }]);
            }
        };


        ws.current.onclose = () => setIsConnected(false);
        ws.current.onerror = () => setIsConnected(false);

        return () => ws.current?.close();
    }, [farmer, user]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim() && ws.current?.readyState === WebSocket.OPEN) {
            const currentUserEmail = user?.email || localStorage.getItem("username")?.replace(/"/g, '');
            const messageData = {
                sender: normalize(currentUserEmail),
                receiver: normalize(farmer.username),
                text: input.trim(),
                timestamp: new Date().toISOString()
            };
            ws.current.send(JSON.stringify(messageData));
            setInput("");
        }
    };

    if (!farmer) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200">
            <Navbar />
            <div className="flex flex-col items-center py-8 h-screen">
                <div className="w-full max-w-2xl flex flex-col flex-1 h-[80vh] bg-white rounded-2xl shadow-lg border border-green-200">
                    
                    {/* Chat Header */}
                    <div className="flex items-center px-6 py-4 border-b border-green-100 bg-green-50 rounded-t-2xl">
                        <button
                            className="flex items-center font-black text-green-700 hover:text-green-900 focus:outline-none mr-3"
                            onClick={() => navigate(-1)}
                            aria-label="Back"
                            style={{
                                fontSize: "1.5rem",
                                background: "#d1fae5",
                                borderRadius: "50%",
                                width: "2.5rem",
                                height: "2.5rem",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                                boxShadow: "0 1px 4px rgba(16, 185, 129, 0.15)"
                            }}
                        >
                            <span className="material-icons" style={{ fontSize: "2rem" }}>
                                &#8592;
                            </span>
                        </button>
                        <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-xl font-bold text-green-700 mr-4">
                            {farmer.name?.[0]?.toUpperCase() || "F"}
                        </div>
                        <div>
                            <div className="font-semibold text-lg text-green-800">{farmer.name}</div>
                            <div className={`text-xs ${isConnected ? "text-green-500" : "text-gray-400"}`}>
                                {isConnected ? "Online" : "Offline"}
                            </div>
                        </div>
                    </div>
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 bg-green-50">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-400 mt-10">No messages yet. Say hello!</div>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-4 flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-sm
                                    ${msg.isOwn
                                        ? 'bg-green-600 text-white rounded-br-none'
                                        : 'bg-white border border-green-200 text-gray-800 rounded-bl-none'
                                    }`}>
                                    <div className="text-sm break-words">{msg.text}</div>
                                    <div className="text-[10px] text-right mt-1 opacity-70">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    {/* Chat Input */}
                    <form
                        className="flex items-end px-6 py-4 bg-white border-t border-green-100 rounded-b-2xl"
                        onSubmit={sendMessage}
                    >
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 border border-green-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none bg-green-50 text-gray-800"
                            placeholder={`Type your message to ${farmer.name}...`}
                            rows={1}
                            onKeyDown={e => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    if (input.trim()) sendMessage(e);
                                }
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className={`ml-2 p-2 rounded-full transition-all duration-150
                                ${input.trim() ? "bg-green-500 hover:bg-green-600" : "bg-green-200 cursor-not-allowed"}
                            `}
                        >
                            <img
                                src={send}
                                alt="Send"
                                className="w-7 h-7"
                            />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;
