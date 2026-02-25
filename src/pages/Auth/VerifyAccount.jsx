import { useState } from "react";
import { MailCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const VerifyAccount = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(["", "", "", "", "", ""]);

    const handleChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Auto focus next input
            if (value !== "" && index < 5) {
                document.getElementById(`code-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && code[index] === "" && index > 0) {
            document.getElementById(`code-${index - 1}`).focus();
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();
        const verificationCode = code.join('');
        console.log("Verifying code:", verificationCode);
        // Navigate to onboarding after successful verification
        navigate('/auth/onboarding');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <MailCheck className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                    Verify Your Account
                </h2>
                <p className="text-md text-slate-600 max-w-sm mx-auto mb-8">
                    We've sent a 6-digit verification code to your phone number.
                </p>

                <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-100">
                    <form onSubmit={handleVerify}>
                        <div className="flex justify-center gap-2 sm:gap-4 mb-8">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-colors"
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={code.some(digit => digit === "")}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                        >
                            Verify Code
                        </button>
                    </form>

                    <p className="mt-6 flex justify-center items-center text-slate-500 text-sm">
                        Didn't receive the code?
                        <button className="ml-2 font-medium text-teal-600 hover:text-teal-500 focus:outline-none">
                            Resend
                        </button>
                    </p>

                    <div className="mt-4 text-center">
                        <Link to="/auth/login" className="text-sm font-medium text-slate-400 hover:text-slate-600">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;
