import { useState, useMemo } from "react";
import { Bell, CheckCircle, AlertTriangle, Info, X, Filter, Calendar, User, Building2, Truck, ShieldCheck, Clock, ChevronRight } from "lucide-react";

const NotificationsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");

    // Mock notifications data
    const notifications = useMemo(() => [
        // System notifications
        {
            id: 1,
            type: "system",
            title: "System Maintenance Scheduled",
            description: "System maintenance is scheduled for tonight from 2:00 AM to 4:00 AM EST. Services may be temporarily unavailable.",
            timestamp: "2024-01-23T18:00:00Z",
            status: "info",
            priority: "medium",
            read: false,
            entity: "system",
            entityId: "SYS001"
        },
        {
            id: 2,
            type: "system",
            title: "New Feature Released",
            description: "Advanced analytics dashboard is now available. Check your dashboard for new insights and reporting features.",
            timestamp: "2024-01-23T14:30:00Z",
            status: "success",
            priority: "low",
            read: true,
            entity: "system",
            entityId: "SYS002"
        },
        // Hospital notifications
        {
            id: 3,
            type: "hospital",
            title: "New Hospital Registration",
            description: "City General Hospital has completed registration and is pending approval.",
            timestamp: "2024-01-23T12:15:00Z",
            status: "info",
            priority: "high",
            read: false,
            entity: "hospital",
            entityName: "City General Hospital",
            entityId: "HOS001"
        },
        {
            id: 4,
            type: "hospital",
            title: "Document Verification Required",
            description: "Metro Medical Center has uploaded new documents that require verification.",
            timestamp: "2024-01-23T10:45:00Z",
            status: "warning",
            priority: "medium",
            read: true,
            entity: "hospital",
            entityName: "Metro Medical Center",
            entityId: "HOS002"
        },
        // Supplier notifications
        {
            id: 5,
            type: "supplier",
            title: "Quality Alert",
            description: "MediCare Pharmaceuticals batch #12345 failed quality inspection. Immediate action required.",
            timestamp: "2024-01-23T09:30:00Z",
            status: "error",
            priority: "critical",
            read: false,
            entity: "supplier",
            entityName: "MediCare Pharmaceuticals",
            entityId: "SUP001"
        },
        {
            id: 6,
            type: "supplier",
            title: "Contract Renewal Due",
            description: "HealthPlus Distributors contract is due for renewal in 30 days.",
            timestamp: "2024-01-22T16:20:00Z",
            status: "warning",
            priority: "medium",
            read: true,
            entity: "supplier",
            entityName: "HealthPlus Distributors",
            entityId: "SUP002"
        },
        // Insurance notifications
        {
            id: 7,
            type: "insurance",
            title: "Claim Processing Delay",
            description: "Multiple insurance claims from HealthGuard are pending processing beyond SLA.",
            timestamp: "2024-01-23T11:00:00Z",
            status: "warning",
            priority: "high",
            read: false,
            entity: "insurance",
            entityName: "HealthGuard Insurance",
            entityId: "INS001"
        },
        {
            id: 8,
            type: "insurance",
            title: "Policy Update Approved",
            description: "SecureLife Coverage policy updates have been approved and are now active.",
            timestamp: "2024-01-22T13:45:00Z",
            status: "success",
            priority: "low",
            read: true,
            entity: "insurance",
            entityName: "SecureLife Coverage",
            entityId: "INS002"
        },
        // Case notifications
        {
            id: 9,
            type: "case",
            title: "Critical Case Escalated",
            description: "Case CASE-2024-004 has been escalated to priority support due to quality control issues.",
            timestamp: "2024-01-23T08:15:00Z",
            status: "error",
            priority: "critical",
            read: false,
            entity: "case",
            entityId: "CASE-2024-004"
        },
        {
            id: 10,
            type: "case",
            title: "Case Resolved",
            description: "Billing dispute case CASE-2024-003 has been successfully resolved.",
            timestamp: "2024-01-22T17:30:00Z",
            status: "success",
            priority: "low",
            read: true,
            entity: "case",
            entityId: "CASE-2024-003"
        }
    ], []);

    const filteredNotifications = useMemo(() => {
        return notifications.filter(notification => {
            const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 notification.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 (notification.entityName && notification.entityName.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesType = selectedType === "all" || notification.type === selectedType;
            const matchesStatus = selectedStatus === "all" || 
                               (selectedStatus === "read" && notification.read) ||
                               (selectedStatus === "unread" && !notification.read);
            
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [notifications, searchTerm, selectedType, selectedStatus]);

    const getStatusIcon = (status) => {
        switch (status) {
            case "success":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "error":
                return <AlertTriangle className="w-5 h-5 text-red-500" />;
            case "warning":
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case "info":
            default:
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getEntityIcon = (type) => {
        switch (type) {
            case "hospital":
                return <Building2 className="w-4 h-4 text-blue-500" />;
            case "supplier":
                return <Truck className="w-4 h-4 text-purple-500" />;
            case "insurance":
                return <ShieldCheck className="w-4 h-4 text-orange-500" />;
            case "case":
                return <AlertTriangle className="w-4 h-4 text-red-500" />;
            case "system":
            default:
                return <Info className="w-4 h-4 text-gray-500" />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "critical":
                return "bg-red-100 text-red-800 border-red-200";
            case "high":
                return "bg-orange-100 text-orange-800 border-orange-200";
            case "medium":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "low":
            default:
                return "bg-green-100 text-green-800 border-green-200";
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffHours < 1) {
            return "Just now";
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffDays < 7) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            });
        }
    };

    const markAsRead = (id) => {
        // In a real app, this would make an API call
        console.log(`Marking notification ${id} as read`);
    };

    const markAllAsRead = () => {
        // In a real app, this would make an API call
        console.log("Marking all notifications as read");
    };

    const stats = useMemo(() => {
        const total = notifications.length;
        const unread = notifications.filter(n => !n.read).length;
        const critical = notifications.filter(n => n.priority === 'critical').length;
        const high = notifications.filter(n => n.priority === 'high').length;

        return { total, unread, critical, high };
    }, [notifications]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Notifications</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">Stay updated with all system and entity activities.</p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Bell className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                            <p className="text-sm text-slate-600">Total</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Bell className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stats.unread}</p>
                            <p className="text-sm text-slate-600">Unread</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stats.critical}</p>
                            <p className="text-sm text-slate-600">Critical</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stats.high}</p>
                            <p className="text-sm text-slate-600">High Priority</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search notifications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="all">All Types</option>
                            <option value="system">System</option>
                            <option value="hospital">Hospitals</option>
                            <option value="supplier">Suppliers</option>
                            <option value="insurance">Insurance</option>
                            <option value="case">Cases</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                    <button
                        onClick={markAllAsRead}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/600 transition-colors"
                    >
                        Mark All as Read
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {filteredNotifications.map((notification) => (
                        <div 
                            key={notification.id} 
                            className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                                !notification.read ? 'bg-blue-50/50' : ''
                            }`}
                            onClick={() => markAsRead(notification.id)}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    {getStatusIcon(notification.status)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-slate-800">{notification.title}</h3>
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(notification.priority)}`}>
                                                {notification.priority}
                                            </span>
                                            {!notification.read && (
                                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            )}
                                        </div>
                                        <span className="text-sm text-slate-500">{formatTimestamp(notification.timestamp)}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-3">{notification.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {getEntityIcon(notification.type)}
                                            <span className="text-xs text-slate-500">
                                                {notification.entityName || notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                                                {notification.entityId && ` (${notification.entityId})`}
                                            </span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {filteredNotifications.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                    <Bell className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600">No notifications found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default NotificationsPage;
