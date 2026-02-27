import React from 'react'
import { Users } from 'lucide-react'

const NoRecords = ({
  Icon = Users,
  title = 'No records found',
  message,
  hasFilters = false,
  className = '',
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4'>
        <Icon className='w-8 h-8 text-slate-400' />
      </div>
      <h3 className='text-lg font-semibold text-slate-800 mb-2'>{title}</h3>
      <p className='text-slate-600'>
        {message ||
          (hasFilters
            ? 'Try adjusting your filters or search terms'
            : 'No records have been added yet')}
      </p>
    </div>
  )
}

export default NoRecords
