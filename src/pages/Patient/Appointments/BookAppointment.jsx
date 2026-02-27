import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Formik, Form } from 'formik'
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Phone,
  Mail,
  Hospital,
  User,
  ChevronLeft,
  Heart,
  CreditCard,
  FileText,
  Video,
  Building,
} from 'lucide-react'
import Button from '../../../components/UI/Button'
import Input from '../../../components/Form/Input'
import Select from '../../../components/Form/Select'

const BookAppointment = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const doctorId = searchParams.get('doctor')

  const handleSubmit = (values) => {
    if (!values.selectedDate || !values.selectedTime) {
      alert('Please select both date and time for your appointment')
      return
    }

    // Store appointment details in sessionStorage for payment page
    const appointmentData = {
      doctor: doctor,
      appointment: {
        date: values.selectedDate,
        time: values.selectedTime,
        mode: values.appointmentMode,
      },
      description: values.description,
    }
    sessionStorage.setItem('appointmentData', JSON.stringify(appointmentData))

    // Navigate to payment page
    navigate(`/patient/appointments/payment?doctor=${doctorId}`)
  }

  // Mock doctor data (in real app, this would be fetched based on doctorId)
  const doctor = {
    id: doctorId || 1,
    name: 'Dr. Sarah Jenkins',
    specialty: 'Cardiology',
    hospital: 'City General Hospital',
    location: 'City General Hospital',
    rating: 4.8,
    reviews: 127,
    experience: '15 years',
    education: 'MD, Harvard Medical School',
    consultationFee: 250,
    image: '/api/placeholder/100/100',
    languages: ['English', 'Spanish'],
    isAvailable: true,
    type: 'hospital',
  }

  // Mock available time slots
  const timeSlots = [
    { id: 1, time: '09:00 AM', available: true },
    { id: 2, time: '09:30 AM', available: true },
    { id: 3, time: '10:00 AM', available: false },
    { id: 4, time: '10:30 AM', available: true },
    { id: 5, time: '11:00 AM', available: true },
    { id: 6, time: '11:30 AM', available: false },
    { id: 7, time: '02:00 PM', available: true },
    { id: 8, time: '02:30 PM', available: true },
    { id: 9, time: '03:00 PM', available: true },
    { id: 10, time: '03:30 PM', available: false },
    { id: 11, time: '04:00 PM', available: true },
    { id: 12, time: '04:30 PM', available: true },
  ]

  // Generate dates for current to next 2 weeks
  const generateDateOptions = () => {
    const dates = []
    const today = new Date()

    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      dates.push({
        value: date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
        label:
          i === 0
            ? `Today - ${date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}`
            : date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              }),
      })
    }

    return dates
  }

  const dateOptions = generateDateOptions()

  const handleDateSelect = (setFieldValue, selectedValue) => {
    setFieldValue('selectedDate', selectedValue)
    setFieldValue('selectedTime', '')
    setFieldValue('selectedSlot', null)
  }

  const handleTimeSelect = (setFieldValue, slot) => {
    if (slot.available) {
      setFieldValue('selectedTime', slot.time)
      setFieldValue('selectedSlot', slot.id)
    }
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Header */}
      <div className='bg-white border-b border-slate-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Link
                to='/patient/appointments/search'
                className='text-slate-600 hover:text-slate-900'
              >
                <ChevronLeft className='w-5 h-5' />
              </Link>
              <div>
                <h1 className='text-2xl font-bold text-slate-900'>Book Appointment</h1>
                <p className='text-slate-600 mt-1'>Schedule your visit with {doctor.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Doctor Info */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-xl border border-slate-200 p-6'>
              <div className='flex gap-4 mb-4'>
                <div className='w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0'>
                  <User className='w-10 h-10 text-slate-400' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-slate-900'>{doctor.name}</h3>
                  <p className='text-slate-600'>{doctor.specialty}</p>
                  <div className='flex items-center gap-1 text-amber-500 mt-1'>
                    <Star className='w-4 h-4 fill-current' />
                    <span className='font-medium'>{doctor.rating}</span>
                    <span className='text-slate-500 text-sm'>({doctor.reviews})</span>
                  </div>
                </div>
              </div>

              <div className='space-y-3 text-sm'>
                <div className='flex items-center gap-2 text-slate-600'>
                  {doctor.type === 'hospital' ? (
                    <Hospital className='w-4 h-4' />
                  ) : (
                    <User className='w-4 h-4' />
                  )}
                  <span>{doctor.hospital}</span>
                </div>
                <div className='flex items-center gap-2 text-slate-600'>
                  <MapPin className='w-4 h-4' />
                  <span>{doctor.location}</span>
                </div>
                <div className='flex items-center gap-2 text-slate-600'>
                  <Phone className='w-4 h-4' />
                  <span>+1 234 567 8900</span>
                </div>
                <div className='flex items-center gap-2 text-slate-600'>
                  <Mail className='w-4 h-4' />
                  <span>doctor@example.com</span>
                </div>
              </div>

              <div className='mt-4 pt-4 border-t border-slate-200'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-slate-600'>Consultation Fee</span>
                  <span className='font-semibold text-slate-900'>₹{doctor.consultationFee}</span>
                </div>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-slate-600'>Experience</span>
                  <span className='font-medium text-slate-900'>{doctor.experience}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-slate-600'>Education</span>
                  <span className='font-medium text-slate-900'>{doctor.education}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className='lg:col-span-2'>
            <Formik
              initialValues={{
                selectedDate: '',
                selectedTime: '',
                selectedSlot: null,
                appointmentMode: 'offline', // online or offline
                description: '', // patient description/notes
              }}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className='bg-white rounded-xl border border-slate-200 p-6'>
                    <h2 className='text-lg font-semibold text-slate-900 mb-6'>
                      Select Date & Time
                    </h2>

                    {/* Date Selection */}
                    <div className='mb-6'>
                      <label className='block text-sm font-medium text-slate-700 mb-3'>
                        Select Date
                      </label>
                      <Select
                        name='selectedDate'
                        value={values.selectedDate}
                        onChange={(e) => handleDateSelect(setFieldValue, e.target.value)}
                        options={dateOptions}
                        placeholder='Choose a date'
                      />
                    </div>

                    {/* Appointment Mode Toggle */}
                    <div className='mb-6'>
                      <label className='block text-sm font-medium text-slate-700 mb-3'>
                        Appointment Mode
                      </label>
                      <div className='flex items-center gap-4'>
                        <div className='flex items-center'>
                          <input
                            type='radio'
                            id='offline'
                            name='appointmentMode'
                            value='offline'
                            checked={values.appointmentMode === 'offline'}
                            onChange={() => setFieldValue('appointmentMode', 'offline')}
                            className='w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500'
                          />
                          <label
                            htmlFor='offline'
                            className='ml-2 flex items-center gap-2 text-sm text-slate-700 cursor-pointer'
                          >
                            <Building className='w-4 h-4' />
                            Offline (In-Person)
                          </label>
                        </div>
                        <div className='flex items-center'>
                          <input
                            type='radio'
                            id='online'
                            name='appointmentMode'
                            value='online'
                            checked={values.appointmentMode === 'online'}
                            onChange={() => setFieldValue('appointmentMode', 'online')}
                            className='w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500'
                          />
                          <label
                            htmlFor='online'
                            className='ml-2 flex items-center gap-2 text-sm text-slate-700 cursor-pointer'
                          >
                            <Video className='w-4 h-4' />
                            Online (Video Call)
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div className='mb-6'>
                      <label className='block text-sm font-medium text-slate-700 mb-3'>
                        Select Time
                      </label>
                      <div className='grid grid-cols-3 sm:grid-cols-4 gap-2'>
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.id}
                            type='button'
                            onClick={() => handleTimeSelect(setFieldValue, slot)}
                            disabled={!slot.available}
                            className={`p-3 text-center rounded-lg border transition-colors ${
                              values.selectedSlot === slot.id
                                ? 'bg-teal-600 text-white border-teal-600'
                                : slot.available
                                  ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                  : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description/Notes */}
                    <div className='mb-6'>
                      <label className='block text-sm font-medium text-slate-700 mb-3'>
                        Description / Notes{' '}
                        <span className='text-slate-400 font-normal'>(Optional)</span>
                      </label>
                      <Input
                        name='description'
                        type='textarea'
                        placeholder='Please describe your symptoms or reason for visit...'
                        value={values.description}
                        onChange={(e) => setFieldValue('description', e.target.value)}
                        className='w-full'
                      />
                      <p className='text-xs text-slate-500 mt-1'>
                        Help your doctor prepare for your appointment by describing your symptoms or
                        concerns
                      </p>
                    </div>

                    {/* Appointment Details */}
                    {values.selectedDate && values.selectedTime && (
                      <div className='mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200'>
                        <h3 className='font-medium text-teal-900 mb-2'>Appointment Summary</h3>
                        <div className='space-y-1 text-sm text-teal-700'>
                          <div>Date: {values.selectedDate}</div>
                          <div>Time: {values.selectedTime}</div>
                          <div>
                            Mode:{' '}
                            {values.appointmentMode === 'online'
                              ? 'Online (Video Call)'
                              : 'Offline (In-Person)'}
                          </div>
                          <div>Doctor: {doctor.name}</div>
                          <div>Fee: ₹{doctor.consultationFee}</div>
                          {values.description && (
                            <div className='pt-2 mt-2 border-t border-teal-200'>
                              <div className='font-medium'>Notes:</div>
                              <div className='text-xs mt-1'>{values.description}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className='flex gap-3'>
                      <Button
                        type='submit'
                        disabled={!values.selectedDate || !values.selectedTime}
                        variant='primary'
                        className='flex-1'
                      >
                        {'Confirm Appointment'}
                      </Button>
                      <Link to='/patient/appointments/search'>
                        <Button type='button' variant='outline'>
                          Cancel
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookAppointment
