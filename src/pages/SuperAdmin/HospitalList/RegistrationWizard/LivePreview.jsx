import React from "react";
import { Camera, Info } from "lucide-react";
import PreviewCard from "./PreviewCard";

const LivePreview = () => {
    return (
        <div className="hidden lg:block w-96 bg-slate-50 p-8 border-l border-slate-100">
            <div className="sticky top-8">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-600/20">
                        <Camera className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-slate-800 tracking-tight">Live Profile Preview</h4>
                </div>

                <PreviewCard />

                <div className="mt-8 space-y-4">
                    <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Onboarding Status</p>
                        <div className="flex items-center gap-2 text-orange-500 font-bold text-sm">
                            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                            Drafting Setup
                        </div>
                    </div>
                    <div className="flex gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100 text-blue-700">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        <p className="text-[11px] leading-relaxed">
                            This is exactly how your hospital will appear in the patient-facing directory app.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LivePreview;
