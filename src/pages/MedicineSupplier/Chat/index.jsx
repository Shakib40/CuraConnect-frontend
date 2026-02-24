import { useState, useRef, useEffect } from "react";
import {
    MessageSquare,
    Send,
    Search,
    Phone,
    Video,
    MoreVertical,
    Circle,
    Check,
    CheckCheck,
    Paperclip,
    Smile,
    User,
    Building2,
    Clock,
    Filter
} from "lucide-react";

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showChatInfo, setShowChatInfo] = useState(false);
    const messagesEndRef = useRef(null);

    // Mock conversations data
    const conversations = [
        {
            id: "chat-001",
            name: "City General Hospital",
            type: "hospital",
            avatar: "/api/placeholder/40/40",
            lastMessage: "We need to place an urgent order for surgical masks",
            timestamp: "2 hours ago",
            unread: 2,
            online: true,
            phone: "+1-555-0123",
            email: "procurement@citygeneral.com",
            address: "123 Hospital Ave, Health City"
        },
        {
            id: "chat-002",
            name: "Wellness Clinic",
            type: "hospital",
            avatar: "/api/placeholder/40/40",
            lastMessage: "Thank you for the quick delivery",
            timestamp: "5 hours ago",
            unread: 0,
            online: false,
            phone: "+1-555-0456",
            email: "orders@wellness.com",
            address: "456 Wellness St, Health City"
        },
        {
            id: "chat-003",
            name: "MediCare Center",
            type: "hospital",
            avatar: "/api/placeholder/40/40",
            lastMessage: "Can you provide a quote for bulk orders?",
            timestamp: "Yesterday",
            unread: 1,
            online: true,
            phone: "+1-555-0789",
            email: "purchasing@medicare.com",
            address: "789 Care Blvd, Health City"
        },
        {
            id: "chat-004",
            name: "Dr. Sarah Johnson",
            type: "doctor",
            avatar: "/api/placeholder/40/40",
            lastMessage: "The medical equipment arrived in perfect condition",
            timestamp: "2 days ago",
            unread: 0,
            online: false,
            phone: "+1-555-0321",
            email: "sarah.j@health.com",
            address: "321 Medical Park Dr, Health City"
        },
        {
            id: "chat-005",
            name: "Health First Hospital",
            type: "hospital",
            avatar: "/api/placeholder/40/40",
            lastMessage: "We'd like to discuss a long-term partnership",
            timestamp: "3 days ago",
            unread: 0,
            online: false,
            phone: "+1-555-0654",
            email: "admin@healthfirst.com",
            address: "654 Health Way, Health City"
        }
    ];

    // Mock messages for selected chat
    const [messages, setMessages] = useState([]);

    const mockMessages = {
        "chat-001": [
            {
                id: "msg-001",
                sender: "other",
                content: "Hi, we need to place an urgent order for surgical masks",
                timestamp: "10:30 AM",
                status: "delivered"
            },
            {
                id: "msg-002",
                sender: "me",
                content: "Hello! I'd be happy to help with your order. How many boxes do you need?",
                timestamp: "10:32 AM",
                status: "delivered"
            },
            {
                id: "msg-003",
                sender: "other",
                content: "We need approximately 50 boxes for our ICU ward",
                timestamp: "10:35 AM",
                status: "delivered"
            },
            {
                id: "msg-004",
                sender: "me",
                content: "That's no problem. I can prepare that order for immediate shipment. Do you need any other supplies?",
                timestamp: "10:36 AM",
                status: "delivered"
            },
            {
                id: "msg-005",
                sender: "other",
                content: "We also need some medical gloves and thermometers",
                timestamp: "10:38 AM",
                status: "delivered"
            }
        ]
    };

    useEffect(() => {
        if (selectedChat) {
            setMessages(mockMessages[selectedChat] || []);
        }
    }, [selectedChat]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: `msg-${Date.now()}`,
                sender: "me",
                content: message,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: "sent"
            };
            setMessages([...messages, newMessage]);
            setMessage("");
            
            // Simulate message being delivered
            setTimeout(() => {
                setMessages(prev => prev.map(msg => 
                    msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
                ));
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusIcon = (status) => {
        switch (status) {
            case "sent":
                return <Check className="w-4 h-4 text-slate-400" />;
            case "delivered":
                return <CheckCheck className="w-4 h-4 text-blue-500" />;
            default:
                return <Clock className="w-4 h-4 text-slate-400" />;
        }
    };

    return (
        <div className="h-full flex">
            {/* Conversations List */}
            <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
                {/* Search */}
                <div className="p-4 border-b border-slate-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto">
                    {filteredConversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => setSelectedChat(conversation.id)}
                            className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${
                                selectedChat === conversation.id ? "bg-purple-50 border-l-4 border-l-purple-600" : ""
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        {conversation.type === "hospital" ? (
                                            <Building2 className="w-5 h-5 text-purple-600" />
                                        ) : (
                                            <User className="w-5 h-5 text-purple-600" />
                                        )}
                                    </div>
                                    {conversation.online && (
                                        <Circle className="absolute bottom-0 right-0 w-3 h-3 text-green-500 fill-current" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="text-sm font-semibold text-slate-800 truncate">
                                            {conversation.name}
                                        </h4>
                                        <span className="text-xs text-slate-500">
                                            {conversation.timestamp}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 truncate mb-1">
                                        {conversation.lastMessage}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-500">
                                            {conversation.type === "hospital" ? "Hospital" : "Doctor"}
                                        </span>
                                        {conversation.unread > 0 && (
                                            <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                                                {conversation.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50">
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="bg-white border-b border-slate-200 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        {conversations.find(c => c.id === selectedChat)?.type === "hospital" ? (
                                            <Building2 className="w-5 h-5 text-purple-600" />
                                        ) : (
                                            <User className="w-5 h-5 text-purple-600" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-800">
                                            {conversations.find(c => c.id === selectedChat)?.name}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {conversations.find(c => c.id === selectedChat)?.online ? "Online" : "Offline"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                        <Video className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => setShowChatInfo(!showChatInfo)}
                                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                                msg.sender === "me"
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-white text-slate-800 border border-slate-200"
                                            }`}
                                        >
                                            <p className="text-sm">{msg.content}</p>
                                            <div className={`flex items-center justify-end gap-1 mt-1 ${
                                                msg.sender === "me" ? "text-purple-200" : "text-slate-400"
                                            }`}>
                                                <span className="text-xs">{msg.timestamp}</span>
                                                {msg.sender === "me" && getStatusIcon(msg.status)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="bg-white border-t border-slate-200 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                    <Smile className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">Select a conversation</h3>
                            <p className="text-slate-500">Choose a conversation from the list to start messaging</p>
                        </div>
                    </div>
                )}

                {/* Chat Info Sidebar */}
                {showChatInfo && selectedChat && (
                    <div className="w-80 bg-white border-l border-slate-200 p-6">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                {conversations.find(c => c.id === selectedChat)?.type === "hospital" ? (
                                    <Building2 className="w-10 h-10 text-purple-600" />
                                ) : (
                                    <User className="w-10 h-10 text-purple-600" />
                                )}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800">
                                {conversations.find(c => c.id === selectedChat)?.name}
                            </h3>
                            <p className="text-sm text-slate-500">
                                {conversations.find(c => c.id === selectedChat)?.type === "hospital" ? "Hospital" : "Doctor"}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-slate-700 mb-2">Contact Information</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Phone className="w-4 h-4" />
                                        <span>{conversations.find(c => c.id === selectedChat)?.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <MessageSquare className="w-4 h-4" />
                                        <span>{conversations.find(c => c.id === selectedChat)?.email}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-slate-600">
                                        <Building2 className="w-4 h-4 mt-0.5" />
                                        <span>{conversations.find(c => c.id === selectedChat)?.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        ) : (
            <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Welcome to Chat</h3>
                    <p className="text-slate-500">Select a conversation to start messaging</p>
                </div>
            </div>
        )}
    </div>
    );
};

export default ChatPage;
