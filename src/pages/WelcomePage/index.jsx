// Create this Page as Welcome Page
// Show Page Starting 
// SHow Carousel of IMages
// Show Testimonials
// Show Features
// Show Contact Us
// Show Footer
// Show Copyright
// Show Social Icons
// Show Header, with logo and navigation to Login Page

import { useState } from "react";
import { ChevronLeft, ChevronRight, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Star, Users, Shield, Zap, Clock, CheckCircle } from "lucide-react";

const WelcomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const carouselImages = [
        {
            url: "https://images.unsplash.com/photo-155975714-0d5cf-65e2828a76f8?w=800&h=400&fit=crop",
            title: "Modern Medical Facility",
            description: "State-of-the-art healthcare infrastructure"
        },
        {
            url: "https://images.unsplash.com/photo-1576091160550-063e8a8e9cf?w=800&h=400&fit=crop",
            title: "Medical Professionals",
            description: "Expert healthcare team at your service"
        },
        {
            url: "https://images.unsplash.com/photo-155975714-0d5cf-65e2828a76f8?w=800&h=400&fit=crop",
            title: "Advanced Technology",
            description: "Cutting-edge medical technology solutions"
        }
    ];

    const testimonials = [
        {
            name: "Dr. Sarah Johnson",
            role: "Hospital Administrator",
            content: "CuraConnect has transformed how we manage our medical supply chain. The platform is intuitive and saves us countless hours.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1559839734-0b8e6890a38?w=100&h=100&fit=crop&crop=face"
        },
        {
            name: "Michael Chen",
            role: "Pharmacy Director",
            content: "Excellent customer support and seamless integration with our existing systems. Highly recommended!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2?w=100&h=100&fit=crop&crop=face"
        },
        {
            name: "Lisa Rodriguez",
            role: "Supply Chain Manager",
            content: "The real-time inventory tracking and order management features have revolutionized our procurement process.",
            rating: 4,
            image: "https://images.unsplash.com/photo-1494790108757-5c8d8b5f30?w=100&h=100&fit=crop&crop=face"
        }
    ];

    const features = [
        {
            icon: <Users className="w-8 h-8 text-blue-600" />,
            title: "Multi-Role Support",
            description: "Perfect for hospitals, pharmacies, clinics, and medical suppliers"
        },
        {
            icon: <Shield className="w-8 h-8 text-green-600" />,
            title: "Secure & Compliant",
            description: "HIPAA compliant with enterprise-grade security"
        },
        {
            icon: <Zap className="w-8 h-8 text-purple-600" />,
            title: "Real-Time Analytics",
            description: "Track orders, inventory, and performance metrics"
        },
        {
            icon: <Clock className="w-8 h-8 text-orange-600" />,
            title: "24/7 Support",
            description: "Round-the-clock customer support and technical assistance"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">C</span>
                            </div>
                            <span className="text-xl font-bold text-slate-800">uraConnect</span>
                        </div>
                        <nav className="hidden md:flex space-x-6">
                            <a href="#features" className="text-slate-600 hover:text-teal-600 transition-colors">Features</a>
                            <a href="#testimonials" className="text-slate-600 hover:text-teal-600 transition-colors">Testimonials</a>
                            <a href="#contact" className="text-slate-600 hover:text-teal-600 transition-colors">Contact</a>
                            <a 
                                href="/login" 
                                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                            >
                                Login
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section with Carousel */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
                <div className="relative z-20 text-center px-6">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Connecting Healthcare, Simplifying Supply Chains
                        </h1>
                        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                            The comprehensive platform for medical suppliers, hospitals, and healthcare facilities
                        </p>
                        
                        {/* Carousel */}
                        <div className="relative max-w-4xl mx-auto h-96">
                            {carouselImages.map((image, index) => (
                                <div 
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ${
                                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <img 
                                        src={image.url} 
                                        alt={image.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                        <h3 className="text-white text-xl font-semibold mb-2">{image.title}</h3>
                                        <p className="text-white text-sm">{image.description}</p>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Carousel Controls */}
                            <button 
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-white p-2 rounded-full z-30"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button 
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-white p-2 rounded-full z-30"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="flex justify-center space-x-4 mt-8">
                            <a 
                                href="/login" 
                                className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors text-lg font-semibold"
                            >
                                Get Started
                            </a>
                            <a 
                                href="#features" 
                                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-teal-600 transition-colors text-lg font-semibold"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Choose CuraConnect?</h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Powerful features designed specifically for healthcare supply chain management
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center p-6 rounded-lg border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all">
                                <div className="flex justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">What Our Users Say</h2>
                        <p className="text-lg text-slate-600">Trusted by healthcare professionals nationwide</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-center mb-4">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div className="ml-4">
                                        <h4 className="text-lg font-semibold text-slate-800">{testimonial.name}</h4>
                                        <p className="text-sm text-teal-600">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`w-5 h-5 ${
                                                i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                                            }`} 
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-600 italic">"{testimonial.content}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-teal-600">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Have questions? We're here to help you succeed
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <Mail className="w-8 h-8 text-white mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                            <p className="text-white/90">support@curaconnect.com</p>
                        </div>
                        <div className="text-center">
                            <Phone className="w-8 h-8 text-white mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                            <p className="text-white/90">+1 (800) 123-4567</p>
                        </div>
                        <div className="text-center">
                            <MapPin className="w-8 h-8 text-white mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Address</h3>
                            <p className="text-white/90">123 Healthcare Ave, Medical City, MC 12345</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-4">CuraConnect</h4>
                            <p className="text-slate-400 mb-4">
                                Your trusted partner for medical supply chain management
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a></li>
                                <li><a href="#testimonials" className="text-slate-400 hover:text-white transition-colors">Testimonials</a></li>
                                <li><a href="/login" className="text-slate-400 hover:text-white transition-colors">Login</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">API Access</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Support Center</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 mt-8 pt-8 text-center">
                        <p className="text-slate-400">
                            2024 CuraConnect. All rights reserved.
                        </p>
                        <p className="text-slate-400 text-sm mt-2">
                            Built with for healthcare professionals
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default WelcomePage;