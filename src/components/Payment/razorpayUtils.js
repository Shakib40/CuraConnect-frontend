// Razorpay utility functions
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const validateRazorpayResponse = (response) => {
  // Validate Razorpay response
  if (!response || !response.razorpay_payment_id) {
    return false;
  }
  return true;
};

export const formatAmount = (amount) => {
  // Format amount for Razorpay (convert to paise)
  return Math.round(amount * 100);
};

export const generateOrderNotes = (appointmentDetails, patientInfo) => {
  return {
    doctor_id: appointmentDetails.doctor?.id || '',
    doctor_name: appointmentDetails.doctor?.name || '',
    appointment_date: appointmentDetails.appointment?.date || '',
    appointment_time: appointmentDetails.appointment?.time || '',
    appointment_mode: appointmentDetails.appointment?.mode || '',
    patient_description: appointmentDetails.description || '',
    user_id: patientInfo.userId || '',
    consultation_fee: appointmentDetails.doctor?.consultationFee || 0,
  };
};

// Get a working Razorpay test key
export const getRazorpayKey = () => {
  // You can use any of these test keys:
  const testKeys = [
    "rzp_test_1DP5mmOlF5G5ag",
    "rzp_test_O3Uj2jg2sF4e5h",
    "rzp_test_1234567890ABC"
  ];
  return testKeys[0]; // Use the first test key
};

// Validate if Razorpay key is valid
export const validateRazorpayKey = (key) => {
  // Basic validation for Razorpay key format
  return key && key.startsWith('rzp_test_') && key.length > 20;
};
