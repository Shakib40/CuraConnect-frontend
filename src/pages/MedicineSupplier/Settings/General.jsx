// General settings component

import {
  Building,
  Package,
  Calendar,
  MapPin,
  Phone,
  Plus,
  User,
  Upload,
  Trash2,
} from 'lucide-react'
import Input from 'components/Form/Input'
import ToggleCheckbox from 'components/Form/ToogleCheckbox'
import Select from 'components/Form/Select'

const GeneralSettings = ({ generalSettings, setGeneralSettings }) => {
  const handleAddPhone = () => {
    const newPhones = [...(generalSettings.contactPhones || []), '']
    setGeneralSettings({ ...generalSettings, contactPhones: newPhones })
  }

  const handleRemovePhone = (index) => {
    const newPhones = generalSettings.contactPhones.filter((_, i) => i !== index)
    setGeneralSettings({ ...generalSettings, contactPhones: newPhones })
  }

  const handlePhoneChange = (index, value) => {
    const newPhones = [...(generalSettings.contactPhones || [])]
    newPhones[index] = value
    setGeneralSettings({ ...generalSettings, contactPhones: newPhones })
  }

  return (
    <div className='space-y-6'>
      <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
        <Building className='w-5 h-5 text-teal-600' />
        Company Information
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <Input
            name='companyName'
            type='text'
            value={generalSettings.companyName}
            onChange={(e) =>
              setGeneralSettings({ ...generalSettings, companyName: e.target.value })
            }
            label='Company Name'
          />
        </div>
        <div>
          <Input
            name='companyEmail'
            type='email'
            value={generalSettings.companyEmail}
            onChange={(e) =>
              setGeneralSettings({ ...generalSettings, companyEmail: e.target.value })
            }
            label='Company Email'
          />
        </div>
        <div>
          <Input
            name='website'
            type='url'
            value={generalSettings.website}
            onChange={(e) => setGeneralSettings({ ...generalSettings, website: e.target.value })}
            label='Website'
          />
        </div>
        <div>
          <Input
            name='companyLogo'
            type='text'
            value={generalSettings.companyLogo}
            onChange={(e) =>
              setGeneralSettings({ ...generalSettings, companyLogo: e.target.value })
            }
            label='Company Logo URL'
          />
        </div>
        <div>
          <Input
            name='businessRegistration'
            type='text'
            value={generalSettings.businessRegistration}
            onChange={(e) =>
              setGeneralSettings({ ...generalSettings, businessRegistration: e.target.value })
            }
            label='Business Registration Number'
          />
        </div>
        <div>
          <Select
            name='industryType'
            value={generalSettings.industryType}
            onChange={(e) =>
              setGeneralSettings({ ...generalSettings, industryType: e.target.value })
            }
            label='Industry Type'
            options={[
              { value: 'pharmaceutical', label: 'Pharmaceutical' },
              { value: 'medical-devices', label: 'Medical Devices' },
              { value: 'healthcare', label: 'Healthcare' },
              { value: 'biotechnology', label: 'Biotechnology' },
              { value: 'chemicals', label: 'Chemicals' },
              { value: 'logistics', label: 'Logistics & Supply Chain' },
              { value: 'manufacturing', label: 'Manufacturing' },
              { value: 'retail', label: 'Retail Pharmacy' },
              { value: 'wholesale', label: 'Wholesale Distribution' },
            ]}
          />
        </div>
      </div>

      <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
        <User className='w-5 h-5 text-teal-600' />
        About Me
      </h3>
      <div className='space-y-4'>
        <div>
          <Input
            name='aboutMe'
            type='textarea'
            rows={6}
            value={generalSettings.aboutMe}
            onChange={(e) => setGeneralSettings({ ...generalSettings, aboutMe: e.target.value })}
            label='Professional Summary'
          />
        </div>
      </div>

      <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
        <MapPin className='w-5 h-5 text-teal-600' />
        Company Address
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <Input
            name='street'
            type='text'
            value={generalSettings.street}
            onChange={(e) => setGeneralSettings({ ...generalSettings, street: e.target.value })}
            label='Street/Road'
          />
        </div>
        <div>
          <Input
            name='city'
            type='text'
            value={generalSettings.city}
            onChange={(e) => setGeneralSettings({ ...generalSettings, city: e.target.value })}
            label='City'
          />
        </div>
        <div>
          <Select
            name='country'
            value={generalSettings.country}
            onChange={(e) => setGeneralSettings({ ...generalSettings, country: e.target.value })}
            label='Country'
            options={[
              { value: 'india', label: 'India' },
              { value: 'usa', label: 'United States' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'canada', label: 'Canada' },
              { value: 'australia', label: 'Australia' },
              { value: 'germany', label: 'Germany' },
              { value: 'france', label: 'France' },
              { value: 'japan', label: 'Japan' },
              { value: 'china', label: 'China' },
              { value: 'singapore', label: 'Singapore' },
            ]}
          />
        </div>
        <div>
          <Select
            name='state'
            value={generalSettings.state}
            onChange={(e) => setGeneralSettings({ ...generalSettings, state: e.target.value })}
            label='State'
            options={[
              { value: 'maharashtra', label: 'Maharashtra' },
              { value: 'gujarat', label: 'Gujarat' },
              { value: 'karnataka', label: 'Karnataka' },
              { value: 'tamil-nadu', label: 'Tamil Nadu' },
              { value: 'delhi', label: 'Delhi' },
              { value: 'mumbai', label: 'Mumbai' },
              { value: 'pune', label: 'Pune' },
              { value: 'bangalore', label: 'Bangalore' },
            ]}
          />
        </div>
        <div>
          <Input
            name='pincode'
            type='text'
            value={generalSettings.pincode}
            onChange={(e) => setGeneralSettings({ ...generalSettings, pincode: e.target.value })}
            label='Pincode'
          />
        </div>
        <div className='md:col-span-2'>
          <Input
            name='companyAddress'
            type='textarea'
            rows={4}
            value={generalSettings.companyAddress}
            onChange={(e) =>
              setGeneralSettings({ ...generalSettings, companyAddress: e.target.value })
            }
            label='Complete Address (Selected on Map)'
          />
        </div>
      </div>

      <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
        <Phone className='w-5 h-5 text-teal-600' />
        Contact Phones
      </h3>
      <div className='space-y-4'>
        {(generalSettings.contactPhones || ['']).map((phone, index) => (
          <div key={index} className='flex gap-2'>
            <div className='flex-1'>
              <Input
                name={`contactPhone_${index}`}
                type='tel'
                value={phone}
                onChange={(e) => handlePhoneChange(index, e.target.value)}
                label={`Phone ${index + 1}`}
              />
            </div>
            {generalSettings.contactPhones && generalSettings.contactPhones.length > 1 && (
              <button>
                <Trash2 className='w-4 h-4' onClick={() => handleRemovePhone(index)} />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleAddPhone}
          className='px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2'
        >
          <Plus className='w-4 h-4' />
          Add Phone
        </button>
      </div>

      <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
        <Package className='w-5 h-5 text-teal-600' />
        Supply Status
      </h3>
      <div className='space-y-4'>
        <ToggleCheckbox
          name='supplyStatus'
          checked={generalSettings.supplyStatus === 'active'}
          onChange={(e) =>
            setGeneralSettings({
              ...generalSettings,
              supplyStatus: e.target.checked ? 'active' : 'on-hold',
            })
          }
          label='Supply Status Active'
          description='Enable/disable supply availability'
        />
      </div>

      <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
        <Calendar className='w-5 h-5 text-teal-600' />
        Reports Settings
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div>
          <Select
            name='reportsFrequency'
            value={generalSettings.reportsFrequency || 'week'}
            onChange={(e) =>
              setGeneralSettings({ ...generalSettings, reportsFrequency: e.target.value })
            }
            label='Reports Frequency'
            options={[
              { value: 'week', label: 'Weekly' },
              { value: 'month', label: 'Monthly' },
              { value: 'year', label: 'Yearly' },
            ]}
          />
        </div>
        <div>
          <Input
            name='reportsStartDate'
            type='date'
            value={generalSettings.reportsStartDate}
            onChange={(e) =>
              setGeneralSettings({ ...generalSettings, reportsStartDate: e.target.value })
            }
            label='Start Date'
          />
        </div>
        <div>
          <Input
            name='reportsEndDate'
            type='date'
            value={generalSettings.reportsEndDate}
            onChange={(e) =>
              setGeneralSettings({ ...generalSettings, reportsEndDate: e.target.value })
            }
            label='End Date'
          />
        </div>
      </div>
    </div>
  )
}

export default GeneralSettings
