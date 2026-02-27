import { Field, ErrorMessage } from 'formik'

const Checkbox = ({ label, name, className = '', description }) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className='flex items-start gap-3 cursor-pointer group'>
        <div className='relative flex items-center mt-0.5'>
          <Field
            type='checkbox'
            name={name}
            id={name}
            className='peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white shadow transition-all checked:bg-teal-600 checked:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500'
          />
          <span className='absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3.5 w-3.5'
              viewBox='0 0 20 20'
              fill='currentColor'
              stroke='currentColor'
              strokeWidth='1'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors'>
            {label}
          </span>
          {description && <span className='text-xs text-slate-500'>{description}</span>}
        </div>
      </label>
      <ErrorMessage name={name} component='span' className='text-xs text-red-500 mt-1 pl-8' />
    </div>
  )
}

export default Checkbox
