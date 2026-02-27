import { Field, ErrorMessage } from 'formik'

const Input = ({ label, name, type = 'text', placeholder, icon: Icon, className = '', rows }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className='text-sm font-medium text-slate-700'>
          {label}
        </label>
      )}
      <div className='relative'>
        {Icon && (
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Icon className='h-5 w-5 text-slate-400' />
          </div>
        )}
        <Field
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          rows={type === 'textarea' ? rows : undefined}
          as={type === 'textarea' ? 'textarea' : 'input'}
          className={`
            block w-full rounded-[10px] border border-slate-300 bg-white
            ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 text-sm text-slate-900
            focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500
            disabled:bg-slate-50 disabled:text-slate-500
            transition-colors
            ${type === 'textarea' ? 'resize-y min-h-[120px]' : 'h-[48px]'}
          `}
        />
      </div>
      <ErrorMessage name={name} component='span' className='text-xs text-red-500 mt-1' />
    </div>
  )
}

export default Input
