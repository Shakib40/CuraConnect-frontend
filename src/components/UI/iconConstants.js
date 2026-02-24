import {
    ShoppingCart,
    Clock,
    RefreshCw,
    Truck,
    CheckCircle,
    DollarSign,
    Package,
    Users,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Star,
    Eye
} from "lucide-react";

// Icon definitions with their styling
export const iconDefinitions = {
    // Order related icons
    orders: { icon: ShoppingCart, bgColor: "bg-purple-50", iconColor: "text-purple-600" },
    pending: { icon: Clock, bgColor: "bg-yellow-50", iconColor: "text-yellow-600" },
    processing: { icon: RefreshCw, bgColor: "bg-blue-50", iconColor: "text-blue-600" },
    shipped: { icon: Truck, bgColor: "bg-purple-50", iconColor: "text-purple-600" },
    delivered: { icon: CheckCircle, bgColor: "bg-green-50", iconColor: "text-green-600" },
    
    // Business metrics
    revenue: { icon: DollarSign, bgColor: "bg-blue-50", iconColor: "text-blue-600" },
    products: { icon: Package, bgColor: "bg-orange-50", iconColor: "text-orange-600" },
    users: { icon: Users, bgColor: "bg-indigo-50", iconColor: "text-indigo-600" },
    
    // Status indicators
    trendingUp: { icon: TrendingUp, bgColor: "bg-green-50", iconColor: "text-green-600" },
    trendingDown: { icon: TrendingDown, bgColor: "bg-red-50", iconColor: "text-red-600" },
    alert: { icon: AlertTriangle, bgColor: "bg-red-50", iconColor: "text-red-600" },
    star: { icon: Star, bgColor: "bg-yellow-50", iconColor: "text-yellow-600" },
    eye: { icon: Eye, bgColor: "bg-blue-50", iconColor: "text-blue-600" }
};
