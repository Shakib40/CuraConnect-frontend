import { Link } from "react-router-dom";
import { UserCheck, ArrowRight } from "lucide-react";

const OnboardingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="mx-auto w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                    <UserCheck className="h-10 w-10 text-teal-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                    Welcome to CuraConnect!
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                    Let's get your profile set up so you can start experiencing seamless healthcare connectivity.
                </p>

                <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-100 text-left">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Next Steps</h3>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-sm">1</div>
                            <p className="ml-3 text-slate-600">Complete your personal profile details.</p>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-sm">2</div>
                            <p className="ml-3 text-slate-600">Verify your identity and uploaded credentials (if applicable).</p>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-sm">3</div>
                            <p className="ml-3 text-slate-600">Explore the dashboard and start connecting.</p>
                        </li>
                    </ul>

                    <Link
                        to="/auth/login"
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                    >
                        Start Onboarding <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;
