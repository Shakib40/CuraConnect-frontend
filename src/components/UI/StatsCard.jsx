import { iconDefinitions } from "./iconConstants";

const StatsCard = ({ 
    title, 
    value, 
    iconType, 
    customIcon = null,
    bgColor = null,
    iconColor = null,
    className = "" 
}) => {
    const iconConfig = iconDefinitions[iconType] || {};
    const IconComponent = customIcon || iconConfig.icon;
    const finalBgColor = bgColor || iconConfig.bgColor || "bg-slate-50";
    const finalIconColor = iconColor || iconConfig.iconColor || "text-slate-600";

    return (
        <div className={`bg-white p-4 rounded-lg border border-slate-200 ${className}`}>
            <div className="flex items-center gap-3">
                <div className={`p-2 ${finalBgColor} rounded-lg`}>
                    <IconComponent className={`w-5 h-5 ${finalIconColor}`} />
                </div>
                <div>
                    <p className="text-sm text-slate-500">{title}</p>
                    <p className="text-xl font-bold text-slate-800">{value}</p>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
