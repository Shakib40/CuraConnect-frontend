import { useLocation, Link } from "react-router-dom";
import { HelpCircle, MessageSquare } from "lucide-react";
import AskHelpForm from "./AskHelp";
import RaisedList from "./RaisedList";

const AskHelpMain = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Help & Support</h2>
                <div className="flex gap-2">
                    <Link
                        to="/medicine-supplier/ask-help/raise-case"
                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                            isActive('/medicine-supplier/ask-help/raise-case')
                                ? 'bg-teal-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Raise Case
                    </Link>
                    <Link
                        to="/medicine-supplier/ask-help/my-cases"
                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                            isActive('/medicine-supplier/ask-help/my-cases')
                                ? 'bg-teal-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        <HelpCircle className="w-4 h-4" />
                        My Cases
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
                {isActive('/medicine-supplier/ask-help/raise-case') ? (
                    <AskHelpForm />
                ) : isActive('/medicine-supplier/ask-help/my-cases') ? (
                    <RaisedList />
                ) : (
                    <AskHelpForm />
                )}
            </div>
        </div>
    );
};

export default AskHelpMain;
