const options = {
    orderStatus: [
        { value: "pending", label: "Pending" },
        { value: "confirmed", label: "Confirmed" },
        { value: "processing", label: "Processing" },
        { value: "ready_for_pickup", label: "Ready for Pickup" },
        { value: "out_for_delivery", label: "Out for Delivery" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "returned", label: "Returned" },
        { value: "on_hold", label: "On Hold" },
        { value: "cancelled", label: "Cancelled" }
    ],
    priority: [
        { value: "high", label: "High" },
        { value: "medium", label: "Medium" },
        { value: "low", label: "Low" },
        { value: "urgent", label: "Urgent" },
        { value: "routine", label: "Routine" }
    ],
    paymentStatus: [
        { value: "paid", label: "Paid" },
        { value: "pending", label: "Pending" },
        { value: "failed", label: "Failed" },
        { value: "refunded", label: "Refunded" },
        { value: "partially_paid", label: "Partially Paid" },
        { value: "overdue", label: "Overdue" }
    ],
    paymentMethod: [
        { value: "credit_card", label: "Credit Card" },
        { value: "debit_card", label: "Debit Card" },
        { value: "bank_transfer", label: "Bank Transfer" },
        { value: "cash_on_delivery", label: "Cash on Delivery" },
        { value: "paypal", label: "PayPal" },
        { value: "stripe", label: "Stripe" },
        { value: "check", label: "Check" }
    ],
    dateRanges: [
        { value: "all", label: "All Time" },
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
        { value: "this_week", label: "This Week" },
        { value: "last_week", label: "Last Week" },
        { value: "this_month", label: "This Month" },
        { value: "last_month", label: "Last Month" },
        { value: "this_quarter", label: "This Quarter" },
        { value: "last_quarter", label: "Last Quarter" },
        { value: "this_year", label: "This Year" },
        { value: "last_year", label: "Last Year" },
        { value: "custom", label: "Custom Range" }
    ],
    reportTypes: [
        { value: "all", label: "All Reports", },
        { value: "sales", label: "Sales Reports", },
        { value: "inventory", label: "Inventory Reports", },
        { value: "customer", label: "Customer Reports", },
        { value: "financial", label: "Financial Reports",}
    ],
    orderTypes: [
        { value: "regular", label: "Regular Order" },
        { value: "urgent", label: "Urgent Order" },
        { value: "bulk", label: "Bulk Order" },
        { value: "prescription", label: "Prescription Order" },
        { value: "recurring", label: "Recurring Order" },
        { value: "sample", label: "Sample Order" }
    ],
    shippingMethods: [
        { value: "standard", label: "Standard Shipping" },
        { value: "express", label: "Express Shipping" },
        { value: "overnight", label: "Overnight Shipping" },
        { value: "same_day", label: "Same Day Delivery" },
        { value: "pickup", label: "Store Pickup" },
        { value: "digital", label: "Digital Delivery" }
    ]
};

export default options;