import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
  FileText
} from "lucide-react";
import Button from "../../../components/UI/Button";
import Input from "../../../components/Form/Input";
import Select from "../../../components/Form/Select";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get('doctor');
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock doctor data (in real app, this would be fetched based on doctorId)
  const doctor = {
    id: doctorId || 1,
    name: "Dr. Sarah Jenkins",
    specialty: "Cardiology",
    hospital: "City General Hospital",
    location: "City General Hospital",
    rating: 4.8,
    reviews: 127,
    experience: "15 years",
    education: "MD, Harvard Medical School",
    consultationFee: 250,
    image: "/api/placeholder/100/100",
    languages: ["English", "Spanish"],
    isAvailable: true,
    type: "hospital"
  };

  // Mock available time slots
  const timeSlots = [
    { id: 1, time: "09:00 AM", available: true },
    { id: 2, time: "09:30 AM", available: true },
    { id: 3, time: "10:00 AM", available: false },
    { id: 4, time: "10:30 AM", available: true },
    { id: 5, time: "11:00 AM", available: true },
    { id: 6, time: "11:30 AM", available: false },
    { id: 7, time: "02:00 PM", available: true },
    { id: 8, time: "02:30 PM", available: true },
    { id: 9, time: "03:00 PM", available: true },
    { id: 10, time: "03:30 PM", available: false },
    { id: 11, time: "04:00 PM", available: true },
    { id: 12, time: "04:30 PM", available: true },
  ];

  // Generate dates for next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      dates.push({
        id: i,
        date: date,
        formatted: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        isToday: i === 0
      });
    }
    
    return dates;
  };

  const availableDates = generateDates();

  const handleDateSelect = (date) => {
    setSelectedDate(date.formatted);
    setSelectedTime("");
    setSelectedSlot(null);
  };

  const handleTimeSelect = (slot) => {
    if (slot.available) {
      setSelectedTime(slot.time);
      setSelectedSlot(slot.id);
    }
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time for your appointment");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/patient/appointments");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/patient/appointments/search" className="text-slate-600 hover:text-slate-900">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Book Appointment</h1>
                <p className="text-slate-600 mt-1">Schedule your visit with {doctor.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctor Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex gap-4 mb-4">
                <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-10 h-10 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{doctor.name}</h3>
                  <p className="text-slate-600">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 text-amber-500 mt-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-slate-500 text-sm">({doctor.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  {doctor.type === 'hospital' ? <Hospital className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  <span>{doctor.hospital}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4" />
                  <span>+1 234 567 8900</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span>doctor@example.com</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">Consultation Fee</span>
                  <span className="font-semibold text-slate-900">₹{doctor.consultationFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Experience</span>
                  <span className="font-medium text-slate-900">{doctor.experience}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Select Date & Time</h2>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">Select Date</label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.map((date) => (
                    <button
                      key={date.id}
                      onClick={() => handleDateSelect(date)}
                      className={`p-3 text-center rounded-lg border transition-colors ${
                        selectedDate === date.formatted
                          ? "bg-teal-600 text-white border-teal-600"
                          : date.isToday
                          ? "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-xs font-medium">{date.formatted.split(',')[0]}</div>
                      <div className="text-sm font-semibold">{date.formatted.split(',')[1]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">Select Time</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleTimeSelect(slot)}
                      disabled={!slot.available}
                      className={`p-3 text-center rounded-lg border transition-colors ${
                        selectedSlot === slot.id
                          ? "bg-teal-600 text-white border-teal-600"
                          : slot.available
                          ? "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Appointment Details */}
              {selectedDate && selectedTime && (
                <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <h3 className="font-medium text-teal-900 mb-2">Appointment Summary</h3>
                  <div className="space-y-1 text-sm text-teal-700">
                    <div>Date: {selectedDate}</div>
                    <div>Time: {selectedTime}</div>
                    <div>Doctor: {doctor.name}</div>
                    <div>Fee: ₹{doctor.consultationFee}</div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleBookAppointment}
                  disabled={!selectedDate || !selectedTime || isLoading}
                  variant="primary"
                  className="flex-1"
                >
                  {isLoading ? "Booking..." : "Confirm Appointment"}
                </Button>
                <Link to="/patient/appointments/search">
                  <Button variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
