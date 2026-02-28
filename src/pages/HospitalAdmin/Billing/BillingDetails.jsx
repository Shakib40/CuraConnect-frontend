import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  FileText,
  User,
  Calendar,
  DollarSign,
  Download,
  Edit,
  Mail,
  Printer,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react'
import Button from '../../../components/UI/Button'
import CustomModal from '../../../components/UI/CustomModal'

const BillingDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [paymentMode, setPaymentMode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [insuranceNotes, setInsuranceNotes] = useState('')
  const [paymentNotes, setPaymentNotes] = useState('')

  // Mock billing record data - in a real app, this would come from an API call
  const [billingRecord] = useState({
    id: 'BL-001',
    patientId: 'P-001',
    patientName: 'John Doe',
    patientEmail: 'john.doe@email.com',
    patientPhone: '+1 234 567 8900',
    patientAddress: '123 Main St, New York, NY 10001',
    patientAge: '35',
    patientGender: 'Male',
    patientBloodGroup: 'O+',
    patientAllergies: 'Penicillin, Peanuts',
    patientMedicalHistory: 'Hypertension, Diabetes Type 2',
    doctor: 'Dr. Sarah Johnson',
    visitType: 'surgery',
    visitDate: '2024-02-15',
    status: 'pending',
    totalAmount: 17500,
    paidAmount: 8000,
    remainingAmount: 9500,
    paidDate: null,
    activityLogs: [
      {
        id: 1,
        type: 'surgery',
        date: '2024-02-10T09:00:00Z',
        description: 'Appendectomy Surgery',
        doctor: 'Dr. Sarah Johnson',
        amount: 8000,
        paid: true,
        paidDate: '2024-02-10T09:00:00Z',
        details: {
          surgeryType: 'Appendectomy',
          duration: '2 hours',
          anesthesia: 'General',
          complications: 'None',
        },
      },
      {
        id: 2,
        type: 'lab_test',
        date: '2024-02-10T11:30:00Z',
        description: 'Pre-operative Blood Tests',
        doctor: 'Dr. Sarah Johnson',
        amount: 500,
        paid: true,
        paidDate: '2024-02-10T11:30:00Z',
        details: {
          tests: ['CBC', 'Blood Chemistry', 'Coagulation Profile'],
          results: 'Normal',
        },
      },
      {
        id: 3,
        type: 'prescription',
        date: '2024-02-11T10:00:00Z',
        description: 'Post-operative Medication',
        doctor: 'Dr. Sarah Johnson',
        amount: 250,
        paid: false,
        paidDate: null,
        details: {
          medicines: [
            { name: 'Amoxicillin', dosage: '500mg', quantity: 14, price: 50 },
            { name: 'Ibuprofen', dosage: '400mg', quantity: 10, price: 30 },
            { name: 'Omeprazole', dosage: '20mg', quantity: 7, price: 40 },
          ],
        },
      },
      {
        id: 4,
        type: 'lab_test',
        date: '2024-02-12T14:00:00Z',
        description: 'Post-operative Blood Tests',
        doctor: 'Dr. Sarah Johnson',
        amount: 300,
        paid: false,
        paidDate: null,
        details: {
          tests: ['CBC', 'CRP'],
          results: 'Normal healing',
        },
      },
      {
        id: 5,
        type: 'prescription',
        date: '2024-02-14T15:30:00Z',
        description: 'Follow-up Medication',
        doctor: 'Dr. Michael Chen',
        amount: 180,
        paid: false,
        paidDate: null,
        details: {
          medicines: [
            { name: 'Paracetamol', dosage: '500mg', quantity: 10, price: 20 },
            { name: 'Vitamin C', dosage: '1000mg', quantity: 15, price: 40 },
            { name: 'Probiotics', dosage: '10B CFU', quantity: 7, price: 120 },
          ],
        },
      },
    ],
    appointmentDetails: null,
    surgeryDetails: {
      surgeryType: 'Appendectomy',
      surgeryDate: '2024-02-10',
      surgeon: 'Dr. Sarah Johnson',
      anesthesia: 'General',
      complications: 'None',
    },
    roomDetails: {
      roomType: 'Private Room',
      admissionDate: '2024-02-10',
      dischargeDate: '2024-02-15',
      numberOfDays: 5,
      dailyRate: 500,
      totalRoomCharge: 2500,
    },
    services: [
      { description: 'Surgery Charges', quantity: 1, unitPrice: 8000, amount: 8000 },
      { description: 'Lab Tests', quantity: 2, unitPrice: 400, amount: 800 },
      { description: 'Medications', quantity: 6, unitPrice: 105, amount: 630 },
      { description: 'Room Charges (Private Room)', quantity: 5, unitPrice: 500, amount: 2500 },
    ],
    labReports: [
      {
        testName: 'Complete Blood Count',
        testDate: '2024-02-10',
        status: 'completed',
        results: {
          hemoglobin: '14.5 g/dL',
          hematocrit: '43%',
          wbc: '7.2 × 10³/μL',
          platelets: '250 × 10⁹/μL',
        },
        normalRanges: {
          hemoglobin: '13.5-17.5 g/dL',
          hematocrit: '41-50%',
          wbc: '4.5-11.0 × 10³/μL',
          platelets: '150-450 × 10⁹/μL',
        },
      },
      {
        testName: 'C-Reactive Protein',
        testDate: '2024-02-12',
        status: 'completed',
        results: {
          crp: '5 mg/L',
        },
        normalRanges: {
          crp: '< 3 mg/L',
        },
      },
    ],
    notes:
      'Patient underwent successful appendectomy surgery. Recovery progressing well. Follow-up scheduled for next week.',
    createdAt: '2024-02-15T10:30:00Z',
    updatedAt: '2024-02-15T14:22:00Z',
  })

  const getVisitTypeColor = (visitType) => {
    switch (visitType) {
      case 'appointment':
        return 'bg-blue-100 text-blue-800'
      case 'surgery':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Overdue':
        return 'bg-red-100 text-red-800'
      case 'Draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className='w-4 h-4' />
      case 'Pending':
        return <Clock className='w-4 h-4' />
      case 'Overdue':
        return <AlertCircle className='w-4 h-4' />
      case 'Draft':
        return <FileText className='w-4 h-4' />
      default:
        return <FileText className='w-4 h-4' />
    }
  }

  const handleMarkCompleted = () => {
    console.log('Marking billing record as completed:', id)
    // Here you would typically make an API call to update status
  }

  const handleCheckout = () => {
    setShowCheckoutModal(true)
  }

  const handleCheckoutModalClose = () => {
    setShowCheckoutModal(false)
    setPaymentMode('')
    setDiscount(0)
    setInsuranceNotes('')
    setPaymentNotes('')
  }

  const handleProcessPayment = () => {
    console.log('Processing payment:', {
      paymentMode,
      discount,
      insuranceNotes,
      paymentNotes,
      totalAmount: billingRecord.totalAmount,
      finalAmount: billingRecord.totalAmount - discount,
    })
    setShowCheckoutModal(false)
  }

  const calculateFinalAmount = () => {
    return billingRecord.totalAmount - discount
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate('/hospital-admin/billing')}
              className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              Back to Billing
            </button>
            <h1 className='text-2xl font-bold text-slate-800'>Billing Details</h1>
          </div>
          <div className='flex items-center gap-2'>
            {billingRecord.status === 'pending' && (
              <Button variant='primary' onClick={handleMarkCompleted} icon={CheckCircle}>
                Mark as Completed
              </Button>
            )}
            <Button variant='primary' onClick={handleCheckout} icon={DollarSign}>
              Checkout & Process Payment
            </Button>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200'>
        {/* Billing Record Header */}
        <div className='p-6 border-b border-slate-200'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-bold text-slate-800 mb-2'>
                Billing Record #{billingRecord.id}
              </h2>
              <div className='flex items-center gap-2'>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    billingRecord.status,
                  )}`}
                >
                  {getStatusIcon(billingRecord.status)}
                  {billingRecord.status}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getVisitTypeColor(
                    billingRecord.visitType,
                  )}`}
                >
                  {billingRecord.visitType === 'appointment' ? 'Appointment' : 'Surgery'}
                </span>
              </div>
            </div>
            <div className='text-right'>
              <div className='text-sm text-slate-600'>Visit Date</div>
              <div className='font-medium text-slate-900'>{billingRecord.visitDate}</div>
              {billingRecord.paidDate && (
                <>
                  <div className='text-sm text-slate-600 mt-2'>Paid Date</div>
                  <div className='font-medium text-green-600'>{billingRecord.paidDate}</div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className='p-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Patient Information */}
            <div>
              <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                <User className='w-5 h-5' />
                Patient Information
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div>
                  <div className='text-sm text-slate-600'>Name</div>
                  <div className='font-medium text-slate-900'>{billingRecord.patientName}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Patient ID</div>
                  <div className='font-medium text-slate-900'>{billingRecord.patientId}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Email</div>
                  <div className='font-medium text-slate-900'>{billingRecord.patientEmail}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Phone</div>
                  <div className='font-medium text-slate-900'>{billingRecord.patientPhone}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Address</div>
                  <div className='font-medium text-slate-900'>{billingRecord.patientAddress}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Age</div>
                  <div className='font-medium text-slate-900'>{billingRecord.patientAge} years</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Gender</div>
                  <div className='font-medium text-slate-900'>{billingRecord.patientGender}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Blood Group</div>
                  <div className='font-medium text-slate-900'>
                    {billingRecord.patientBloodGroup}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Allergies</div>
                  <div className='font-medium text-slate-900'>{billingRecord.patientAllergies}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Medical History</div>
                  <div className='font-medium text-slate-900'>
                    {billingRecord.patientMedicalHistory}
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor & Service Information */}
            <div>
              <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                <FileText className='w-5 h-5' />
                Visit & Service Information
              </h3>
              <div className='space-y-3'>
                <div>
                  <div className='text-sm text-slate-600'>Attending Doctor</div>
                  <div className='font-medium text-slate-900'>{billingRecord.doctor}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Visit Date</div>
                  <div className='font-medium text-slate-900'>{billingRecord.visitDate}</div>
                </div>
              </div>
            </div>

            {/* Visit Details */}
            {billingRecord.visitType === 'appointment' && billingRecord.appointmentDetails && (
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4'>Appointment Details</h3>
                <div className='bg-slate-50 rounded-lg p-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <div className='text-sm text-slate-600'>Appointment Type</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.appointmentDetails.appointmentType}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Appointment Date</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.appointmentDetails.appointmentDate}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Appointment Time</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.appointmentDetails.appointmentTime}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Symptoms</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.appointmentDetails.symptoms}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Diagnosis</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.appointmentDetails.diagnosis}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Treatment</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.appointmentDetails.treatment}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Follow-up Date</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.appointmentDetails.followUpDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Surgery Details */}
            {billingRecord.visitType === 'surgery' && billingRecord.surgeryDetails && (
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4'>Surgery Details</h3>
                <div className='bg-slate-50 rounded-lg p-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <div className='text-sm text-slate-600'>Surgery Type</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.surgeryDetails.surgeryType}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Surgery Date</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.surgeryDetails.surgeryDate}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Surgeon</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.surgeryDetails.surgeon}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Anesthesia</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.surgeryDetails.anesthesia}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Complications</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.surgeryDetails.complications || 'None'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Room Details */}
            {billingRecord.roomDetails && (
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <FileText className='w-5 h-5' />
                  Room & Stay Details
                </h3>
                <div className='bg-slate-50 rounded-lg p-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <div className='text-sm text-slate-600'>Room Type</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.roomDetails.roomType}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Daily Rate</div>
                      <div className='font-medium text-slate-900'>
                        ${billingRecord.roomDetails.dailyRate}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Admission Date</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.roomDetails.admissionDate}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Discharge Date</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.roomDetails.dischargeDate}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Number of Days</div>
                      <div className='font-medium text-slate-900'>
                        {billingRecord.roomDetails.numberOfDays} days
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-slate-600'>Total Room Charge</div>
                      <div className='font-medium text-slate-900 text-green-600'>
                        ${billingRecord.roomDetails.totalRoomCharge}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Activity Logs */}
          <div className='lg:col-span-2'>
            <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
              <Clock className='w-5 h-5' />
              Activity Logs & Billing History
            </h3>
            <div className='space-y-4'>
              {billingRecord.activityLogs
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((log) => (
                  <div key={log.id} className='bg-white rounded-lg border border-slate-200 p-4'>
                    <div className='flex items-start justify-between mb-3'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-2'>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              log.type === 'surgery'
                                ? 'bg-purple-100 text-purple-800'
                                : log.type === 'lab_test'
                                  ? 'bg-blue-100 text-blue-800'
                                  : log.type === 'prescription'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {log.type === 'surgery' && 'Surgery'}
                            {log.type === 'lab_test' && 'Lab Test'}
                            {log.type === 'prescription' && 'Prescription'}
                          </span>
                          <span className='text-sm text-slate-500'>
                            {new Date(log.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <h4 className='font-medium text-slate-900 mb-1'>{log.description}</h4>
                        <p className='text-sm text-slate-600 mb-2'>By {log.doctor}</p>
                      </div>
                      <div className='text-right'>
                        <div className='text-lg font-semibold text-slate-900'>${log.amount}</div>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            log.paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {log.paid ? 'Paid' : 'Unpaid'}
                        </span>
                        {log.paid && log.paidDate && (
                          <div className='text-xs text-slate-500 mt-1'>
                            Paid:{' '}
                            {new Date(log.paidDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Detailed Information */}
                    <div className='border-t border-slate-100 pt-3'>
                      {log.type === 'surgery' && log.details && (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-sm'>
                          <div>
                            <span className='text-slate-600'>Surgery Type:</span>
                            <span className='ml-2 font-medium text-slate-900'>
                              {log.details.surgeryType}
                            </span>
                          </div>
                          <div>
                            <span className='text-slate-600'>Duration:</span>
                            <span className='ml-2 font-medium text-slate-900'>
                              {log.details.duration}
                            </span>
                          </div>
                          <div>
                            <span className='text-slate-600'>Anesthesia:</span>
                            <span className='ml-2 font-medium text-slate-900'>
                              {log.details.anesthesia}
                            </span>
                          </div>
                          <div>
                            <span className='text-slate-600'>Complications:</span>
                            <span className='ml-2 font-medium text-slate-900'>
                              {log.details.complications}
                            </span>
                          </div>
                        </div>
                      )}

                      {log.type === 'lab_test' && log.details && (
                        <div className='text-sm'>
                          <div className='mb-2'>
                            <span className='text-slate-600'>Tests:</span>
                            <div className='flex flex-wrap gap-1 mt-1'>
                              {log.details.tests.map((test, index) => (
                                <span
                                  key={index}
                                  className='inline-block px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs'
                                >
                                  {test}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className='text-slate-600'>Results:</span>
                            <span className='ml-2 font-medium text-slate-900'>
                              {log.details.results}
                            </span>
                          </div>
                        </div>
                      )}

                      {log.type === 'prescription' && log.details && log.details.medicines && (
                        <div className='text-sm'>
                          <div className='mb-3'>
                            <span className='text-slate-600 font-medium'>Medicines:</span>
                            <div className='mt-2 space-y-2'>
                              {log.details.medicines.map((medicine, index) => (
                                <div
                                  key={index}
                                  className='flex justify-between items-center bg-slate-50 rounded p-2'
                                >
                                  <div>
                                    <span className='font-medium text-slate-900'>
                                      {medicine.name}
                                    </span>
                                    <span className='text-slate-600 ml-2'>
                                      {medicine.dosage} × {medicine.quantity}
                                    </span>
                                  </div>
                                  <span className='font-medium text-slate-900'>
                                    ${medicine.price}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Prescription Summary with GST */}
                          <div className='border-t border-slate-200 pt-2 mt-3'>
                            <div className='space-y-1'>
                              <div className='flex justify-between text-sm'>
                                <span className='text-slate-600'>Subtotal:</span>
                                <span className='font-medium text-slate-900'>
                                  ${log.details.medicines.reduce((sum, med) => sum + med.price, 0)}
                                </span>
                              </div>
                              <div className='flex justify-between text-sm'>
                                <span className='text-slate-600'>GST (18%):</span>
                                <span className='font-medium text-slate-900'>
                                  $
                                  {(
                                    log.details.medicines.reduce((sum, med) => sum + med.price, 0) *
                                    0.18
                                  ).toFixed(2)}
                                </span>
                              </div>
                              <div className='flex justify-between text-sm font-semibold text-slate-900 border-t border-slate-200 pt-1'>
                                <span>Total:</span>
                                <span>${log.amount}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Lab Reports */}
          {billingRecord.labReports && billingRecord.labReports.length > 0 && (
            <div className='mt-8'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                <FileText className='w-5 h-5' />
                Lab Reports
              </h3>
              <div className='space-y-4'>
                {billingRecord.labReports.map((report, index) => (
                  <div key={index} className='bg-white rounded-lg border border-slate-200 p-4'>
                    <div className='flex items-center justify-between mb-3'>
                      <div>
                        <h4 className='text-base font-medium text-slate-900'>{report.testName}</h4>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                            report.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {report.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                      <div className='text-sm text-slate-500'>Test Date: {report.testDate}</div>
                    </div>
                    <div className='text-sm text-slate-600'>Report Status</div>
                    <div className='font-medium text-slate-900'>{report.status}</div>
                    <div className='mt-4'>
                      <h5 className='font-medium text-slate-800 mb-2'>Test Results</h5>
                      <div className='space-y-2'>
                        {Object.entries(report.results).map(([key, value]) => (
                          <div key={key} className='flex justify-between'>
                            <span className='text-sm text-slate-600 capitalize'>
                              {key.replace(/([A-Z])/g, ' $1')}:
                            </span>
                            <span className='font-medium text-slate-900'>{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className='mt-3 pt-3 border-t border-slate-200'>
                        <h5 className='font-medium text-slate-800 mb-2'>Normal Ranges</h5>
                        <div className='space-y-2'>
                          {Object.entries(report.normalRanges).map(([key, value]) => (
                            <div key={key} className='flex justify-between'>
                              <span className='text-sm text-slate-600 capitalize'>
                                {key.replace(/([A-Z])/g, ' $1')}:
                              </span>
                              <span className='font-medium text-slate-900'>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {billingRecord.notes && (
            <div className='mt-8'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4'>Notes</h3>
              <div className='bg-slate-50 rounded-lg p-4'>
                <p className='text-sm text-slate-700'>{billingRecord.notes}</p>
              </div>
            </div>
          )}

          {/* Services & Charges */}
          <div className='mt-8'>
            <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
              <DollarSign className='w-5 h-5' />
              Services & Charges
            </h3>
            <div className='border border-slate-200 rounded-lg overflow-hidden'>
              <table className='w-full'>
                <thead className='bg-slate-50 border-b border-slate-200'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                      Service Description
                    </th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider'>
                      Quantity
                    </th>
                    <th className='px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider'>
                      Unit Price
                    </th>
                    <th className='px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider'>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-slate-200'>
                  {billingRecord.services.map((service, index) => (
                    <tr key={index}>
                      <td className='px-6 py-4 text-sm text-slate-900'>{service.description}</td>
                      <td className='px-6 py-4 text-sm text-slate-900 text-center'>
                        {service.quantity}
                      </td>
                      <td className='px-6 py-4 text-sm text-slate-900 text-right'>
                        ${service.unitPrice.toFixed(2)}
                      </td>
                      <td className='px-6 py-4 text-sm font-medium text-slate-900 text-right'>
                        ${service.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className='bg-slate-50 border-t border-slate-200'>
                  <tr>
                    <td
                      colSpan='3'
                      className='px-6 py-3 text-sm font-medium text-slate-900 text-right'
                    >
                      Subtotal:
                    </td>
                    <td className='px-6 py-3 text-sm font-medium text-slate-900 text-right'>
                      $
                      {billingRecord.services
                        .reduce((sum, service) => sum + service.amount, 0)
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Checkout Section */}
          <div className='mt-8 flex justify-end'>
            <Button variant='primary' onClick={handleCheckout} icon={DollarSign}>
              Checkout & Process Payment
            </Button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CustomModal
        size='xl'
        show={showCheckoutModal}
        onClose={handleCheckoutModalClose}
        title='Checkout & Payment'
        icon={<DollarSign className='w-6 h-6 text-blue-600' />}
        iconClassName='bg-blue-50'
        footer={
          <div className='flex justify-end gap-3'>
            <Button variant='secondary' onClick={handleCheckoutModalClose}>
              Cancel
            </Button>
            <Button variant='primary' onClick={handleProcessPayment} disabled={!paymentMode}>
              Process Payment
            </Button>
          </div>
        }
      >
        {/* Payment Summary */}
        <div className='bg-slate-50 rounded-lg p-4 mb-6'>
          <h4 className='font-medium text-slate-800 mb-3'>Payment Summary</h4>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='text-slate-600'>Total Amount:</span>
              <span className='font-medium text-slate-900'>
                ${billingRecord.totalAmount.toFixed(2)}
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-slate-600'>Discount:</span>
              <span className='font-medium text-red-600'>-${discount.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-sm font-semibold text-slate-900 pt-2 border-t border-slate-200'>
              <span>Final Amount:</span>
              <span>${calculateFinalAmount().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Mode */}
        <div className='mb-6'>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Mode of Payment *
          </label>
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            required
          >
            <option value=''>Select Payment Mode</option>
            <option value='cash'>Cash</option>
            <option value='card'>Credit/Debit Card</option>
            <option value='insurance'>Insurance</option>
            <option value='online'>Online Payment</option>
            <option value='mixed'>Mixed Payment</option>
          </select>
        </div>

        {/* Discount */}
        <div className='mb-6'>
          <label className='block text-sm font-medium text-slate-700 mb-2'>Discount ($)</label>
          <input
            type='number'
            value={discount}
            onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
            min='0'
            max={billingRecord.totalAmount}
            className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='Enter discount amount'
          />
        </div>

        {/* Insurance Notes */}
        <div className='mb-6'>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Insurance Notes
          </label>
          <textarea
            value={insuranceNotes}
            onChange={(e) => setInsuranceNotes(e.target.value)}
            rows='3'
            className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='Enter insurance details, policy number, claim information...'
          />
        </div>

        {/* Payment Notes */}
        <div className='mb-6'>
          <label className='block text-sm font-medium text-slate-700 mb-2'>Payment Notes</label>
          <textarea
            value={paymentNotes}
            onChange={(e) => setPaymentNotes(e.target.value)}
            rows='3'
            className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='Enter any additional payment notes or instructions...'
          />
        </div>
      </CustomModal>
    </div>
  )
}

export default BillingDetails
