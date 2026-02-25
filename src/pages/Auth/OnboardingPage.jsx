import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserCheck, ArrowRight, Upload, FileText, CreditCard, Camera, Shield, AlertCircle, CheckCircle2, Save, X } from "lucide-react";

const OnboardingPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [showSaveIndicator, setShowSaveIndicator] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const [isValidating, setIsValidating] = useState(false);
    const [bankDetails, setBankDetails] = useState({
        accountNumber: '',
        ifscCode: '',
        bankName: '',
        accountHolderName: ''
    });

    const [personalInfo, setPersonalInfo] = useState({
        fullName: '',
        email: '',
        isEmailVerified: false,
        showOTPInput: false,
        otp: '',
        address: {
            street: '',
            road: '',
            city: '',
            state: '',
            country: '',
            pincode: ''
        },
        gstNumber: ''
    });

    const [documents, setDocuments] = useState({
        aadhar: null,
        photo: null,
        panCard: null,
        bankDetails: null,
        gstNumber: null,
        medicalLicense: null,
        pharmacyCertificate: null
    });

    // Auto-save functionality
    useEffect(() => {
        const saveData = {
            personalInfo,
            bankDetails,
            documents: Object.keys(documents).reduce((acc, key) => {
                if (documents[key]) {
                    acc[key] = documents[key].name;
                }
                return acc;
            }, {}),
            currentStep,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('onboardingDraft', JSON.stringify(saveData));
        
        // Show save indicator
        setShowSaveIndicator(true);
        const timer = setTimeout(() => setShowSaveIndicator(false), 2000);
        
        return () => clearTimeout(timer);
    }, [personalInfo, bankDetails, documents, currentStep]);

    // Load saved data on mount
    useEffect(() => {
        const savedData = localStorage.getItem('onboardingDraft');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Only restore if data is recent (within 24 hours)
                const dataAge = new Date() - new Date(parsed.timestamp);
                if (dataAge < 24 * 60 * 60 * 1000) {
                    // Restore personal info (except verification states)
                    if (parsed.personalInfo) {
                        setPersonalInfo(prev => ({
                            ...prev,
                            fullName: parsed.personalInfo.fullName || '',
                            email: parsed.personalInfo.email || '',
                            address: parsed.personalInfo.address || prev.address,
                            gstNumber: parsed.personalInfo.gstNumber || ''
                        }));
                    }
                    // Restore bank details
                    if (parsed.bankDetails) {
                        setBankDetails(parsed.bankDetails);
                    }
                    // Restore step
                    if (parsed.currentStep) {
                        setCurrentStep(parsed.currentStep);
                    }
                }
            } catch (error) {
                console.error('Error loading saved data:', error);
            }
        }
    }, []);

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateGST = (gst) => {
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
        return !gst || gstRegex.test(gst.toUpperCase());
    };

    const validatePincode = (pincode) => {
        const pincodeRegex = /^[1-9][0-9]{5}$/;
        return !pincode || pincodeRegex.test(pincode);
    };

    const validateIFSC = (ifsc) => {
        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        return !ifsc || ifscRegex.test(ifsc.toUpperCase());
    };

    const validateStep = (step) => {
        const newErrors = {};
        
        // if (step === 1) {
        //     if (!personalInfo.fullName.trim()) {
        //         newErrors.fullName = 'Full name is required';
        //     }
        //     if (!personalInfo.email.trim()) {
        //         newErrors.email = 'Email is required';
        //     } else if (!validateEmail(personalInfo.email)) {
        //         newErrors.email = 'Please enter a valid email address';
        //     }
        //     if (!personalInfo.isEmailVerified) {
        //         newErrors.emailVerified = 'Please verify your email address';
        //     }
        //     if (personalInfo.gstNumber && !validateGST(personalInfo.gstNumber)) {
        //         newErrors.gstNumber = 'Please enter a valid GST number';
        //     }
        //     if (personalInfo.address.pincode && !validatePincode(personalInfo.address.pincode)) {
        //         newErrors.pincode = 'Please enter a valid 6-digit pincode';
        //     }
        // }
        
        // if (step === 3) {
        //     if (!bankDetails.accountHolderName.trim()) {
        //         newErrors.accountHolderName = 'Account holder name is required';
        //     }
        //     if (!bankDetails.accountNumber.trim()) {
        //         newErrors.accountNumber = 'Account number is required';
        //     } else if (bankDetails.accountNumber.length < 9) {
        //         newErrors.accountNumber = 'Account number must be at least 9 digits';
        //     }
        //     if (!bankDetails.ifscCode.trim()) {
        //         newErrors.ifscCode = 'IFSC code is required';
        //     } else if (!validateIFSC(bankDetails.ifscCode)) {
        //         newErrors.ifscCode = 'Please enter a valid IFSC code';
        //     }
        //     if (!bankDetails.bankName.trim()) {
        //         newErrors.bankName = 'Bank name is required';
        //     }
        // }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileUpload = (docType) => (e) => {
        const file = e.target.files[0];
        if (file) {
            // Simulate upload progress
            setUploadProgress(prev => ({ ...prev, [docType]: 0 }));
            
            // Simulate upload progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    const currentProgress = prev[docType] || 0;
                    if (currentProgress >= 100) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return { ...prev, [docType]: currentProgress + 20 };
                });
            }, 200);
            
            // Set file after "upload" completes
            setTimeout(() => {
                setDocuments(prev => ({
                    ...prev,
                    [docType]: file
                }));
                setUploadProgress(prev => ({ ...prev, [docType]: undefined }));
            }, 1000);
        }
    };

    const handleRemoveFile = (docType) => {
        setDocuments(prev => ({
            ...prev,
            [docType]: null
        }));
    };

    const handleNext = () => {
        setIsValidating(true);
        if (validateStep(currentStep)) {
            if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
                setErrors({}); // Clear errors when moving to next step
            }
        }
        setIsValidating(false);
    };

    const handleBankDetailsChange = (field) => (e) => {
        setBankDetails(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handlePersonalInfoChange = (field) => (e) => {
        if (field.startsWith('address.')) {
            const addressField = field.split('.')[1];
            setPersonalInfo(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: e.target.value
                }
            }));
        } else {
            setPersonalInfo(prev => ({
                ...prev,
                [field]: e.target.value
            }));
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-8">
                        <h3 className="text-xl font-semibold text-slate-800 mb-6">Personal Information</h3>

                        {/* Email Section */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-semibold text-slate-700">Email Address</label>
                                    {personalInfo.isEmailVerified && (
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Verified
                                        </span>
                                    )}
                                </div>
                                
                                {!personalInfo.showOTPInput ? (
                                    <div className="space-y-3">
                                        <div className="flex gap-3">
                                            <div className="flex-1">
                                                <input 
                                                    type="email" 
                                                    value={personalInfo.email}
                                                    onChange={handlePersonalInfoChange('email')}
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all ${
                                                        errors.email ? 'border-red-300 focus:border-red-500' : 'border-slate-300 focus:border-teal-500'
                                                    }`}
                                                    placeholder="your@email.com" 
                                                />
                                                {errors.email && (
                                                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" />
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>
                                            {!personalInfo.isEmailVerified && (
                                                <button
                                                    type="button"
                                                    className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                                                    onClick={() => {
                                                        if (personalInfo.email) {
                                                            setPersonalInfo(prev => ({ ...prev, showOTPInput: true }));
                                                            console.log('Send OTP to:', personalInfo.email);
                                                        }
                                                    }}
                                                    disabled={!personalInfo.email}
                                                >
                                                    Verify
                                                </button>
                                            )}
                                        </div>
                                        {errors.emailVerified && (
                                            <p className="text-xs text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.emailVerified}
                                            </p>
                                        )}
                                        {!personalInfo.isEmailVerified && personalInfo.email && !errors.email && (
                                            <p className="text-xs text-slate-500">Click "Verify" to send a confirmation email</p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                            <p className="text-sm text-blue-800">
                                                We've sent a verification code to <strong>{personalInfo.email}</strong>
                                            </p>
                                        </div>
                                        <div className="flex gap-3">
                                            <input 
                                                type="text" 
                                                value={personalInfo.otp}
                                                onChange={handlePersonalInfoChange('otp')}
                                                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all" 
                                                placeholder="Enter 6-digit code" 
                                                maxLength={6}
                                            />
                                            <button
                                                type="button"
                                                className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                                                onClick={() => {
                                                    if (personalInfo.otp.length === 6) {
                                                        setPersonalInfo(prev => ({ 
                                                            ...prev, 
                                                            isEmailVerified: true, 
                                                            showOTPInput: false,
                                                            otp: '' 
                                                        }));
                                                        console.log('Email verified with OTP:', personalInfo.otp);
                                                    }
                                                }}
                                                disabled={personalInfo.otp.length !== 6}
                                            >
                                                Verify OTP
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <button
                                                type="button"
                                                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                                                onClick={() => {
                                                    setPersonalInfo(prev => ({ ...prev, showOTPInput: false, otp: '' }));
                                                }}
                                            >
                                                ← Back to email
                                            </button>
                                            <button
                                                type="button"
                                                className="text-sm text-slate-500 hover:text-slate-700"
                                                onClick={() => {
                                                    console.log('Resend OTP to:', personalInfo.email);
                                                }}
                                            >
                                                Resend code
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="block text-sm font-semibold text-slate-700">Address</label>
                                    <button
                                        type="button"
                                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm font-medium"
                                        onClick={() => {
                                            console.log('Open map for address selection');
                                        }}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Use Current Location
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    {/* Street and Road */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Street/Building</label>
                                            <input 
                                                type="text" 
                                                value={personalInfo.address.street}
                                                onChange={handlePersonalInfoChange('address.street')}
                                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm" 
                                                placeholder="123, Main Street" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Road/Area</label>
                                            <input 
                                                type="text" 
                                                value={personalInfo.address.road}
                                                onChange={handlePersonalInfoChange('address.road')}
                                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm" 
                                                placeholder="Sector 15, Phase 1" 
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* City and State */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">City</label>
                                            <input 
                                                type="text" 
                                                value={personalInfo.address.city}
                                                onChange={handlePersonalInfoChange('address.city')}
                                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm" 
                                                placeholder="Mumbai" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">State</label>
                                            <input 
                                                type="text" 
                                                value={personalInfo.address.state}
                                                onChange={handlePersonalInfoChange('address.state')}
                                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm" 
                                                placeholder="Maharashtra" 
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Country and Pincode */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Country</label>
                                            <input 
                                                type="text" 
                                                value={personalInfo.address.country}
                                                onChange={handlePersonalInfoChange('address.country')}
                                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm" 
                                                placeholder="India" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Pincode</label>
                                            <input 
                                                type="text" 
                                                value={personalInfo.address.pincode}
                                                onChange={handlePersonalInfoChange('address.pincode')}
                                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm" 
                                                placeholder="400001" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* GST Section */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">GST Number</label>
                                <p className="text-xs text-slate-500 mb-3">Do you have a GST registration number?</p>
                                <input 
                                    type="text" 
                                    value={personalInfo.gstNumber}
                                    onChange={handlePersonalInfoChange('gstNumber')}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all" 
                                    placeholder="Enter GST Number" 
                                />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Document Upload</h3>
                        
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
                                <div className="text-center">
                                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                                    <p className="text-sm font-medium text-slate-700 mb-2">Upload Aadhar Card</p>
                                    <p className="text-xs text-slate-500 mb-4">Do you have a valid Aadhar card for identity verification?</p>
                                    
                                    {!documents.aadhar ? (
                                        <>
                                            {uploadProgress.aadhar !== undefined ? (
                                                <div className="space-y-3">
                                                    <div className="w-full bg-slate-200 rounded-full h-2">
                                                        <div 
                                                            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${uploadProgress.aadhar}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-xs text-slate-500">Uploading... {uploadProgress.aadhar}%</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <input type="file" accept="image/*" onChange={handleFileUpload('aadhar')} className="hidden" id="aadhar-upload" />
                                                    <label htmlFor="aadhar-upload" className="cursor-pointer bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                                                        Choose File
                                                    </label>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-center gap-2 text-green-600">
                                                <CheckCircle2 className="w-5 h-5" />
                                                <span className="text-sm font-medium">{documents.aadhar.name}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile('aadhar')}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 mx-auto"
                                            >
                                                <X className="w-4 h-4" />
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
                                <div className="text-center">
                                    <Camera className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                                    <p className="text-sm font-medium text-slate-700 mb-2">Upload Profile Photo</p>
                                    <p className="text-xs text-slate-500 mb-4">Do you have a recent passport-sized photograph?</p>
                                    <input type="file" accept="image/*" onChange={handleFileUpload('photo')} className="hidden" id="photo-upload" />
                                    <label htmlFor="photo-upload" className="cursor-pointer bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                                        Choose File
                                    </label>
                                </div>
                            </div>

                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
                                <div className="text-center">
                                    <CreditCard className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                                    <p className="text-sm font-medium text-slate-700 mb-2">Upload PAN Card</p>
                                    <p className="text-xs text-slate-500 mb-4">Do you have a PAN card for tax identification?</p>
                                    <input type="file" accept="image/*" onChange={handleFileUpload('panCard')} className="hidden" id="pan-upload" />
                                    <label htmlFor="pan-upload" className="cursor-pointer bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                                        Choose File
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Bank Details</h3>
                        <p className="text-sm text-slate-600 mb-6">Do you have your bank account details for payments?</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Account Holder Name</label>
                                <input 
                                    type="text" 
                                    value={bankDetails.accountHolderName}
                                    onChange={handleBankDetailsChange('accountHolderName')}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" 
                                    placeholder="Enter account holder name" 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Bank Name</label>
                                <input 
                                    type="text" 
                                    value={bankDetails.bankName}
                                    onChange={handleBankDetailsChange('bankName')}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" 
                                    placeholder="Enter bank name" 
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Account Number</label>
                                    <input 
                                        type="text" 
                                        value={bankDetails.accountNumber}
                                        onChange={handleBankDetailsChange('accountNumber')}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" 
                                        placeholder="Enter account number" 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">IFSC Code</label>
                                    <input 
                                        type="text" 
                                        value={bankDetails.ifscCode}
                                        onChange={handleBankDetailsChange('ifscCode')}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" 
                                        placeholder="Enter IFSC code" 
                                    />
                                </div>
                            </div>
                            
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
                                <div className="text-center">
                                    <FileText className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                                    <p className="text-sm font-medium text-slate-700 mb-2">Upload Bank Document (Optional)</p>
                                    <p className="text-xs text-slate-500 mb-4">Upload bank statement or cancelled cheque for verification</p>
                                    <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileUpload('bankDetails')} className="hidden" id="bank-upload" />
                                    <label htmlFor="bank-upload" className="cursor-pointer bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                                        Choose File
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Professional Documents</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
                                <div className="text-center">
                                    <Shield className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                                    <p className="text-sm font-medium text-slate-700 mb-2">Medical License</p>
                                    <p className="text-xs text-slate-500 mb-4">Do you have a valid medical practitioner license?</p>
                                    <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileUpload('medicalLicense')} className="hidden" id="medical-upload" />
                                    <label htmlFor="medical-upload" className="cursor-pointer bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                                        Choose File
                                    </label>
                                </div>
                            </div>

                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
                                <div className="text-center">
                                    <FileText className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                                    <p className="text-sm font-medium text-slate-700 mb-2">Pharmacy Certificate</p>
                                    <p className="text-xs text-slate-500 mb-4">Do you have pharmacy operation certificates?</p>
                                    <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileUpload('pharmacyCertificate')} className="hidden" id="pharmacy-upload" />
                                    <label htmlFor="pharmacy-upload" className="cursor-pointer bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                                        Choose File
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="text-center">
                        <UserCheck className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Onboarding Complete!</h2>
                        <p className="text-lg text-slate-600 mb-8">Your account has been successfully set up.</p>
                    </div>
                );
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Save Indicator */}
                    {showSaveIndicator && (
                        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg z-50">
                            <Save className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700 font-medium">Draft saved</span>
                        </div>
                    )}
                    
                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-8">
                        {[1, 2, 3, 4].map((step, index) => (
                            <React.Fragment key={step}>
                                <div className="flex items-center">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                        step === currentStep ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
                                    }`}>
                                        {step}
                                    </div>
                                </div>
                                {index < 3 && (
                                    <div className={`flex-1 h-1 mx-2 ${
                                        step < currentStep ? 'bg-teal-600' : 'bg-slate-200'
                                    }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Step Content */}
                    <div className="min-h-[400px]">
                        {renderStepContent()}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        
                        {currentStep < 4 ? (
                            <button
                                onClick={handleNext}
                                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                            >
                                Next
                            </button>
                        ) : (
                            <Link
                                to="/auth/onboarding-review"
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
                            >
                                Go to Review
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;
