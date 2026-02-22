import React from "react";
import { useFormikContext } from "formik";
import { Building2, MapPin } from "lucide-react";

const PreviewCard = () => {
    const { values } = useFormikContext();

    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="h-32 bg-gradient-to-br from-teal-500 via-teal-600 to-teal-800 relative">
                <div className="absolute top-4 right-4 px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] text-white font-bold tracking-widest uppercase">
                    PRO Verified
                </div>
            </div>
            <div className="px-6 pb-8 -mt-10 relative">
                <div className="w-20 h-20 rounded-3xl bg-white p-1 shadow-xl mb-4 transform -rotate-3">
                    <div className="w-full h-full rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
                        <Building2 className="w-10 h-10" />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 leading-tight">
                    {values.name || "Hospital Name"}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                    <MapPin className="w-3 h-3 text-teal-600" />
                    {values.city || "City"}, {values.state || "State"}
                </div>

                <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-teal-50 text-[10px] font-bold text-teal-700 rounded-full border border-teal-100 uppercase">
                            {values.type}
                        </span>
                        {values.specialties?.slice(0, 2).map((s, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-600 rounded-full border border-slate-200 uppercase">
                                {s.label}
                            </span>
                        ))}
                        {values.specialties?.length > 2 && (
                            <span className="px-2 py-0.5 bg-slate-50 text-[10px] font-bold text-slate-400 rounded-full">
                                +{values.specialties.length - 2} more
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Rating</p>
                            <div className="flex text-amber-400 text-xs">
                                ★★★★★
                            </div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Wait Time</p>
                            <p className="text-xs font-bold text-slate-700">~15 mins</p>
                        </div>
                    </div>
                </div>

                <button type="button" className="w-full mt-6 py-4 bg-teal-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-teal-600/30 active:scale-95 transition-all">
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default PreviewCard;
