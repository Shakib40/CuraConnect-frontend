import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { 
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Star,
  User,
  Building,
  Video,
  CheckCircle
} from "lucide-react";
import Button from "components/UI/Button";
import RazorpayPayment from "components/Payment/RazorpayPayment";

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get('doctor');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Get appointment details from sessionStorage or use defaults
  const getAppointmentDetails = () => {
    const storedData = sessionStorage.getItem('appointmentData');
    if (storedData) {
      return JSON.parse(storedData);
    }
    
    // Fallback data
    return {
      doctor: {
        id: doctorId || 1,
        name: "Dr. Sarah Jenkins",
        specialty: "Cardiology",
        hospital: "City General Hospital",
        rating: 4.8,
        consultationFee: 250
      },
      appointment: {
        date: "Today - Tue, Jan 15",
        time: "10:00 AM",
        mode: "offline"
      },
      description: "Patient experiencing chest pain and shortness of breath"
    };
  };

  const appointmentDetails = getAppointmentDetails();

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    
    // Clear sessionStorage after successful payment
    sessionStorage.removeItem('appointmentData');
    
    // Redirect to appointments after successful payment
    setTimeout(() => {
      navigate("/patient/appointments");
    }, 3000);
  };

  const handlePaymentFailure = (error) => {
    console.error("Payment failed:", error);
    // Handle payment failure (show error message, etc.)
  };

  const handlePaymentCancel = () => {
    // Handle payment cancellation
    console.log("Payment cancelled by user");
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
            <p className="text-slate-600 mb-6">
              Your appointment has been confirmed and payment processed successfully.
            </p>
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-green-900 mb-2">Appointment Details</h3>
              <div className="text-sm text-green-700 space-y-1">
                <div>Doctor: {appointmentDetails.doctor.name}</div>
                <div>Date: {appointmentDetails.appointment.date}</div>
                <div>Time: {appointmentDetails.appointment.time}</div>
                <div>Amount Paid: ₹{appointmentDetails.doctor.consultationFee}</div>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              Redirecting to your appointments...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/patient/appointments/book" className="text-slate-600 hover:text-slate-900">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Payment</h1>
                <p className="text-slate-600 mt-1">Complete your appointment booking</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Appointment Summary</h3>
              
              {/* Doctor Info */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">{appointmentDetails.doctor.name}</h4>
                  <p className="text-sm text-slate-600">{appointmentDetails.doctor.specialty}</p>
                  <div className="flex items-center gap-1 text-amber-500 mt-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-medium">{appointmentDetails.doctor.rating}</span>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-3 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">Date:</span>
                  <span className="font-medium text-slate-900">{appointmentDetails.appointment.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">Time:</span>
                  <span className="font-medium text-slate-900">{appointmentDetails.appointment.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  {appointmentDetails.appointment.mode === "online" ? 
                    <Video className="w-4 h-4 text-slate-400" /> : 
                    <Building className="w-4 h-4 text-slate-400" />
                  }
                  <span className="text-slate-600">Mode:</span>
                  <span className="font-medium text-slate-900">
                    {appointmentDetails.appointment.mode === "online" ? "Online" : "In-Person"}
                  </span>
                </div>
              </div>

              {/* Description */}
              {appointmentDetails.description && (
                <div className="mb-4 pb-4 border-b border-slate-200">
                  <h5 className="text-sm font-medium text-slate-700 mb-2">Description</h5>
                  <p className="text-xs text-slate-600">{appointmentDetails.description}</p>
                </div>
              )}

              {/* Payment Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Consultation Fee</span>
                  <span className="font-medium text-slate-900">₹{appointmentDetails.doctor.consultationFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Platform Fee</span>
                  <span className="font-medium text-slate-900">₹0</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-teal-600">₹{appointmentDetails.doctor.consultationFee}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-5 h-5 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">R</span>
                </span>
                <h2 className="text-lg font-semibold text-slate-900">Payment Details</h2>
              </div>

              <RazorpayPayment
                amount={appointmentDetails.doctor.consultationFee}
                doctorName={appointmentDetails.doctor.name}
                appointmentDate={appointmentDetails.appointment.date}
                appointmentTime={appointmentDetails.appointment.time}
                description={appointmentDetails.description}
                onSuccess={handlePaymentSuccess}
                onFailure={handlePaymentFailure}
                onCancel={handlePaymentCancel}
                patientInfo={{
                  name: "Patient Name", // Get from user profile
                  email: "patient@example.com", // Get from user profile
                  phone: "9999999999", // Get from user profile
                  userId: "user123" // Get from auth context
                }}
              />

              {/* Cancel Button */}
              <div className="mt-4">
                <Link to="/patient/appointments/book">
                  <Button type="button" variant="outline" className="w-full">
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

export default Payment;
