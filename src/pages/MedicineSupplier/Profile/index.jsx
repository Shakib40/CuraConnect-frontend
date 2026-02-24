import { useState } from "react";
import {
    User,
    Mail,
    Phone,
    Building,
    MapPin,
    Calendar,
    Camera,
    Save,
    Edit,
    Shield,
    Award,
    Truck,
    CheckCircle,
    Clock,
    Star
} from "lucide-react";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    // Mock user data
    const [profileData, setProfileData] = useState({
        firstName: "John",
        lastName: "Anderson",
        email: "john.anderson@medisupply.com",
        phone: "+1-555-0123",
        position: "Supply Chain Manager",
        department: "Operations",
        employeeId: "EMP-2024-001",
        joinDate: "2022-03-15",
        avatar: "/api/placeholder/150/150",
        company: "MediSupply Solutions",
        address: "123 Medical Supply Blvd, Health City, HC 12345",
        city: "Health City",
        state: "HC",
        zipCode: "12345",
        country: "United States",
        bio: "Experienced supply chain manager with over 10 years in medical supply distribution. Specialized in inventory management and logistics optimization.",
        certifications: ["Certified Supply Chain Professional (CSCP)", "OSHA Certified", "HAZMAT Certified"],
        skills: ["Inventory Management", "Logistics", "Quality Control", "Vendor Relations", "Data Analysis"],
        languages: ["English (Native)", "Spanish (Professional)"],
        emergencyContact: {
            name: "Sarah Anderson",
            relationship: "Spouse",
            phone: "+1-555-0456"
        }
    });

    const handleSave = async () => {
        setIsSaving(true);
        setSaveMessage("");
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSaving(false);
        setIsEditing(false);
        setSaveMessage("Profile updated successfully!");
        
        // Clear message after 3 seconds
        setTimeout(() => setSaveMessage(""), 3000);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original values (in a real app, you'd store original values)
    };

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNestedInputChange = (parent, field, value) => {
        setProfileData(prev => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [field]: value
            }
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Profile</h1>
                    <p className="text-slate-500 mt-1">Manage your personal information and preferences.</p>
                </div>
                <div className="flex gap-2">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Profile
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Success Message */}
            {saveMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="w-5 h-5" />
                        <span>{saveMessage}</span>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                        <div className="text-center">
                            <div className="relative inline-block">
                                <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                                    <User className="w-16 h-16 text-purple-600" />
                                </div>
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <h3 className="mt-4 text-xl font-bold text-slate-800">
                                {profileData.firstName} {profileData.lastName}
                            </h3>
                            <p className="text-sm text-slate-600">{profileData.position}</p>
                            <p className="text-sm text-slate-500">{profileData.company}</p>
                            
                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex items-center justify-center gap-2 text-slate-600">
                                    <Mail className="w-4 h-4" />
                                    <span>{profileData.email}</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-slate-600">
                                    <Phone className="w-4 h-4" />
                                    <span>{profileData.phone}</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-slate-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{profileData.city}, {profileData.state}</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-slate-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Joined {profileData.joinDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-lg border border-slate-200 p-6 mt-6">
                        <h4 className="text-lg font-semibold text-slate-800 mb-4">Performance</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Order Accuracy</span>
                                <span className="text-sm font-medium text-green-600">98.5%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">On-Time Delivery</span>
                                <span className="text-sm font-medium text-green-600">96.2%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Customer Rating</span>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm font-medium text-slate-800">4.8</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Response Time</span>
                                <span className="text-sm font-medium text-slate-800">2.3 hours</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-purple-600" />
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                <input
                                    type="text"
                                    value={profileData.firstName}
                                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    value={profileData.lastName}
                                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={profileData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Position</label>
                                <input
                                    type="text"
                                    value={profileData.position}
                                    onChange={(e) => handleInputChange("position", e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Employee ID</label>
                                <input
                                    type="text"
                                    value={profileData.employeeId}
                                    disabled
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Company Information */}
                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Building className="w-5 h-5 text-purple-600" />
                            Company Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                                <input
                                    type="text"
                                    value={profileData.company}
                                    disabled
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                                <input
                                    type="text"
                                    value={profileData.department}
                                    onChange={(e) => handleInputChange("department", e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                                <input
                                    type="text"
                                    value={profileData.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">About</h3>
                        <textarea
                            rows={4}
                            value={profileData.bio}
                            onChange={(e) => handleInputChange("bio", e.target.value)}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none disabled:bg-slate-50 disabled:text-slate-500"
                        />
                    </div>

                    {/* Certifications */}
                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-purple-600" />
                            Certifications
                        </h3>
                        <div className="space-y-2">
                            {profileData.certifications.map((cert, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                    <Shield className="w-5 h-5 text-purple-600" />
                                    <span className="text-sm text-slate-800">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-purple-600" />
                            Emergency Contact
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Contact Name</label>
                                <input
                                    type="text"
                                    value={profileData.emergencyContact.name}
                                    onChange={(e) => handleNestedInputChange("emergencyContact", "name", e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Relationship</label>
                                <input
                                    type="text"
                                    value={profileData.emergencyContact.relationship}
                                    onChange={(e) => handleNestedInputChange("emergencyContact", "relationship", e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={profileData.emergencyContact.phone}
                                    onChange={(e) => handleNestedInputChange("emergencyContact", "phone", e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
