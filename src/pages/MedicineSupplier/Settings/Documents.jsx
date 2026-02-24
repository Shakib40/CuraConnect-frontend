// Documents settings component
import { useRef } from "react";
import { FileText, Upload, Download, Eye, Trash2, Plus } from "lucide-react";
import Input from "components/Form/Input";
import ToggleCheckbox from "components/Form/ToogleCheckbox";
import Select from "components/Form/Select";
import FileSelect from "components/Form/FileSelect";

const DocumentsSettings = ({ documentsSettings, setDocumentsSettings }) => {
    // Custom FileSelect component that works without Formik
    const CustomFileSelect = ({ label, name, accept, onFileSelect, currentFile, fileName }) => {
        const fileInputRef = useRef(null);

        const handleChange = (event) => {
            const file = event.currentTarget.files[0];
            onFileSelect(file);
        };

        const handleDragOver = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const handleDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const file = e.dataTransfer.files[0];
            if (file) {
                onFileSelect(file);
            }
        };

        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label className="text-sm font-medium text-slate-700">{label}</label>
                )}
                <div
                    className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors
                        ${currentFile ? "border-teal-400 bg-teal-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-teal-400"}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        name={name}
                        ref={fileInputRef}
                        accept={accept}
                        onChange={handleChange}
                        className="hidden"
                    />
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <p className="text-sm font-medium text-slate-700 text-center">
                        <span className="text-teal-600 hover:underline">Click to upload</span>{" "}
                        or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 mt-1 text-center">
                        {currentFile ? fileName : `Accepted files: ${accept}`}
                    </p>
                </div>
            </div>
        );
    };
    const handleAddDocument = () => {
        const newDocuments = [...(documentsSettings.documents || []), {
            id: Date.now(),
            name: '',
            type: 'LICENSE',
            expiryDate: '',
            file: null,
            uploaded: false
        }];
        setDocumentsSettings({...documentsSettings, documents: newDocuments});
    };

    const handleRemoveDocument = (index) => {
        const newDocuments = documentsSettings.documents.filter((_, i) => i !== index);
        setDocumentsSettings({...documentsSettings, documents: newDocuments});
    };

    const handleDocumentChange = (index, field, value) => {
        const newDocuments = [...documentsSettings.documents];
        newDocuments[index] = {...newDocuments[index], [field]: value};
        setDocumentsSettings({...documentsSettings, documents: newDocuments});
    };

    const handleFileSelect = (index, file) => {
        const newDocuments = [...documentsSettings.documents];
        newDocuments[index] = {
            ...newDocuments[index], 
            file: file,
            uploaded: !!file,
            fileName: file ? file.name : ''
        };
        setDocumentsSettings({...documentsSettings, documents: newDocuments});
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-600" />
                Document Management
            </h3>
            
            <div className="space-y-4">
                {documentsSettings.documents?.map((doc, index) => (
                    <div key={doc.id || index} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-start">
                            <h4 className="font-medium text-slate-700">Document {index + 1}</h4>
                            {documentsSettings.documents.length > 1 && (
                                <button
                                    onClick={() => handleRemoveDocument(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Input
                                    name={`documentName_${index}`}
                                    type="text"
                                    value={doc.name}
                                    onChange={(e) => handleDocumentChange(index, 'name', e.target.value)}
                                    label="Document Name"
                                />
                            </div>
                            <div>
                                <Select
                                    name={`documentType_${index}`}
                                    value={doc.type}
                                    onChange={(e) => handleDocumentChange(index, 'type', e.target.value)}
                                    label="Document Type"
                                    options={[
                                        { value: "LICENSE", label: "Business License" },
                                        { value: "PERMIT", label: "Operating Permit" },
                                        { value: "CERTIFICATE", label: "Certificate" },
                                        { value: "AGREEMENT", label: "Agreement" },
                                        { value: "INSURANCE", label: "Insurance Policy" },
                                        { value: "OTHER", label: "Other" }
                                    ]}
                                />
                            </div>
                            <div>
                                <Input
                                    name={`expiryDate_${index}`}
                                    type="date"
                                    value={doc.expiryDate}
                                    onChange={(e) => handleDocumentChange(index, 'expiryDate', e.target.value)}
                                    label="Expiry Date"
                                />
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <CustomFileSelect
                                label="Upload Document"
                                name={`documentFile_${index}`}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onFileSelect={(file) => handleFileSelect(index, file)}
                                currentFile={doc.file}
                                fileName={doc.fileName}
                            />
                        </div>
                        
                    </div>
                ))}
                
                <button
                    onClick={handleAddDocument}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Document
                </button>
            </div>

            <div className="border-t pt-6">
                <h4 className="font-medium text-slate-700 mb-4">Uploaded Documents</h4>
                {documentsSettings.documents?.filter(doc => doc.uploaded && doc.file).length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b bg-slate-50">
                                    <th className="text-left p-3 font-medium text-slate-700">Document</th>
                                    <th className="text-left p-3 font-medium text-slate-700">Type</th>
                                    <th className="text-left p-3 font-medium text-slate-700">Expiry Date</th>
                                    <th className="text-left p-3 font-medium text-slate-700">File Name</th>
                                    <th className="text-center p-3 font-medium text-slate-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documentsSettings.documents
                                    .filter(doc => doc.uploaded && doc.file)
                                    .map((doc) => (
                                        <tr key={doc.id} className="border-b hover:bg-slate-50">
                                            <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-teal-600" />
                                                    <span className="font-medium text-slate-700">
                                                        {doc.name || 'Untitled Document'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-3 text-slate-600">{doc.type}</td>
                                            <td className="p-3 text-slate-600">
                                                {doc.expiryDate || 'Not set'}
                                            </td>
                                            <td className="p-3 text-slate-600 text-sm">
                                                {doc.fileName || 'Unknown'}
                                            </td>
                                            <td className="p-3">
                                                <div className="flex justify-center gap-2">
                                                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm">
                                                        <Eye className="w-3 h-3" />
                                                        View
                                                    </button>
                                                    <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1 text-sm">
                                                        <Download className="w-3 h-3" />
                                                        Download
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8 text-slate-500">
                        <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p>No documents uploaded yet</p>
                        <p className="text-sm">Upload documents using the form above</p>
                    </div>
                )}
            </div>

            <div className="border-t pt-6">
                <h4 className="font-medium text-slate-700 mb-4">Document Settings</h4>
                <div className="space-y-4">
                    <ToggleCheckbox
                        name="autoReminders"
                        checked={documentsSettings.autoReminders}
                        onChange={(e) => setDocumentsSettings({...documentsSettings, autoReminders: e.target.checked})}
                        label="Automatic Expiry Reminders"
                        description="Get notified before documents expire"
                    />
                    <div>
                        <Select
                            name="reminderDays"
                            value={documentsSettings.reminderDays}
                            onChange={(e) => setDocumentsSettings({...documentsSettings, reminderDays: e.target.value})}
                            label="Reminder Days Before Expiry"
                            options={[
                                { value: "7", label: "7 days" },
                                { value: "14", label: "14 days" },
                                { value: "30", label: "30 days" },
                                { value: "60", label: "60 days" }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentsSettings;
