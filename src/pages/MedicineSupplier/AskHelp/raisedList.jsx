import { useState } from "react";
import { HelpCircle, MessageSquare, AlertCircle, Clock, CheckCircle, XCircle, Plus, Search, Filter } from "lucide-react";
import Input from "components/Form/Input";
import Select from "components/Form/Select";
import CommonTable from "components/UI/Table";

const AskHelp = () => {
    const [activeTab, setActiveTab] = useState('raise-case');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedCaseType, setSelectedCaseType] = useState('');
    const [caseDescription, setCaseDescription] = useState('');
    const [priority, setPriority] = useState('medium');

    const caseTypes = [
        {
            id: 'payment',
            title: 'Payment Issues',
            description: 'Problems related to payments, settlements, refunds',
            icon: <AlertCircle className="w-6 h-6 text-red-500" />,
            color: 'bg-red-50 border-red-200'
        },
        {
            id: 'technical',
            title: 'Technical Support',
            description: 'System errors, login issues, feature problems',
            icon: <HelpCircle className="w-6 h-6 text-blue-500" />,
            color: 'bg-blue-50 border-blue-200'
        },
        {
            id: 'account',
            title: 'Account Management',
            description: 'Profile updates, bank details, document verification',
            icon: <MessageSquare className="w-6 h-6 text-green-500" />,
            color: 'bg-green-50 border-green-200'
        },
        {
            id: 'order',
            title: 'Order Related',
            description: 'Order processing, delivery, returns, cancellations',
            icon: <Clock className="w-6 h-6 text-orange-500" />,
            color: 'bg-orange-50 border-orange-200'
        },
        {
            id: 'compliance',
            title: 'Compliance & Legal',
            description: 'Regulatory issues, licenses, legal documentation',
            icon: <AlertCircle className="w-6 h-6 text-purple-500" />,
            color: 'bg-purple-50 border-purple-200'
        },
        {
            id: 'other',
            title: 'Other Issues',
            description: 'Any other concerns not covered above',
            icon: <MessageSquare className="w-6 h-6 text-gray-500" />,
            color: 'bg-gray-50 border-gray-200'
        }
    ];

    const mockCases = [
        {
            id: 'CASE001',
            type: 'Payment Issues',
            subject: 'Payment not received for order #12345',
            description: 'Payment for order #12345 was supposed to be settled on 15th Feb but still pending',
            status: 'open',
            priority: 'high',
            createdAt: '2024-02-20',
            updatedAt: '2024-02-21',
            assignedTo: 'Support Team'
        },
        {
            id: 'CASE002',
            type: 'Technical Support',
            subject: 'Unable to upload new products',
            description: 'Getting error when trying to upload product images',
            status: 'in-progress',
            priority: 'medium',
            createdAt: '2024-02-19',
            updatedAt: '2024-02-20',
            assignedTo: 'Tech Team'
        },
        {
            id: 'CASE003',
            type: 'Account Management',
            subject: 'Bank account verification pending',
            description: 'Submitted bank details 3 days ago but still not verified',
            status: 'resolved',
            priority: 'low',
            createdAt: '2024-02-18',
            updatedAt: '2024-02-19',
            assignedTo: 'Accounts Team'
        }
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            'open': { color: 'bg-yellow-100 text-yellow-700', label: 'Open' },
            'in-progress': { color: 'bg-blue-100 text-blue-700', label: 'In Progress' },
            'resolved': { color: 'bg-green-100 text-green-700', label: 'Resolved' },
            'closed': { color: 'bg-gray-100 text-gray-700', label: 'Closed' }
        };
        const config = statusConfig[status] || statusConfig['open'];
        return <span className={`px-2 py-1 text-xs rounded-full font-medium ${config.color}`}>{config.label}</span>;
    };

    const getPriorityBadge = (priority) => {
        const priorityConfig = {
            'high': { color: 'bg-red-100 text-red-700', label: 'High' },
            'medium': { color: 'bg-orange-100 text-orange-700', label: 'Medium' },
            'low': { color: 'bg-green-100 text-green-700', label: 'Low' }
        };
        const config = priorityConfig[priority] || priorityConfig['medium'];
        return <span className={`px-2 py-1 text-xs rounded-full font-medium ${config.color}`}>{config.label}</span>;
    };

    const handleRaiseCase = () => {
        if (!selectedCaseType || !caseDescription) {
            alert('Please select case type and provide description');
            return;
        }
        
        // Here you would typically make an API call to create the case
        alert('Case raised successfully!');
        setSelectedCaseType('');
        setCaseDescription('');
        setPriority('medium');
    };

    const filteredCases = mockCases.filter(case_ => {
        const matchesSearch = case_.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             case_.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Help & Support</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('raise-case')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeTab === 'raise-case'
                                ? 'bg-teal-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        Raise Case
                    </button>
                    <button
                        onClick={() => setActiveTab('my-cases')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeTab === 'my-cases'
                                ? 'bg-teal-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        My Cases ({mockCases.length})
                    </button>
                </div>
            </div>

            {activeTab === 'raise-case' ? (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Case Type</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {caseTypes.map((type) => (
                                <div
                                    key={type.id}
                                    onClick={() => setSelectedCaseType(type.id)}
                                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                                        selectedCaseType === type.id
                                            ? 'border-teal-500 bg-teal-50'
                                            : type.color
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        {type.icon}
                                        <div className="flex-1">
                                            <h4 className="font-medium text-slate-800">{type.title}</h4>
                                            <p className="text-sm text-slate-600 mt-1">{type.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedCaseType && (
                        <div className="bg-white border rounded-lg p-6 space-y-4">
                            <h3 className="text-lg font-semibold text-slate-800">Case Details</h3>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Subject
                                </label>
                                <Input
                                    name="subject"
                                    type="text"
                                    placeholder="Brief description of your issue"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Priority
                                </label>
                                <Select
                                    name="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    options={[
                                        { value: "low", label: "Low" },
                                        { value: "medium", label: "Medium" },
                                        { value: "high", label: "High" }
                                    ]}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={caseDescription}
                                    onChange={(e) => setCaseDescription(e.target.value)}
                                    placeholder="Please provide detailed information about your issue..."
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    rows="5"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleRaiseCase}
                                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Raise Case
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedCaseType('');
                                        setCaseDescription('');
                                        setPriority('medium');
                                    }}
                                    className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-3 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                    name="search"
                                    type="text"
                                    placeholder="Search cases..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select
                                name="status"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                options={[
                                    { value: "all", label: "All Status" },
                                    { value: "open", label: "Open" },
                                    { value: "in-progress", label: "In Progress" },
                                    { value: "resolved", label: "Resolved" },
                                    { value: "closed", label: "Closed" }
                                ]}
                            />
                        </div>
                    </div>

                    <CommonTable
                        columns={[
                            {
                                header: "Case ID",
                                accessor: "id",
                                render: (row) => (
                                    <span className="font-mono text-sm font-medium text-slate-800">{row.id}</span>
                                )
                            },
                            {
                                header: "Subject",
                                accessor: "subject",
                                render: (row) => (
                                    <div>
                                        <div className="font-medium text-slate-800">{row.subject}</div>
                                        <div className="text-sm text-slate-500 mt-1">{row.type}</div>
                                    </div>
                                )
                            },
                            {
                                header: "Status",
                                accessor: "status",
                                render: (row) => getStatusBadge(row.status)
                            },
                            {
                                header: "Priority",
                                accessor: "priority",
                                render: (row) => getPriorityBadge(row.priority)
                            },
                            {
                                header: "Assigned To",
                                accessor: "assignedTo",
                                render: (row) => row.assignedTo
                            },
                            {
                                header: "Created",
                                accessor: "createdAt",
                                render: (row) => new Date(row.createdAt).toLocaleDateString()
                            },
                            {
                                header: "Last Updated",
                                accessor: "updatedAt",
                                render: (row) => new Date(row.updatedAt).toLocaleDateString()
                            }
                        ]}
                        data={filteredCases}
                    />

                    {filteredCases.length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                            <p>No cases found matching your criteria</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AskHelp;
