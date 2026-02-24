// Create a Form to ask

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HelpCircle, MessageSquare, AlertCircle, Clock, Plus } from "lucide-react";
import Input from "components/Form/Input";
import Select from "components/Form/Select";

const AskHelpForm = () => {
    const [selectedCaseType, setSelectedCaseType] = useState('');

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

    const formik = useFormik({
        initialValues: {
            subject: '',
            priority: 'medium',
            description: '',
            caseType: ''
        },
        validationSchema: Yup.object({
            caseType: Yup.string().required('Please select a case type'),
            subject: Yup.string()
                .required('Subject is required')
                .min(5, 'Subject must be at least 5 characters')
                .max(100, 'Subject must not exceed 100 characters'),
            priority: Yup.string().required('Priority is required'),
            description: Yup.string()
                .required('Description is required')
                .min(20, 'Description must be at least 20 characters')
                .max(1000, 'Description must not exceed 1000 characters')
        }),
        onSubmit: (values, { resetForm }) => {
            // Here you would typically make an API call to create the case
            console.log('Form submitted:', values);
            alert('Case raised successfully!');
            resetForm();
            setSelectedCaseType('');
        },
    });

    const handleCaseTypeSelect = (caseTypeId) => {
        setSelectedCaseType(caseTypeId);
        formik.setFieldValue('caseType', caseTypeId);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800">Raise New Case</h3>
            
            <div>
                <h4 className="text-md font-medium text-slate-700 mb-4">Select Case Type</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {caseTypes.map((type) => (
                        <div
                            key={type.id}
                            onClick={() => handleCaseTypeSelect(type.id)}
                            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                                selectedCaseType === type.id || formik.values.caseType === type.id
                                    ? 'border-teal-500 bg-teal-50'
                                    : type.color
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                {type.icon}
                                <div className="flex-1">
                                    <h5 className="font-medium text-slate-800">{type.title}</h5>
                                    <p className="text-sm text-slate-600 mt-1">{type.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {formik.touched.caseType && formik.errors.caseType && (
                    <p className="text-red-500 text-sm mt-2">{formik.errors.caseType}</p>
                )}
            </div>

            {(selectedCaseType || formik.values.caseType) && (
                <div className="bg-white border rounded-lg p-6 space-y-4">
                    <h4 className="text-md font-semibold text-slate-800">Case Details</h4>
                    
                    <form onSubmit={formik.handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    name="subject"
                                    type="text"
                                    value={formik.values.subject}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Brief description of your issue"
                                    className={`w-full ${
                                        formik.touched.subject && formik.errors.subject
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                />
                                {formik.touched.subject && formik.errors.subject && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.subject}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Priority <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    name="priority"
                                    value={formik.values.priority}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        formik.setFieldValue('priority', e.target.value);
                                    }}
                                    onBlur={formik.handleBlur}
                                    options={[
                                        { value: "low", label: "Low" },
                                        { value: "medium", label: "Medium" },
                                        { value: "high", label: "High" }
                                    ]}
                                    className={`${
                                        formik.touched.priority && formik.errors.priority
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                />
                                {formik.touched.priority && formik.errors.priority && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.priority}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Please provide detailed information about your issue..."
                                    className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                                        formik.touched.description && formik.errors.description
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                    rows="5"
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
                                )}
                                <div className="text-sm text-slate-500 mt-1">
                                    {formik.values.description.length}/1000 characters
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Plus className="w-4 h-4" />
                                    {formik.isSubmitting ? 'Submitting...' : 'Raise Case'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        formik.resetForm();
                                        setSelectedCaseType('');
                                    }}
                                    className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AskHelpForm;
