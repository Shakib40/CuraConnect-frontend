import { useState, useEffect, useRef } from "react";
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video, Info, User, Building2, Truck, Clock, CheckCircle, AlertCircle } from "lucide-react";

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const messagesEndRef = useRef(null);

    // Mock chat data
    const [chats, setChats] = useState([
        {
            id: 1,
            type: "hospital",
            entityName: "City General Hospital",
            entityId: "HOS001",
            lastMessage: "Thank you for processing our insurance claim quickly. The reimbursement has been processed.",
            timestamp: "2024-01-23T14:30:00Z",
            unreadCount: 2,
            status: "online",
            avatar: "https://ui-avatars.com/api/?name=City+General+Hospital&background=random&color=7f9cf5",
            messages: [
                {
                    id: 1,
                    sender: "hospital",
                    content: "Hello, we need to update our insurance policy details for the new quarter.",
                    timestamp: "2024-01-23T10:00:00Z",
                    status: "sent"
                },
                {
                    id: 2,
                    sender: "admin",
                    content: "Sure! I can help you with that. What specific updates do you need?",
                    timestamp: "2024-01-23T10:05:00Z",
                    status: "sent"
                },
                {
                    id: 3,
                    sender: "hospital",
                    content: "We need to add coverage for telemedicine services and update our provider network.",
                    timestamp: "2024-01-23T10:15:00Z",
                    status: "sent"
                },
                {
                    id: 4,
                    sender: "admin",
                    content: "I'll prepare the necessary documentation and send you the updated policy terms by end of day.",
                    timestamp: "2024-01-23T10:20:00Z",
                    status: "sent"
                },
                {
                    id: 5,
                    sender: "hospital",
                    content: "Thank you for processing our insurance claim quickly. The reimbursement has been processed.",
                    timestamp: "2024-01-23T14:30:00Z",
                    status: "sent"
                }
            ]
        },
        {
            id: 2,
            type: "supplier",
            entityName: "MediCare Pharmaceuticals",
            entityId: "SUP001",
            lastMessage: "The new shipment of medical supplies has been dispatched. Expected delivery by Friday.",
            timestamp: "2024-01-23T13:45:00Z",
            unreadCount: 1,
            status: "online",
            avatar: "https://ui-avatars.com/api/?name=MediCare+Pharmaceuticals&background=random&color=8b5cf6",
            messages: [
                {
                    id: 1,
                    sender: "supplier",
                    content: "We're running low on surgical supplies. Can we expedite our next order?",
                    timestamp: "2024-01-23T09:00:00Z",
                    status: "sent"
                },
                {
                    id: 2,
                    sender: "admin",
                    content: "Absolutely! I'll check the inventory and arrange priority shipping for tomorrow.",
                    timestamp: "2024-01-23T09:15:00Z",
                    status: "sent"
                },
                {
                    id: 3,
                    sender: "supplier",
                    content: "Perfect! We also need to update our contract terms for the next quarter.",
                    timestamp: "2024-01-23T09:30:00Z",
                    status: "sent"
                },
                {
                    id: 4,
                    sender: "admin",
                    content: "I'll send over the new contract proposal by EOD. The new shipment has been dispatched and should arrive by Friday.",
                    timestamp: "2024-01-23T13:45:00Z",
                    status: "sent"
                }
            ]
        },
        {
            id: 3,
            type: "hospital",
            entityName: "Metro Medical Center",
            entityId: "HOS002",
            lastMessage: "Patient discharge summary for this week has been uploaded to the portal.",
            timestamp: "2024-01-23T12:15:00Z",
            unreadCount: 0,
            status: "offline",
            avatar: "https://ui-avatars.com/api/?name=Metro+Medical+Center&background=random&color=10b981",
            messages: [
                {
                    id: 1,
                    sender: "hospital",
                    content: "We've completed the quarterly compliance report. Please review and provide feedback.",
                    timestamp: "2024-01-22T16:00:00Z",
                    status: "sent"
                },
                {
                    id: 2,
                    sender: "admin",
                    content: "Great work! The report looks comprehensive. I'll approve it and share with the compliance team.",
                    timestamp: "2024-01-22T16:30:00Z",
                    status: "sent"
                }
            ]
        },
        {
            id: 4,
            type: "supplier",
            entityName: "HealthPlus Distributors",
            entityId: "SUP002",
            lastMessage: "Quality inspection passed successfully. All products meet our standards.",
            timestamp: "2024-01-23T11:30:00Z",
            unreadCount: 3,
            status: "online",
            avatar: "https://ui-avatars.com/api/?name=HealthPlus+Distributors&background=random&color=6366f1",
            messages: [
                {
                    id: 1,
                    sender: "supplier",
                    content: "We have a new batch of antibiotics ready for delivery.",
                    timestamp: "2024-01-23T08:00:00Z",
                    status: "sent"
                },
                {
                    id: 2,
                    sender: "admin",
                    content: "Excellent! Please send the quality certificates and delivery schedule.",
                    timestamp: "2024-01-23T08:30:00Z",
                    status: "sent"
                },
                {
                    id: 3,
                    sender: "supplier",
                    content: "Quality inspection passed successfully. All products meet our standards.",
                    timestamp: "2024-01-23T11:30:00Z",
                    status: "sent"
                }
            ]
        }
    ]);

    const filteredChats = chats.filter(chat => {
        const matchesSearch = chat.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedFilter === "all" || 
                               (selectedFilter === "hospital" && chat.type === "hospital") ||
                               (selectedFilter === "supplier" && chat.type === "supplier");
        return matchesSearch && matchesFilter;
    });

    const handleSendMessage = () => {
        if (message.trim() && selectedChat) {
            const newMessage = {
                id: (selectedChat.messages?.length || 0) + 1,
                sender: "admin",
                content: message,
                timestamp: new Date().toISOString(),
                status: "sent"
            };

            setChats(prevChats => 
                prevChats.map(chat => 
                    chat.id === selectedChat.id 
                        ? { ...chat, messages: [...(chat.messages || []), newMessage], lastMessage: message, timestamp: new Date().toISOString() }
                        : chat
                )
            );

            setMessage("");
            scrollToBottom();
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            });
        }
    };

    const getStatusIndicator = (status) => {
        switch (status) {
            case "online":
                return <div className="w-2 h-2 bg-green-500 rounded-full" />;
            case "offline":
                return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
            case "away":
                return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
            default:
                return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
        }
    };

    const getEntityIcon = (type) => {
        switch (type) {
            case "hospital":
                return <Building2 className="w-4 h-4 text-blue-500" />;
            case "supplier":
                return <Truck className="w-4 h-4 text-purple-500" />;
            default:
                return <User className="w-4 h-4 text-gray-500" />;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedChat?.messages]);

    return (
        <div className="h-full flex">
            {/* Chat List Sidebar */}
            <div className="w-80 border-r border-slate-200 bg-white flex flex-col">
                <div className="p-4 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Messages</h2>
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="all">All Entities</option>
                            <option value="hospital">Hospitals</option>
                            <option value="supplier">Suppliers</option>
                        </select>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredChats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${
                                selectedChat?.id === chat.id ? 'bg-slate-100 border-l-4 border-l-primary' : ''
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="relative">
                                    <img 
                                        src={chat.avatar} 
                                        alt={chat.entityName}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="absolute bottom-0 right-0">
                                        {getStatusIndicator(chat.status)}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            {getEntityIcon(chat.type)}
                                            <span className="font-medium text-slate-800">{chat.entityName}</span>
                                        </div>
                                        <span className="text-xs text-slate-500">{formatDate(chat.timestamp)}</span>
                                    </div>
                                    <div className="text-sm text-slate-600 truncate">{chat.lastMessage}</div>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs text-slate-500">{formatTime(chat.timestamp)}</span>
                                        {chat.unreadCount > 0 && (
                                            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                                                {chat.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            {selectedChat ? (
                <div className="flex-1 flex flex-col bg-white">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-slate-200 bg-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img 
                                    src={selectedChat.avatar} 
                                    alt={selectedChat.entityName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        {getEntityIcon(selectedChat.type)}
                                        <div>
                                            <h3 className="font-semibold text-slate-800">{selectedChat.entityName}</h3>
                                            <p className="text-sm text-slate-600">ID: {selectedChat.entityId}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
                                    <Phone className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
                                    <Video className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
                                    <Info className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {selectedChat.messages?.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md ${msg.sender === 'admin' ? 'order-2' : 'order-1'}`}>
                                    <div className={`flex items-end gap-2 ${msg.sender === 'admin' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        {msg.sender !== 'admin' && (
                                            <img 
                                                src={selectedChat.avatar} 
                                                alt={selectedChat.entityName}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        )}
                                        <div className={`px-4 py-2 rounded-lg ${
                                            msg.sender === 'admin' 
                                                ? 'bg-primary text-white' 
                                                : 'bg-slate-100 text-slate-800'
                                        }`}>
                                            <p className="text-sm">{msg.content}</p>
                                            <div className={`text-xs mt-1 ${msg.sender === 'admin' ? 'text-primary/70 text-right' : 'text-slate-500'}`}>
                                                {formatTime(msg.timestamp)}
                                            </div>
                                        </div>
                                        {msg.sender === 'admin' && (
                                            <img 
                                                src="https://ui-avatars.com/api/?name=Admin&background=random&color=7f9cf5" 
                                                alt="Admin"
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-slate-200 bg-white">
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    placeholder="Type a message..."
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            <button className="p-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
                                <Smile className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleSendMessage}
                                disabled={!message.trim()}
                                className="p-2 bg-primary text-white rounded-lg hover:bg-primary/600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center bg-slate-50">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Select a conversation</h3>
                        <p className="text-slate-600">Choose a chat from the left to start messaging</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatPage;
