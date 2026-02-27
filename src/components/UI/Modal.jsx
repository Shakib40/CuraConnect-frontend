import { X } from 'lucide-react'

const Modal = ({ show, onClose, title, children, size = 'md', showCloseButton = true }) => {
  if (!show) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full',
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div
        className={`${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className='flex justify-between items-center p-6 border-b border-slate-200'>
            {title && <h2 className='text-xl font-semibold text-slate-800'>{title}</h2>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className='text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100'
              >
                <X className='w-5 h-5' />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className='p-6'>{children}</div>
      </div>
    </div>
  )
}

export default Modal
