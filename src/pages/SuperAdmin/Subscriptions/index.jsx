import { Check, Settings, Trash2, Plus, HelpCircle } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: '$299/mo',
    description: 'Ideal for small clinics and private practices.',
    features: [
      'Up to 10 staff users',
      'Core appointment system',
      'Basic health records',
      'Email notifications',
    ],
    color: 'bg-slate-50',
    border: 'border-slate-200',
  },
  {
    name: 'Professional',
    price: '$599/mo',
    description: 'Perfect for mid-sized hospitals with multiple departments.',
    features: [
      'Up to 50 staff users',
      'Advanced clinical records',
      'Lab & Pharmacy modules',
      'SMS & Email notifications',
      'Custom reports',
    ],
    color: 'bg-teal-50',
    border: 'border-teal-200',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Designed for large hospital networks and medical groups.',
    features: [
      'Unlimited staff users',
      'Multi-branch support',
      'API Access & Integrations',
      'Dedicated support manager',
      'White-label options',
    ],
    color: 'bg-purple-50',
    border: 'border-purple-200',
  },
]

const Subscriptions = () => {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-slate-800'>Subscription Plans</h1>
          <p className='text-slate-500 mt-1'>Configure and manage platform pricing tiers.</p>
        </div>
        <button className='bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium shadow-sm'>
          <Plus className='w-4 h-4' /> Create New Plan
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative rounded-3xl border-2 ${plan.border} ${plan.color} p-8 flex flex-col shadow-sm`}
          >
            {plan.popular && (
              <span className='absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider'>
                Most Popular
              </span>
            )}

            <div className='mb-6'>
              <h3 className='text-xl font-bold text-slate-800'>{plan.name}</h3>
              <div className='flex items-baseline gap-1 mt-2'>
                <span className='text-3xl font-bold text-slate-900'>{plan.price}</span>
                {plan.price !== 'Custom' && (
                  <span className='text-slate-500 text-sm'>/per month</span>
                )}
              </div>
              <p className='text-sm text-slate-500 mt-3 leading-relaxed'>{plan.description}</p>
            </div>

            <div className='flex-1 space-y-4 mb-8'>
              <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>
                Included Features
              </p>
              <ul className='space-y-3'>
                {plan.features.map((feature, i) => (
                  <li key={i} className='flex items-start gap-3'>
                    <div className='w-5 h-5 rounded-full bg-white flex items-center justify-center border border-slate-200 shrink-0 mt-0.5'>
                      <Check className='w-3 h-3 text-teal-600' />
                    </div>
                    <span className='text-sm text-slate-600 font-medium'>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex gap-2'>
              <button className='flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2'>
                <Settings className='w-4 h-4' /> Edit
              </button>
              <button className='p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors'>
                <Trash2 className='w-5 h-5' />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='bg-white p-6 rounded-2xl border border-dashed border-slate-300 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='p-3 bg-slate-50 rounded-full'>
            <HelpCircle className='w-6 h-6 text-slate-400' />
          </div>
          <div>
            <p className='font-semibold text-slate-700'>Need to create a specialized plan?</p>
            <p className='text-sm text-slate-500'>
              Contact the product team for enterprise custom billing adjustments.
            </p>
          </div>
        </div>
        <button className='px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-colors'>
          Request Custom Plan
        </button>
      </div>
    </div>
  )
}

export default Subscriptions
