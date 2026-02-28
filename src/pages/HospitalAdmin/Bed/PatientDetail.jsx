import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Users,
  Activity,
  AlertCircle,
  Pill,
  TestTube,
  Clock,
  Heart,
  Thermometer,
  Weight,
} from 'lucide-react'
import Button from 'components/UI/Button'

const PatientDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock bed data based on ID
  const [bed] = useState({
    id: id || 1,
    bedNumber: 'ICU-101',
    ward: 'Intensive Care Unit',
    floor: '3rd Floor',
    building: 'Main Building',
    type: 'ICU Bed',
    status: 'Occupied',
    patientName: 'John Smith',
    patientId: 'PAT001',
    admissionDate: '2024-02-20',
    expectedDischarge: '2024-02-26',
    doctorName: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    notes: 'Patient requires continuous monitoring',
    lastCleaned: '2024-02-20',
    nextMaintenance: '2024-03-01',
  })

  // Mock patient comprehensive data
  const [patientData] = useState({
    personalInfo: {
      name: 'John Smith',
      id: 'PAT001',
      age: 45,
      gender: 'Male',
      bloodType: 'O+',
      allergies: ['Penicillin', 'Peanuts'],
      emergencyContact: 'Jane Smith (Wife) - +1-234-567-8901',
    },
    vitals: {
      heartRate: 72,
      bloodPressure: '120/80',
      temperature: 98.6,
      oxygenSaturation: 98,
      weight: 175,
      height: '5\'10"',
      lastUpdated: '2024-02-25 10:30 AM',
    },
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        startDate: '2024-02-20',
        prescribedBy: 'Dr. Sarah Johnson',
        status: 'Active',
      },
      {
        name: 'Metoprolol',
        dosage: '25mg',
        frequency: 'Twice daily',
        startDate: '2024-02-20',
        prescribedBy: 'Dr. Sarah Johnson',
        status: 'Active',
      },
      {
        name: 'Aspirin',
        dosage: '81mg',
        frequency: 'Once daily',
        startDate: '2024-02-20',
        prescribedBy: 'Dr. Sarah Johnson',
        status: 'Active',
      },
    ],
    labReports: [
      {
        testName: 'Complete Blood Count (CBC)',
        date: '2024-02-24',
        status: 'Normal',
        results: {
          'White Blood Cells': '7.2 K/μL',
          'Red Blood Cells': '4.8 M/μL',
          Hemoglobin: '14.5 g/dL',
          Platelets: '250 K/μL',
        },
        orderedBy: 'Dr. Sarah Johnson',
      },
      {
        testName: 'Comprehensive Metabolic Panel',
        date: '2024-02-24',
        status: 'Normal',
        results: {
          Glucose: '92 mg/dL',
          Creatinine: '0.9 mg/dL',
          Sodium: '140 mEq/L',
          Potassium: '4.0 mEq/L',
        },
        orderedBy: 'Dr. Sarah Johnson',
      },
      {
        testName: 'Troponin I',
        date: '2024-02-20',
        status: 'Elevated',
        results: {
          'Troponin I': '0.15 ng/mL',
        },
        orderedBy: 'Dr. Sarah Johnson',
      },
    ],
    activityLogs: [
      {
        timestamp: '2024-02-25 08:00 AM',
        activity: 'Vital signs check',
        details: 'BP: 120/80, HR: 72, Temp: 98.6°F',
        staff: 'Nurse Johnson',
      },
      {
        timestamp: '2024-02-25 06:00 AM',
        activity: 'Medication administered',
        details: 'Lisinopril 10mg, Metoprolol 25mg',
        staff: 'Nurse Davis',
      },
      {
        timestamp: '2024-02-24 10:00 PM',
        activity: 'Lab tests completed',
        details: 'CBC, CMP, Troponin I',
        staff: 'Lab Technician Smith',
      },
      {
        timestamp: '2024-02-24 08:00 PM',
        activity: 'Doctor rounds',
        details: 'Dr. Sarah Johnson - Patient stable, continue current treatment',
        staff: 'Dr. Sarah Johnson',
      },
      {
        timestamp: '2024-02-24 02:00 PM',
        activity: 'Physical therapy',
        details: '30 minutes walking assistance',
        staff: 'Physical Therapist Wilson',
      },
    ],
  })

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/hospital-admin/bed')}
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Beds
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>Patient Details</h1>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200 p-6'>
        {/* Patient Information */}
        <div>
          <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
            <Users className='w-5 h-5' />
            Patient Information
          </h3>
          {bed.status === 'Occupied' ? (
            <div className='space-y-6'>
              {/* Personal Information */}
              <div className='bg-white rounded-lg border border-slate-200 p-4'>
                <h4 className='font-medium text-slate-800 mb-3 flex items-center gap-2'>
                  <Users className='w-4 h-4' />
                  Personal Information
                </h4>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm'>
                  <div>
                    <span className='text-slate-500'>Name:</span>
                    <p className='font-medium text-slate-900'>{patientData.personalInfo.name}</p>
                  </div>
                  <div>
                    <span className='text-slate-500'>Patient ID:</span>
                    <p className='font-medium text-slate-900'>{patientData.personalInfo.id}</p>
                  </div>
                  <div>
                    <span className='text-slate-500'>Age:</span>
                    <p className='font-medium text-slate-900'>
                      {patientData.personalInfo.age} years
                    </p>
                  </div>
                  <div>
                    <span className='text-slate-500'>Gender:</span>
                    <p className='font-medium text-slate-900'>{patientData.personalInfo.gender}</p>
                  </div>
                  <div>
                    <span className='text-slate-500'>Blood Type:</span>
                    <p className='font-medium text-slate-900'>
                      {patientData.personalInfo.bloodType}
                    </p>
                  </div>
                  <div>
                    <span className='text-slate-500'>Emergency Contact:</span>
                    <p className='font-medium text-slate-900'>
                      {patientData.personalInfo.emergencyContact}
                    </p>
                  </div>
                </div>
                {patientData.personalInfo.allergies.length > 0 && (
                  <div className='mt-3'>
                    <span className='text-slate-500 text-sm'>Allergies:</span>
                    <div className='flex gap-2 mt-1'>
                      {patientData.personalInfo.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className='bg-red-100 text-red-800 text-xs px-2 py-1 rounded'
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Current Vitals */}
              <div className='bg-white rounded-lg border border-slate-200 p-4'>
                <h4 className='font-medium text-slate-800 mb-3 flex items-center gap-2'>
                  <Heart className='w-4 h-4' />
                  Current Vitals
                </h4>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                  <div className='text-center'>
                    <Heart className='w-6 h-6 text-red-500 mx-auto mb-1' />
                    <p className='text-xs text-slate-500'>Heart Rate</p>
                    <p className='font-bold text-slate-900'>{patientData.vitals.heartRate}</p>
                    <p className='text-xs text-slate-500'>bpm</p>
                  </div>
                  <div className='text-center'>
                    <Activity className='w-6 h-6 text-blue-500 mx-auto mb-1' />
                    <p className='text-xs text-slate-500'>Blood Pressure</p>
                    <p className='font-bold text-slate-900'>{patientData.vitals.bloodPressure}</p>
                    <p className='text-xs text-slate-500'>mmHg</p>
                  </div>
                  <div className='text-center'>
                    <Thermometer className='w-6 h-6 text-orange-500 mx-auto mb-1' />
                    <p className='text-xs text-slate-500'>Temperature</p>
                    <p className='font-bold text-slate-900'>{patientData.vitals.temperature}°F</p>
                    <p className='text-xs text-slate-500'>Fahrenheit</p>
                  </div>
                  <div className='text-center'>
                    <Activity className='w-6 h-6 text-green-500 mx-auto mb-1' />
                    <p className='text-xs text-slate-500'>O₂ Saturation</p>
                    <p className='font-bold text-slate-900'>
                      {patientData.vitals.oxygenSaturation}%
                    </p>
                    <p className='text-xs text-slate-500'>SpO₂</p>
                  </div>
                  <div className='text-center'>
                    <Weight className='w-6 h-6 text-purple-500 mx-auto mb-1' />
                    <p className='text-xs text-slate-500'>Weight</p>
                    <p className='font-bold text-slate-900'>{patientData.vitals.weight}</p>
                    <p className='text-xs text-slate-500'>lbs</p>
                  </div>
                  <div className='text-center'>
                    <Users className='w-6 h-6 text-indigo-500 mx-auto mb-1' />
                    <p className='text-xs text-slate-500'>Height</p>
                    <p className='font-bold text-slate-900'>{patientData.vitals.height}</p>
                    <p className='text-xs text-slate-500'></p>
                  </div>
                </div>
                <p className='text-xs text-slate-500 mt-3'>
                  Last updated: {patientData.vitals.lastUpdated}
                </p>
              </div>

              {/* Medications */}
              <div className='bg-white rounded-lg border border-slate-200 p-4'>
                <h4 className='font-medium text-slate-800 mb-3 flex items-center gap-2'>
                  <Pill className='w-4 h-4' />
                  Current Medications
                </h4>
                <div className='space-y-3'>
                  {patientData.medications.map((med, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'
                    >
                      <div>
                        <p className='font-medium text-slate-900'>{med.name}</p>
                        <p className='text-sm text-slate-600'>
                          {med.dosage} - {med.frequency}
                        </p>
                        <p className='text-xs text-slate-500'>
                          Started: {med.startDate} | Prescribed by: {med.prescribedBy}
                        </p>
                      </div>
                      <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
                        {med.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lab Reports */}
              <div className='bg-white rounded-lg border border-slate-200 p-4'>
                <h4 className='font-medium text-slate-800 mb-3 flex items-center gap-2'>
                  <TestTube className='w-4 h-4' />
                  Lab Reports
                </h4>
                <div className='space-y-3'>
                  {patientData.labReports.map((report, index) => (
                    <div key={index} className='border border-slate-200 rounded-lg p-3'>
                      <div className='flex items-center justify-between mb-2'>
                        <h5 className='font-medium text-slate-900'>{report.testName}</h5>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            report.status === 'Normal'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {report.status}
                        </span>
                      </div>
                      <p className='text-sm text-slate-600 mb-2'>
                        Date: {report.date} | Ordered by: {report.orderedBy}
                      </p>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 text-sm'>
                        {Object.entries(report.results).map(([key, value]) => (
                          <div key={key} className='flex justify-between'>
                            <span className='text-slate-600'>{key}:</span>
                            <span className='font-medium text-slate-900'>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Logs */}
              <div className='bg-white rounded-lg border border-slate-200 p-4'>
                <h4 className='font-medium text-slate-800 mb-3 flex items-center gap-2'>
                  <Clock className='w-4 h-4' />
                  Activity Logs
                </h4>
                <div className='space-y-2 max-h-64 overflow-y-auto'>
                  {patientData.activityLogs.map((log, index) => (
                    <div key={index} className='flex items-start gap-3 p-3 bg-slate-50 rounded-lg'>
                      <Clock className='w-4 h-4 text-slate-400 mt-0.5' />
                      <div className='flex-1'>
                        <div className='flex items-center justify-between mb-1'>
                          <p className='font-medium text-slate-900 text-sm'>{log.activity}</p>
                          <p className='text-xs text-slate-500'>{log.timestamp}</p>
                        </div>
                        <p className='text-sm text-slate-600'>{log.details}</p>
                        <p className='text-xs text-slate-500 mt-1'>Staff: {log.staff}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className='bg-slate-50 rounded-lg p-4 text-center'>
              <AlertCircle className='w-8 h-8 text-slate-400 mx-auto mb-2' />
              <p className='text-slate-600'>
                No patient assigned. Change status to "Occupied" to assign a patient.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className='flex justify-end gap-4 pt-6 border-t border-slate-200'>
          <Button type='button' variant='outline' onClick={() => navigate('/hospital-admin/bed')}>
            Back to Beds
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PatientDetail
