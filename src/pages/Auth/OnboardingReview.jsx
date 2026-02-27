import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  Clock,
  FileText,
  Upload,
  Camera,
  CreditCard,
  Shield,
  AlertCircle,
  RefreshCw,
  Eye,
  Download,
} from 'lucide-react'

const OnboardingReview = () => {
  const [documentStatus, setDocumentStatus] = useState({
    aadhar: {
      status: 'verified',
      uploadedAt: '2024-02-20T10:30:00Z',
      verifiedAt: '2024-02-20T14:45:00Z',
    },
    photo: { status: 'pending', uploadedAt: '2024-02-20T10:35:00Z', verifiedAt: null },
    panCard: {
      status: 'verified',
      uploadedAt: '2024-02-20T10:40:00Z',
      verifiedAt: '2024-02-20T15:20:00Z',
    },
    bankDetails: { status: 'pending', uploadedAt: '2024-02-20T10:45:00Z', verifiedAt: null },
    gstNumber: { status: 'not_uploaded', uploadedAt: null, verifiedAt: null },
    medicalLicense: { status: 'pending', uploadedAt: '2024-02-20T10:50:00Z', verifiedAt: null },
    pharmacyCertificate: {
      status: 'rejected',
      uploadedAt: '2024-02-19T16:20:00Z',
      verifiedAt: null,
      rejectionReason: 'Document is unclear or expired',
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update a pending document to verified (for demo)
      const pendingDocs = Object.keys(documentStatus).filter(
        (key) => documentStatus[key].status === 'pending',
      )

      if (pendingDocs.length > 0 && Math.random() > 0.8) {
        const randomDoc = pendingDocs[Math.floor(Math.random() * pendingDocs.length)]
        setDocumentStatus((prev) => ({
          ...prev,
          [randomDoc]: {
            ...prev[randomDoc],
            status: 'verified',
            verifiedAt: new Date().toISOString(),
          },
        }))
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [documentStatus])

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'not_uploaded':
        return 'text-slate-600 bg-slate-50 border-slate-200'
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className='w-5 h-5' />
      case 'pending':
        return <Clock className='w-5 h-5' />
      case 'rejected':
        return <AlertCircle className='w-5 h-5' />
      case 'not_uploaded':
        return <Upload className='w-5 h-5' />
      default:
        return <Clock className='w-5 h-5' />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified'
      case 'pending':
        return 'Pending Verification'
      case 'rejected':
        return 'Rejected'
      case 'not_uploaded':
        return 'Not Uploaded'
      default:
        return 'Unknown'
    }
  }

  const getDocumentIcon = (docType) => {
    switch (docType) {
      case 'aadhar':
        return <FileText className='w-6 h-6' />
      case 'photo':
        return <Camera className='w-6 h-6' />
      case 'panCard':
        return <CreditCard className='w-6 h-6' />
      case 'bankDetails':
        return <FileText className='w-6 h-6' />
      case 'gstNumber':
        return <Shield className='w-6 h-6' />
      case 'medicalLicense':
        return <Shield className='w-6 h-6' />
      case 'pharmacyCertificate':
        return <FileText className='w-6 h-6' />
      default:
        return <FileText className='w-6 h-6' />
    }
  }

  const getDocumentName = (docType) => {
    switch (docType) {
      case 'aadhar':
        return 'Aadhar Card'
      case 'photo':
        return 'Profile Photo'
      case 'panCard':
        return 'PAN Card'
      case 'bankDetails':
        return 'Bank Details'
      case 'gstNumber':
        return 'GST Number'
      case 'medicalLicense':
        return 'Medical License'
      case 'pharmacyCertificate':
        return 'Pharmacy Certificate'
      default:
        return docType
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API call to refresh status
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const overallStatus = {
    total: Object.keys(documentStatus).length,
    verified: Object.values(documentStatus).filter((doc) => doc.status === 'verified').length,
    pending: Object.values(documentStatus).filter((doc) => doc.status === 'pending').length,
    rejected: Object.values(documentStatus).filter((doc) => doc.status === 'rejected').length,
    notUploaded: Object.values(documentStatus).filter((doc) => doc.status === 'not_uploaded')
      .length,
  }

  const completionPercentage = Math.round((overallStatus.verified / overallStatus.total) * 100)

  return (
    <div className='min-h-screen bg-slate-50 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h1 className='text-2xl font-bold text-slate-900'>Document Verification Status</h1>
              <p className='text-slate-600 mt-1'>
                Track the verification progress of your submitted documents
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className='flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50'
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Overall Progress */}
          <div className='bg-slate-50 rounded-lg p-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm font-medium text-slate-700'>Overall Progress</span>
              <span className='text-sm font-bold text-teal-600'>{completionPercentage}%</span>
            </div>
            <div className='w-full bg-slate-200 rounded-full h-3 mb-3'>
              <div
                className='bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full transition-all duration-500'
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className='grid grid-cols-4 gap-4 text-center'>
              <div>
                <div className='text-2xl font-bold text-green-600'>{overallStatus.verified}</div>
                <div className='text-xs text-slate-600'>Verified</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-yellow-600'>{overallStatus.pending}</div>
                <div className='text-xs text-slate-600'>Pending</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-red-600'>{overallStatus.rejected}</div>
                <div className='text-xs text-slate-600'>Rejected</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-slate-600'>{overallStatus.notUploaded}</div>
                <div className='text-xs text-slate-600'>Not Uploaded</div>
              </div>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className='bg-white rounded-xl shadow-sm'>
          <div className='p-6 border-b border-slate-200'>
            <h2 className='text-lg font-semibold text-slate-900'>Documents</h2>
          </div>

          <div className='divide-y divide-slate-200'>
            {Object.entries(documentStatus).map(([docType, status]) => (
              <div key={docType} className='p-6 hover:bg-slate-50 transition-colors'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <div className={`p-3 rounded-lg ${getStatusColor(status.status)}`}>
                      {getDocumentIcon(docType)}
                    </div>

                    <div>
                      <h3 className='font-semibold text-slate-900'>{getDocumentName(docType)}</h3>
                      <div className='flex items-center gap-2 mt-1'>
                        <div
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status.status)}`}
                        >
                          {getStatusIcon(status.status)}
                          {getStatusText(status.status)}
                        </div>
                        {status.uploadedAt && (
                          <span className='text-xs text-slate-500'>
                            Uploaded: {formatDate(status.uploadedAt)}
                          </span>
                        )}
                      </div>

                      {status.verifiedAt && (
                        <p className='text-xs text-green-600 mt-1'>
                          Verified: {formatDate(status.verifiedAt)}
                        </p>
                      )}

                      {status.rejectionReason && (
                        <p className='text-xs text-red-600 mt-1'>
                          Reason: {status.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    {status.status !== 'not_uploaded' && (
                      <>
                        <button
                          className='p-2 text-slate-600 hover:text-teal-600 transition-colors'
                          title='View Document'
                        >
                          <Eye className='w-4 h-4' />
                        </button>
                        <button
                          className='p-2 text-slate-600 hover:text-teal-600 transition-colors'
                          title='Download'
                        >
                          <Download className='w-4 h-4' />
                        </button>
                      </>
                    )}

                    {status.status === 'rejected' && (
                      <button className='px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors'>
                        Re-upload
                      </button>
                    )}

                    {status.status === 'not_uploaded' && (
                      <Link
                        to='/auth/onboarding'
                        className='px-3 py-1.5 bg-teal-600 text-white text-xs font-medium rounded-lg hover:bg-teal-700 transition-colors'
                      >
                        Upload Now
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className='mt-6 flex justify-between'>
          {completionPercentage === 100 && (
            <Link
              to='/dashboard'
              className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium'
            >
              Proceed to Dashboard →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default OnboardingReview
