import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Stethoscope,
  Award,
  Users,
  MapPin,
  DollarSign,
  Shield,
} from 'lucide-react'
import Table from '../../../components/UI/Table'
import Button from '../../../components/UI/Button'

const SurgeryDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock surgery data based on ID
  const [surgery] = useState({
    id: id || 1,
    surgeryType: 'Open Heart Surgery',
    surgeryDate: '2024-02-25',
    surgeryTime: '10:00 AM',
    status: 'Scheduled',
    bookingDate: '2024-02-15',
    estimatedDuration: '4-6 hours',
    urgency: 'High',
    anesthesia: 'General Anesthesia',
    hospital: 'Main Hospital',
    operatingRoom: 'OR-3',
    floor: '3rd Floor',
    building: 'Main Building',
    patientName: 'John Smith',
    patientId: 'PAT001',
    patientAge: 45,
    patientGender: 'Male',
    patientBloodType: 'O+',
    patientEmail: 'john.smith@gmail.com',
    patientPhone: '+1 (555) 987-6543',
    patientAddress: '123 Main St, City, State 12345',
    patientAllergies: 'Penicillin, Latex',
    patientConditions: 'Hypertension, Diabetes Type 2',
    surgeonName: 'Dr. Sarah Johnson',
    surgeonId: 'DOC001',
    surgeonSpecialization: 'Cardiothoracic Surgery',
    surgeonExperience: '15 years',
    surgeonQualifications: 'MD, FACS',
    surgeonEmail: 'sarah.johnson@hospital.com',
    surgeonPhone: '+1 (555) 123-4567',
    department: 'Cardiology',
    reason: 'Coronary artery bypass grafting due to severe blockages in coronary arteries',
    preOpInstructions:
      'Patient advised to fast for 12 hours before surgery. Stop blood thinners 48 hours prior.',
    postOpInstructions: 'Monitor vital signs every 4 hours. Keep incision site dry and clean.',
    fee: 25000,
    gstRate: 18,
    hasInsurance: true,
    insuranceProvider: 'HealthPlus Insurance',
    insurancePolicy: 'Premium Health Plan',
    insuranceCoverage: 80,
    insuranceApproval: 'APPROVED',
    insuranceAuthCode: 'AUTH-2024-0256',
    notes:
      'Patient has history of hypertension and diabetes. Pre-operative cardiac catheterization shows 90% blockage in LAD artery. Family history of heart disease.',
    medicalTeam: [
      {
        role: 'Lead Surgeon',
        name: 'Dr. Sarah Johnson',
        specialization: 'Cardiothoracic Surgery',
        experience: '15 years',
      },
      {
        role: 'Assistant Surgeon',
        name: 'Dr. Michael Chen',
        specialization: 'Cardiac Surgery',
        experience: '10 years',
      },
      {
        role: 'Anesthesiologist',
        name: 'Dr. Emily Rodriguez',
        specialization: 'Anesthesiology',
        experience: '12 years',
      },
      {
        role: 'Perfusionist',
        name: 'James Wilson',
        specialization: 'Perfusion',
        experience: '8 years',
      },
      {
        role: 'Scrub Nurse',
        name: 'Lisa Thompson',
        specialization: 'Surgical Nursing',
        experience: '6 years',
      },
    ],
    equipment: [
      'Heart-Lung Machine',
      'Ventilator',
      'Defibrillator',
      'Patient Monitor',
      'Surgical Instruments Set',
      'ECG Machine',
      'Blood Gas Analyzer',
    ],
    medications: [
      {
        name: 'Anesthesia Medication',
        dosage: 'General',
        timing: 'During Surgery',
      },
      {
        name: 'Pain Medication',
        dosage: 'As needed',
        timing: 'Post-Surgery',
      },
      {
        name: 'Antibiotics',
        dosage: 'IV',
        timing: 'Post-Surgery',
      },
      {
        name: 'Blood Thinners',
        dosage: 'Oral',
        timing: 'Post-Surgery',
      },
    ],
    labTests: [
      {
        name: 'Complete Blood Count',
        date: '2024-02-20',
        result: 'Normal',
      },
      {
        name: 'Cardiac Enzymes',
        date: '2024-02-20',
        result: 'Elevated',
      },
      {
        name: 'Chest X-Ray',
        date: '2024-02-20',
        result: 'Clear',
      },
      {
        name: 'Echocardiogram',
        date: '2024-02-20',
        result: 'Reduced Ejection Fraction',
      },
    ],
    previousSurgeries: [
      {
        id: 101,
        date: '2023-08-10',
        type: 'Cardiac Catheterization',
        status: 'Completed',
        outcome: 'Successful',
        complications: 'None',
      },
      {
        id: 102,
        date: '2023-02-15',
        type: 'Stent Placement',
        status: 'Completed',
        outcome: 'Successful',
        complications: 'Minor bleeding',
      },
    ],
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'Pending':
        return 'bg-amber-100 text-amber-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      case 'In Progress':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High':
        return 'bg-red-100 text-red-800'
      case 'Medium':
        return 'bg-amber-100 text-amber-800'
      case 'Low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  // Calculate payment breakdown
  const gstAmount = (surgery.fee * surgery.gstRate) / 100
  const totalWithGST = surgery.fee + gstAmount
  const insuranceAmount = surgery.hasInsurance
    ? (totalWithGST * surgery.insuranceCoverage) / 100
    : 0
  const patientPays = totalWithGST - insuranceAmount

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/hospital-admin/surgery')}
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Surgeries
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>Surgery Details</h1>
        </div>
      </div>

      {/* Surgery Overview */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <div className='flex items-start justify-between mb-6'>
          <div>
            <h2 className='text-xl font-bold text-slate-800 mb-2'>{surgery.surgeryType}</h2>
            <div className='flex items-center gap-4 text-sm text-slate-600'>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-slate-400' />
                {surgery.surgeryDate}
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4 text-slate-400' />
                {surgery.surgeryTime}
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4 text-slate-400' />
                Est. {surgery.estimatedDuration}
              </div>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                surgery.status,
              )}`}
            >
              {surgery.status}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(
                surgery.urgency,
              )}`}
            >
              {surgery.urgency} Priority
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-sm'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Booking Date</label>
            <div className='text-slate-900'>{surgery.bookingDate}</div>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Anesthesia</label>
            <div className='text-slate-900'>{surgery.anesthesia}</div>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Operating Room</label>
            <div className='text-slate-900'>{surgery.operatingRoom}</div>
          </div>
        </div>

        <div className='mt-4'>
          <label className='block text-sm font-medium text-slate-700 mb-1'>
            Reason for Surgery
          </label>
          <div className='text-slate-900'>{surgery.reason}</div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Pre-Op Instructions
            </label>
            <div className='text-slate-900 text-sm'>{surgery.preOpInstructions}</div>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Post-Op Instructions
            </label>
            <div className='text-slate-900 text-sm'>{surgery.postOpInstructions}</div>
          </div>
        </div>
      </div>

      {/* Patient Information */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Patient Information</h3>
        <div className='flex items-start gap-6 mb-6'>
          <div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-2xl uppercase'>
            {surgery.patientName.charAt(0)}
          </div>
          <div className='flex-1'>
            <h4 className='text-lg font-semibold text-slate-800 mb-2'>{surgery.patientName}</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm'>
              <div className='flex items-center gap-2'>
                <User className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>ID: {surgery.patientId}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{surgery.patientAge} years</span>
              </div>
              <div className='flex items-center gap-2'>
                <User className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{surgery.patientGender}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{surgery.patientEmail}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{surgery.patientPhone}</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{surgery.patientAddress}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-sm'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Blood Type</label>
            <div className='text-slate-900 font-medium'>{surgery.patientBloodType}</div>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Allergies</label>
            <div className='text-slate-900'>{surgery.patientAllergies}</div>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Medical Conditions
            </label>
            <div className='text-slate-900'>{surgery.patientConditions}</div>
          </div>
        </div>
      </div>

      {/* Surgeon Information */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Surgical Team</h3>
        <div className='flex items-start gap-6 mb-6'>
          <div className='w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold text-2xl uppercase'>
            SJ
          </div>
          <div className='flex-1'>
            <h4 className='text-lg font-semibold text-slate-800 mb-2'>{surgery.surgeonName}</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm'>
              <div className='flex items-center gap-2'>
                <Stethoscope className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{surgery.surgeonSpecialization}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Award className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{surgery.surgeonQualifications}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{surgery.surgeonExperience}</span>
              </div>
              <div className='flex items-center gap-2'>
                <User className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>ID: {surgery.surgeonId}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{surgery.surgeonEmail}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{surgery.surgeonPhone}</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{surgery.department}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6'>
          <h4 className='text-md font-semibold text-slate-800 mb-3'>Medical Team</h4>
          <div className='overflow-x-auto'>
            <Table
              data={surgery.medicalTeam}
              columns={[
                {
                  header: 'Role',
                  accessor: 'role',
                  render: (row) => (
                    <div className='text-sm text-slate-900 font-medium'>{row.role}</div>
                  ),
                },
                {
                  header: 'Name',
                  accessor: 'name',
                  render: (row) => <div className='text-sm text-slate-900'>{row.name}</div>,
                },
                {
                  header: 'Specialization',
                  accessor: 'specialization',
                  render: (row) => (
                    <div className='text-sm text-slate-600'>{row.specialization}</div>
                  ),
                },
                {
                  header: 'Experience',
                  accessor: 'experience',
                  render: (row) => <div className='text-sm text-slate-600'>{row.experience}</div>,
                },
              ]}
              className='border-0'
            />
          </div>
        </div>
      </div>

      {/* Hospital & Location */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Hospital & Location</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-sm'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Hospital</label>
            <div className='text-slate-900 font-medium'>{surgery.hospital}</div>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Operating Room</label>
            <div className='text-slate-900'>{surgery.operatingRoom}</div>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Floor</label>
            <div className='text-slate-900'>{surgery.floor}</div>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Building</label>
            <div className='text-slate-900'>{surgery.building}</div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Payment Information</h3>
        <div className='space-y-4'>
          <div className='flex justify-between items-center text-sm'>
            <span className='text-slate-600'>Base Surgery Fee:</span>
            <span className='font-medium text-slate-900'>${surgery.fee.toFixed(2)}</span>
          </div>

          <div className='flex justify-between items-center text-sm'>
            <span className='text-slate-600'>GST ({surgery.gstRate}%):</span>
            <span className='font-medium text-orange-600'>+${gstAmount.toFixed(2)}</span>
          </div>

          <div className='flex justify-between items-center text-sm font-medium pt-2 border-t border-slate-300'>
            <span className='text-slate-700'>Total with GST:</span>
            <span className='font-semibold text-slate-900'>${totalWithGST.toFixed(2)}</span>
          </div>

          {surgery.hasInsurance && (
            <>
              <div className='flex justify-between items-center text-sm'>
                <span className='text-slate-600'>Insurance Provider:</span>
                <span className='font-medium text-slate-900'>{surgery.insuranceProvider}</span>
              </div>
              <div className='flex justify-between items-center text-sm'>
                <span className='text-slate-600'>Policy:</span>
                <span className='font-medium text-slate-900'>{surgery.insurancePolicy}</span>
              </div>
              <div className='flex justify-between items-center text-sm'>
                <span className='text-slate-600'>Coverage:</span>
                <span className='font-medium text-slate-900'>{surgery.insuranceCoverage}%</span>
              </div>
              <div className='flex justify-between items-center text-sm'>
                <span className='text-slate-600'>Authorization:</span>
                <span className='font-medium text-green-600'>{surgery.insuranceApproval}</span>
              </div>
              <div className='flex justify-between items-center text-sm'>
                <span className='text-slate-600'>Auth Code:</span>
                <span className='font-medium text-slate-900'>{surgery.insuranceAuthCode}</span>
              </div>
              <div className='flex justify-between items-center text-sm'>
                <span className='text-slate-600'>Insurance Coverage:</span>
                <span className='font-medium text-green-600'>-${insuranceAmount.toFixed(2)}</span>
              </div>
            </>
          )}

          <div className='flex justify-between items-center pt-3 border-t border-slate-300'>
            <span className='font-semibold text-slate-800'>Patient Responsibility:</span>
            <span className='font-bold text-blue-600 text-lg'>${patientPays.toFixed(2)}</span>
          </div>

          <div className='mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200'>
            <p className='text-sm text-blue-800'>
              <strong>Patient needs to pay:</strong> ${patientPays.toFixed(2)}
              {surgery.hasInsurance
                ? ` (after ${surgery.insuranceCoverage}% insurance coverage)`
                : ' (no insurance coverage)'}
            </p>
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Medical Information</h3>

        <div className='mb-6'>
          <h4 className='text-md font-semibold text-slate-700 mb-3'>Medications</h4>
          <div className='space-y-2'>
            {surgery.medications.map((med, index) => (
              <div
                key={index}
                className='flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg'
              >
                <div>
                  <div className='font-medium text-slate-900'>{med.name}</div>
                  <div className='text-slate-600 text-xs'>{med.dosage}</div>
                </div>
                <div className='text-slate-600 text-xs bg-slate-200 px-2 py-1 rounded'>
                  {med.timing}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className='text-md font-semibold text-slate-700 mb-3'>Lab Tests</h4>
          <div className='overflow-x-auto'>
            <Table
              data={surgery.labTests}
              columns={[
                {
                  header: 'Test Name',
                  accessor: 'name',
                  render: (row) => <div className='text-sm text-slate-900'>{row.name}</div>,
                },
                {
                  header: 'Date',
                  accessor: 'date',
                  render: (row) => <div className='text-sm text-slate-600'>{row.date}</div>,
                },
                {
                  header: 'Result',
                  accessor: 'result',
                  render: (row) => (
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        row.result === 'Normal' || row.result === 'Clear'
                          ? 'bg-green-100 text-green-800'
                          : row.result === 'Elevated'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {row.result}
                    </span>
                  ),
                },
              ]}
              className='border-0'
            />
          </div>
        </div>
      </div>

      {/* Previous Surgeries */}
      <div className='bg-white rounded-lg border border-slate-200'>
        <div className='p-6 border-b border-slate-200'>
          <h3 className='text-lg font-semibold text-slate-800'>Previous Surgeries</h3>
        </div>
        <div className='overflow-x-auto'>
          <Table
            data={surgery.previousSurgeries}
            columns={[
              {
                header: 'Date',
                accessor: 'date',
                render: (row) => (
                  <div className='flex items-center gap-2 text-sm text-slate-900'>
                    <Calendar className='w-4 h-4 text-slate-400' />
                    {row.date}
                  </div>
                ),
              },
              {
                header: 'Surgery Type',
                accessor: 'type',
                render: (row) => <div className='text-sm text-slate-900'>{row.type}</div>,
              },
              {
                header: 'Status',
                accessor: 'status',
                render: (row) => (
                  <div className='flex items-center gap-2'>
                    {row.status === 'Completed' && (
                      <CheckCircle className='w-4 h-4 text-slate-400' />
                    )}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        row.status,
                      )}`}
                    >
                      {row.status}
                    </span>
                  </div>
                ),
              },
              {
                header: 'Outcome',
                accessor: 'outcome',
                render: (row) => (
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      row.outcome === 'Successful'
                        ? 'bg-green-100 text-green-800'
                        : row.outcome === 'Minor complications'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {row.outcome}
                  </span>
                ),
              },
              {
                header: 'Complications',
                accessor: 'complications',
                render: (row) => <div className='text-sm text-slate-600'>{row.complications}</div>,
              },
            ]}
            className='border-0'
          />
        </div>
      </div>

      {/* Actions */}
      <div className='flex justify-end gap-4'>
        <Button variant='outline' onClick={() => window.print()}>
          Print Details
        </Button>
        <Button
          variant='primary'
          onClick={() => navigate(`/hospital-admin/surgery/update/${surgery.id}`)}
        >
          Edit Surgery
        </Button>
      </div>
    </div>
  )
}

export default SurgeryDetail
