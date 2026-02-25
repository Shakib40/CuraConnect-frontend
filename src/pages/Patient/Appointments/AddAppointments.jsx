import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Calendar, 
  Clock, 
  Phone, 
  Mail,
  Hospital,
  User,
  ChevronRight,
  Heart,
  Award,
  Users,
  Video,
  Building,
  Navigation
} from "lucide-react";
import { Formik, Form } from "formik";
import Button from "components/UI/Button";
import Input from "components/Form/Input";
import Select from "components/Form/Select";

const DoctorSearch = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Mock data
  const specialties = [
    { value: "", label: "All Specialties" },
    { value: "cardiology", label: "Cardiology" },
    { value: "orthopedics", label: "Orthopedics" },
    { value: "general-practice", label: "General Practice" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "dermatology", label: "Dermatology" },
    { value: "gynecology", label: "Gynecology" },
    { value: "neurology", label: "Neurology" },
    { value: "psychiatry", label: "Psychiatry" },
  ];

  const locations = [
    { value: "", label: "All Locations" },
    { value: "city-general", label: "City General Hospital" },
    { value: "memorial-medical", label: "Memorial Medical Center" },
    { value: "solo-practice", label: "Solo Practices" },
    { value: "downtown-clinic", label: "Downtown Clinic" },
  ];

  const mockDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      specialty: "Cardiology",
      hospital: "City General Hospital",
      location: "City General Hospital",
      rating: 4.8,
      reviews: 127,
      experience: "15 years",
      education: "MD, Harvard Medical School",
      nextAvailable: "Tomorrow, 10:00 AM",
      consultationFee: 250,
      image: "/api/placeholder/100/100",
      languages: ["English", "Spanish"],
      isAvailable: true,
      type: "hospital",
      availabilityMode: "both", // online, offline, both
      distance: 2.5 // in km
    },
    {
      id: 2,
      name: "Dr. Mike Ross",
      specialty: "Orthopedics",
      hospital: "Solo Practice",
      location: "Downtown Area",
      rating: 4.6,
      reviews: 89,
      experience: "12 years",
      education: "MD, Johns Hopkins",
      nextAvailable: "Today, 2:30 PM",
      consultationFee: 200,
      image: "/api/placeholder/100/100",
      languages: ["English"],
      isAvailable: true,
      type: "solo",
      availabilityMode: "online",
      distance: 5.2
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      specialty: "General Practice",
      hospital: "Memorial Medical Center",
      location: "Memorial Medical Center",
      rating: 4.9,
      reviews: 203,
      experience: "10 years",
      education: "MD, Stanford",
      nextAvailable: "Tomorrow, 9:00 AM",
      consultationFee: 180,
      image: "/api/placeholder/100/100",
      languages: ["English", "Mandarin"],
      isAvailable: true,
      type: "hospital",
      availabilityMode: "offline",
      distance: 3.8
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Pediatrics",
      hospital: "Children's Hospital",
      location: "Children's Hospital",
      rating: 4.7,
      reviews: 156,
      experience: "8 years",
      education: "MD, Yale",
      nextAvailable: "Today, 4:00 PM",
      consultationFee: 220,
      image: "/api/placeholder/100/100",
      languages: ["English", "French"],
      isAvailable: false,
      type: "hospital",
      availabilityMode: "both",
      distance: 7.1
    },
  ];


  // Compute filtered doctors directly during render
  const getFilteredDoctors = (formValues) => {
    let filtered = mockDoctors;
    const { searchQuery, selectedSpecialty, selectedLocation } = formValues || {
      searchQuery: "",
      selectedSpecialty: "",
      selectedLocation: ""
    };

    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(doctor =>
        doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(doctor =>
        doctor.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    return filtered;
  };


  const handleBookAppointment = (doctorId) => {
    // Navigate to appointment booking with selected doctor
    navigate(`/patient/appointments/book?doctor=${doctorId}`);
  };

  const renderDoctorCard = (doctor) => {
  const getAvailabilityDisplay = (mode) => {
    switch(mode) {
      case 'online':
        return { icon: Video, text: 'Online Only', color: 'text-blue-600 bg-blue-50' };
      case 'offline':
        return { icon: Building, text: 'In-Person Only', color: 'text-green-600 bg-green-50' };
      case 'both':
        return { icon: Video, text: 'Online & In-Person', color: 'text-purple-600 bg-purple-50' };
      default:
        return { icon: Building, text: 'In-Person Only', color: 'text-green-600 bg-green-50' };
    }
  };

  const availability = getAvailabilityDisplay(doctor.availabilityMode);
  const AvailabilityIcon = availability.icon;

  return (
    <div key={doctor.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex gap-6">
        {/* Doctor Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-slate-400" />
          </div>
          {doctor.isAvailable && (
            <div className="mt-2 flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600 ml-1">Available</span>
            </div>
          )}
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{doctor.name}</h3>
              <p className="text-slate-600">{doctor.specialty}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-slate-500 text-sm">({doctor.reviews})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
            <div className="flex items-center gap-1">
              {doctor.type === 'hospital' ? <Hospital className="w-4 h-4" /> : <User className="w-4 h-4" />}
              <span>{doctor.hospital}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{doctor.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Navigation className="w-4 h-4" />
              <span>{doctor.distance} km</span>
            </div>
          </div>

          {/* Availability Mode Badge */}
          <div className="mb-3">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${availability.color}`}>
              <AvailabilityIcon className="w-3 h-3" />
              {availability.text}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
            <div>
              <span className="text-slate-500">Experience:</span>
              <span className="ml-2 font-medium">{doctor.experience}</span>
            </div>
            <div>
              <span className="text-slate-500">Consultation:</span>
              <span className="ml-2 font-medium">₹{doctor.consultationFee}</span>
            </div>
          </div>

          <div className="text-sm text-slate-600 mb-3">
            <span className="text-slate-500">Education:</span>
            <span className="ml-2 font-medium">{doctor.education}</span>
          </div>

          <div className="text-sm text-slate-600 mb-3">
            <span className="text-slate-500">Next available:</span>
            <span className="ml-2 font-medium text-teal-600">{doctor.nextAvailable}</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-slate-500">Languages:</span>
            {doctor.languages.map((lang, index) => (
              <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                {lang}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => handleBookAppointment(doctor.id)}
              variant="primary"
              disabled={!doctor.isAvailable}
              className="flex-1"
            >
              {doctor.isAvailable ? "Book Appointment" : "Not Available"}
            </Button>
            <Button variant="outline" className="p-2">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/patient/appointments" className="text-slate-600 hover:text-slate-900 mb-2 inline-block">
                ← Back to Appointments
              </Link>
              <h1 className="text-2xl font-bold text-slate-900">Find a Doctor</h1>
              <p className="text-slate-600 mt-1">Search and book appointments with qualified healthcare providers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <Formik
        initialValues={{
          searchQuery: "",
          selectedSpecialty: "",
          selectedLocation: ""
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, resetForm }) => {
          const filteredDoctors = getFilteredDoctors(values);
          
          return (
            <Form>
              <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        type="text"
                        name="searchQuery"
                        placeholder="Search by doctor name, specialty, or hospital..."
                        className="pl-10"
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} icon={Search}>
                      {isLoading ? "Searching..." : "Search"}
                    </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              icon={Filter}
            >
              Filters
            </Button>
          </div>

                  {/* Filters */}
                  {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                      <Select
                        name="selectedSpecialty"
                        value={values.selectedSpecialty}
                        onChange={(e) => setFieldValue('selectedSpecialty', e.target.value)}
                        options={specialties}
                        placeholder="Select Specialty"
                      />
                      <Select
                        name="selectedLocation"
                        value={values.selectedLocation}
                        onChange={(e) => setFieldValue('selectedLocation', e.target.value)}
                        options={locations}
                        placeholder="Select Location"
                      />
                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            resetForm();
                          }}
                          className="w-full"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Results Count */}
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-slate-600">
                      Found <span className="font-semibold">{filteredDoctors.length}</span> doctors
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span>Sort by:</span>
                      <select className="border border-slate-300 rounded px-2 py-1 text-sm">
                        <option>Relevance</option>
                        <option>Rating</option>
                        <option>Experience</option>
                        <option>Price</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {filteredDoctors.length > 0 ? (
                  <div className="space-y-6">
                    {filteredDoctors.map(renderDoctorCard)}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No doctors found</h3>
                    <p className="text-slate-600 mb-4">Try adjusting your search criteria or filters</p>
                    <Button type="button" onClick={() => {
                      resetForm();
                    }}>
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default DoctorSearch;
