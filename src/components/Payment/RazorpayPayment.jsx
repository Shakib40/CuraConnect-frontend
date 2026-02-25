import React, { useState, useEffect } from 'react';
import { loadRazorpayScript, getRazorpayKey } from './razorpayUtils';

const RazorpayPayment = ({
  amount,
  doctorName,
  appointmentDate,
  appointmentTime,
  description,
  onSuccess,
  onFailure,
  onCancel,
  patientInfo = {}
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script on component mount
  useEffect(() => {
    loadRazorpayScript().then(setRazorpayLoaded);
  }, []);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert('Payment gateway is loading. Please try again.');
      return;
    }

    setIsProcessing(true);

    try {
      // Razorpay options
      const options = {
        key: getRazorpayKey(), // Get test key from utility
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: "CuraConnect",
        description: `Appointment with ${doctorName}`,
        image: "https://via.placeholder.com/100x100.png", // Your app logo
        order_id: "", // Generate from your backend
        handler: function (response) {
          // Payment successful
          console.log("Payment Success:", response);
          setIsProcessing(false);
          if (onSuccess) {
            onSuccess(response);
          }
        },
        prefill: {
          name: patientInfo.name || "Patient Name",
          email: patientInfo.email || "patient@example.com",
          contact: patientInfo.phone || "9999999999",
        },
        notes: {
          doctor_name: doctorName,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          patient_description: description || "",
          user_id: patientInfo.userId || "",
        },
        theme: {
          color: "#14b8a6", // Teal color to match your app
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            if (onCancel) {
              onCancel();
            }
          },
          escape: true,
          backdropclose: true,
          animation: "fadeFromBottom",
        },
        // Add method configuration to ensure all payment methods are available
        config: {
          display: {
            blocks: {
                banks: {
                  name: 'Pay Using Banks',
                  instruments: [
                    {
                      name: 'HDFC Bank',
                      method: 'netbanking',
                      description: 'HDFC Net Banking',
                    },
                    {
                      name: 'ICICI Bank',
                      method: 'netbanking',
                      description: 'ICICI Net Banking',
                    },
                  ],
                },
                upi: {
                  name: 'Pay Using UPI',
                  instruments: [
                    {
                      name: 'Google Pay',
                      method: 'upi',
                      description: 'Google Pay UPI',
                    },
                    {
                      name: 'PhonePe',
                      method: 'upi',
                      description: 'PhonePe UPI',
                    },
                    {
                      name: 'Paytm',
                      method: 'upi',
                      description: 'Paytm UPI',
                    },
                  ],
                },
                card: {
                  name: 'Pay Using Card',
                  instruments: [
                    {
                      name: 'Credit Card',
                      method: 'card',
                      description: 'Credit/Debit Card',
                    },
                  ],
                },
                wallet: {
                  name: 'Pay Using Wallet',
                  instruments: [
                    {
                      name: 'Paytm Wallet',
                      method: 'wallet',
                      description: 'Paytm Wallet',
                    },
                  ],
                },
            },
            hide: [
                {
                method: 'paylater'
                }
            ],
            sequence: ['block.block.banks', 'block.block.upi', 'block.block.card', 'block.block.wallet'],
            preferences: {
                show_default_blocks: true,
                show_payment_methods: [
                    'upi',
                    'card',
                    'netbanking',
                    'wallet'
                ]
            }
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      // Add error handling
      rzp.on('payment.failed', function (response) {
        console.error("Payment Failed:", response);
        setIsProcessing(false);
        if (onFailure) {
          onFailure(response);
        }
      });

      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      setIsProcessing(false);
      alert('Unable to initialize payment. Please try again later.');
      if (onFailure) {
        onFailure(error);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-lg font-bold">R</span>
        </div>
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Pay with Razorpay</h3>
        <p className="text-sm text-blue-700 mb-4">
          Click "Pay Now" to open Razorpay's secure payment gateway. You can pay using:
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs text-blue-600 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4">💳</span>
            <span>Credit/Debit Cards</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4">📱</span>
            <span>UPI Apps</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4">🏦</span>
            <span>Net Banking</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4">👛</span>
            <span>Wallets</span>
          </div>
        </div>
        <div className="bg-white rounded p-3 border border-blue-200">
          <p className="text-xs text-blue-700">
            <strong>Secure:</strong> All transactions are encrypted and secure
          </p>
        </div>
      </div>
      
      <button
        onClick={handlePayment}
        disabled={isProcessing || !razorpayLoaded}
        className="w-full mt-4 bg-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </div>
  );
};

export default RazorpayPayment;
