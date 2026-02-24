import { Routes, Route, Outlet } from "react-router-dom";
import { HelpCircle, MessageSquare } from "lucide-react";
import AskHelpForm from "./AskHelp";
import RaisedList from "./RaisedList";

const AskHelpLayout = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Help & Support</h2>
                <div className="flex gap-2">
                    <a
                        href="/medicine-supplier/ask-help/raise-case"
                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 bg-teal-600 text-white`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Raise Case
                    </a>
                    <a
                        href="/medicine-supplier/ask-help/my-cases"
                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 bg-slate-100 text-slate-600 hover:bg-slate-200`}
                    >
                        <HelpCircle className="w-4 h-4" />
                        My Cases
                    </a>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
                <Outlet />
            </div>
        </div>
    );
};

const AskHelpRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AskHelpLayout />}>
                <Route path="raise-case" element={<AskHelpForm />} />
                <Route path="my-cases" element={<RaisedList />} />
                <Route index element={<AskHelpForm />} />
            </Route>
        </Routes>
    );
};

export default AskHelpRoutes;