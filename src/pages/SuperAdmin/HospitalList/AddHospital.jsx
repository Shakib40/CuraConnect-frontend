import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RegistrationWizard from './RegistrationWizard'
import { initialHospitals } from './mockData'
import { ArrowLeft } from 'lucide-react'

/**
 * AddHospital wraps the RegistrationWizard for both:
 *   - /hospitals/add  → new hospital
 *   - /hospitals/:id/edit → edit existing
 *
 * isEdit is passed by the router via props. When editing,
 * useParams reads :id and pre-fills the wizard.
 */
const AddHospital = ({ isEdit = false }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const hospital = isEdit ? initialHospitals.find((h) => h.id === Number(id)) : null

  if (isEdit && !hospital) {
    return (
      <div className='flex flex-col items-center justify-center py-24 text-slate-400'>
        <p className='font-bold text-lg'>Hospital not found</p>
        <button
          onClick={() => navigate(-1)}
          className='mt-4 text-sm text-teal-600 font-semibold hover:underline'
        >
          ← Go back
        </button>
      </div>
    )
  }

  return (
    <div className='bg-white'>
      {isEdit && (
        <div className='px-8 pt-6 pb-0 border-b border-slate-100 flex items-center gap-3'>
          <button
            onClick={() => navigate(`/superadmin/hospitals/${id}`)}
            className='flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 font-semibold transition-colors'
          >
            <ArrowLeft className='w-4 h-4' /> Back
          </button>
          <span className='text-slate-300'>/</span>
          <h2 className='text-sm font-bold text-slate-800'>
            Editing: <span className='text-teal-600'>{hospital.name}</span>
          </h2>
        </div>
      )}
      <RegistrationWizard
        initialValues={isEdit ? hospital : undefined}
        submitLabel={isEdit ? 'Update Hospital' : 'Register Hospital'}
        onComplete={() =>
          navigate(isEdit ? `/superadmin/hospitals/${id}` : '/superadmin/hospitals/list')
        }
        onCancel={() =>
          navigate(isEdit ? `/superadmin/hospitals/${id}` : '/superadmin/hospitals/list')
        }
      />
    </div>
  )
}

export default AddHospital
