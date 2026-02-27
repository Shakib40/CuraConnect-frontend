import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'flowbite-react'
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Star,
  Users,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  Quote,
  Send,
} from 'lucide-react'
import HeroBackground from '../../components/animations/HeroBackground'

const WelcomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change testimonial every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const carouselImages = [
    {
      url: 'https://media.gettyimages.com/id/1414912230/photo/luxury-speed-boat-floating-in-open-sea-at-summer-yacht-sailing-in-sea-at-hot-summer-day.jpg?s=612x612&w=0&k=20&c=npf2IvTka2QsGLhRP0J3uhLgGZ35xjlbqwzviKdigTo=',
      title: 'Premium Medical Transport',
      description: 'Fast and reliable medical supply delivery across waterways',
    },
    {
      url: 'https://images.unsplash.com/photo-155975714-0d5cf-65e2828a76f8?w=800&h=400&fit=crop',
      title: 'Modern Medical Facility',
      description: 'State-of-the-art healthcare infrastructure',
    },
    {
      url: 'https://images.unsplash.com/photo-1576091160550-063e8a8e9cf?w=800&h=400&fit=crop',
      title: 'Medical Professionals',
      description: 'Expert healthcare team at your service',
    },
    {
      url: 'https://images.unsplash.com/photo-155975714-0d5cf-65e2828a76f8?w=800&h=400&fit=crop',
      title: 'Advanced Technology',
      description: 'Cutting-edge medical technology solutions',
    },
  ]

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Hospital Administrator',
      content:
        'CuraConnect has transformed how we manage our medical supply chain. The platform is intuitive and saves us countless hours.',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1559839734-0b8e6890a38?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Michael Chen',
      role: 'Pharmacy Director',
      content:
        'Excellent customer support and seamless integration with our existing systems. Highly recommended!',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Supply Chain Manager',
      content:
        'The real-time inventory tracking and order management features have revolutionized our procurement process.',
      rating: 4,
      image:
        'https://images.unsplash.com/photo-1494790108757-5c8d8b5f30?w=100&h=100&fit=crop&crop=face',
    },
  ]

  const features = [
    {
      icon: <Users className='w-8 h-8 text-blue-600' />,
      title: 'Multi-Role Support',
      description: 'Perfect for hospitals, pharmacies, clinics, and medical suppliers',
    },
    {
      icon: <Shield className='w-8 h-8 text-green-600' />,
      title: 'Secure & Compliant',
      description: 'HIPAA compliant with enterprise-grade security',
    },
    {
      icon: <Zap className='w-8 h-8 text-purple-600' />,
      title: 'Real-Time Analytics',
      description: 'Track orders, inventory, and performance metrics',
    },
    {
      icon: <Clock className='w-8 h-8 text-orange-600' />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support and technical assistance',
    },
  ]

  const patientBenefits = [
    {
      icon: <CheckCircle className='w-8 h-8 text-teal-600' />,
      title: 'Easy Appointment Booking',
      description:
        'Book appointments with healthcare providers instantly through our intuitive platform',
    },
    {
      icon: <Shield className='w-8 h-8 text-blue-600' />,
      title: 'Secure Medical Records',
      description: 'Access and manage your medical history with complete privacy and security',
    },
    {
      icon: <Clock className='w-8 h-8 text-green-600' />,
      title: 'Reduced Wait Times',
      description: 'Skip long queues and get timely care with efficient scheduling systems',
    },
    {
      icon: <Users className='w-8 h-8 text-purple-600' />,
      title: 'Find Best Doctors',
      description: 'Discover and connect with top-rated healthcare professionals in your area',
    },
  ]

  const hospitalBenefits = [
    {
      icon: <Zap className='w-8 h-8 text-orange-600' />,
      title: 'Streamlined Operations',
      description: 'Automate inventory management, procurement, and supply chain workflows',
    },
    {
      icon: <Shield className='w-8 h-8 text-red-600' />,
      title: 'Cost Optimization',
      description:
        'Reduce operational costs through efficient resource management and bulk purchasing',
    },
    {
      icon: <Users className='w-8 h-8 text-blue-600' />,
      title: 'Staff Management',
      description: 'Manage healthcare staff schedules, permissions, and performance metrics',
    },
    {
      icon: <Clock className='w-8 h-8 text-green-600' />,
      title: 'Better Patient Care',
      description: 'Focus more on patient care with automated administrative processes',
    },
  ]

  const supplierBenefits = [
    {
      icon: <Zap className='w-8 h-8 text-yellow-600' />,
      title: 'Wider Market Reach',
      description: 'Connect with hospitals and healthcare facilities across the region',
    },
    {
      icon: <Users className='w-8 h-8 text-blue-600' />,
      title: 'Order Management',
      description: 'Process and track orders efficiently with real-time status updates',
    },
    {
      icon: <Shield className='w-8 h-8 text-green-600' />,
      title: 'Payment Security',
      description: 'Secure payment processing and transparent financial transactions',
    },
    {
      icon: <Clock className='w-8 h-8 text-purple-600' />,
      title: 'Inventory Insights',
      description: 'Get demand forecasts and optimize your inventory based on market trends',
    },
  ]

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <header className='bg-white shadow-sm sticky top-0 z-50'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-xl'>C</span>
              </div>
              <span className='text-xl font-bold text-slate-800'>uraConnect</span>
            </div>
            <nav className='hidden md:flex items-center space-x-8'>
              <a
                href='#features'
                className='text-slate-600 hover:text-teal-600 transition-colors font-medium'
              >
                Features
              </a>
              <a
                href='#patients'
                className='text-slate-600 hover:text-teal-600 transition-colors font-medium'
              >
                For Patients
              </a>
              <a
                href='#hospitals'
                className='text-slate-600 hover:text-teal-600 transition-colors font-medium'
              >
                For Hospitals
              </a>
              <a
                href='#suppliers'
                className='text-slate-600 hover:text-teal-600 transition-colors font-medium'
              >
                For Suppliers
              </a>
              <a
                href='#testimonials'
                className='text-slate-600 hover:text-teal-600 transition-colors font-medium'
              >
                Testimonials
              </a>
              <a
                href='#contact'
                className='text-slate-600 hover:text-teal-600 transition-colors font-medium'
              >
                Contact
              </a>
              <Link
                to='/auth/login'
                className='bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium ml-4'
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section className='relative min-h-[500px] h-[70vh] flex items-center justify-center overflow-hidden'>
        <HeroBackground />
        <div className='absolute inset-0 bg-slate-900/40 z-10 backdrop-blur-sm'></div>
        <div className='relative z-20 w-full h-full'>
          {/* Flowbite Carousel */}
          <Carousel
            slideInterval={5000}
            slide={true}
            indicators={true}
            leftControl={<ChevronLeft className='w-8 h-8 text-white drop-shadow-md' />}
            rightControl={<ChevronRight className='w-8 h-8 text-white drop-shadow-md' />}
            className='h-full w-full object-cover'
          >
            {carouselImages.map((image, index) => (
              <div key={index} className='relative w-full h-full'>
                <img
                  src={image.url}
                  alt={image.title}
                  className='w-full h-full object-cover object-center'
                />
                {/* Gradient overlay for text readability */}
                <div className='absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent'></div>

                {/* Content centered on the slide */}
                <div className='absolute inset-0 flex flex-col items-center justify-center px-6 text-center mt-16 shadow-lg shadow-black/20'>
                  <div className='max-w-5xl mx-auto backdrop-blur-md bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10'>
                    <h1 className='text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight'>
                      {index === 0
                        ? 'Connecting Healthcare, Simplifying Supply Chains'
                        : image.title}
                    </h1>
                    <p className='text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto drop-shadow-md font-light'>
                      {index === 0
                        ? 'The comprehensive platform for medical suppliers, hospitals, and healthcare facilities'
                        : image.description}
                    </p>

                    <div className='flex justify-center space-x-6 mt-4'>
                      <Link
                        to='/auth/login'
                        className='bg-gradient-to-r from-teal-500 to-teal-600 shadow-teal-500/30 text-white px-8 md:px-10 py-3 md:py-4 rounded-xl hover:from-teal-400 hover:to-teal-500 shadow-xl transition-all hover:-translate-y-1 text-lg font-bold'
                      >
                        Get Started
                      </Link>
                      <a
                        href='#features'
                        className='bg-white/10 backdrop-blur-md border-[1px] border-white/30 text-white px-8 md:px-10 py-3 md:py-4 rounded-xl hover:bg-white/20 transition-all hover:-translate-y-1 text-lg font-bold'
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-slate-800 mb-4'>Why Choose CuraConnect?</h2>
            <p className='text-lg text-slate-600 max-w-3xl mx-auto'>
              Powerful features designed specifically for healthcare supply chain management
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='text-center p-6 rounded-lg border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all'
              >
                <div className='flex justify-center mb-4'>{feature.icon}</div>
                <h3 className='text-xl font-semibold text-slate-800 mb-2'>{feature.title}</h3>
                <p className='text-slate-600'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Patients Should Choose Section */}
      <section id='patients' className='py-20 bg-gradient-to-br from-teal-50 to-blue-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-slate-800 mb-4'>
              Why Patients Choose CuraConnect
            </h2>
            <p className='text-lg text-slate-600 max-w-3xl mx-auto'>
              Experience healthcare that puts you first with our patient-centric platform
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {patientBenefits.map((benefit, index) => (
              <div
                key={index}
                className='text-center p-6 rounded-lg bg-white hover:shadow-lg transition-all'
              >
                <div className='flex justify-center mb-4'>{benefit.icon}</div>
                <h3 className='text-xl font-semibold text-slate-800 mb-2'>{benefit.title}</h3>
                <p className='text-slate-600'>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hospitals Should Choose Section */}
      <section id='hospitals' className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-slate-800 mb-4'>
              Why Hospitals Choose CuraConnect
            </h2>
            <p className='text-lg text-slate-600 max-w-3xl mx-auto'>
              Transform your hospital operations with our comprehensive management solutions
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {hospitalBenefits.map((benefit, index) => (
              <div
                key={index}
                className='text-center p-6 rounded-lg border border-slate-200 hover:border-orange-500 hover:shadow-lg transition-all'
              >
                <div className='flex justify-center mb-4'>{benefit.icon}</div>
                <h3 className='text-xl font-semibold text-slate-800 mb-2'>{benefit.title}</h3>
                <p className='text-slate-600'>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Suppliers Should Choose Section */}
      <section id='suppliers' className='py-20 bg-gradient-to-br from-yellow-50 to-orange-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-slate-800 mb-4'>
              Why Suppliers Choose CuraConnect
            </h2>
            <p className='text-lg text-slate-600 max-w-3xl mx-auto'>
              Grow your medical supply business with our powerful B2B healthcare platform
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {supplierBenefits.map((benefit, index) => (
              <div
                key={index}
                className='text-center p-6 rounded-lg bg-white hover:shadow-lg transition-all'
              >
                <div className='flex justify-center mb-4'>{benefit.icon}</div>
                <h3 className='text-xl font-semibold text-slate-800 mb-2'>{benefit.title}</h3>
                <p className='text-slate-600'>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section - Full Screen */}
      <section
        id='testimonials'
        className='relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden'
      >
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className='relative z-10 container mx-auto px-6 py-20'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>What Our Users Say</h2>
            <p className='text-xl text-slate-300 max-w-3xl mx-auto'>
              Trusted by healthcare professionals nationwide
            </p>
            <div className='flex justify-center mt-6 space-x-2'>
              {[...Array(testimonials.length)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'bg-teal-400 w-8'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Full Screen Testimonial Display */}
          <div className='relative max-w-6xl mx-auto'>
            <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-20'>
              {/* Large Profile Image */}
              <div className='flex-shrink-0'>
                <div className='relative'>
                  <div className='w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700'>
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  {/* Decorative Elements */}
                  <div className='absolute -top-4 -right-4 w-24 h-24 bg-teal-500 rounded-full opacity-20 blur-xl'></div>
                  <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-xl'></div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className='flex-1 text-center lg:text-left'>
                <Quote className='w-12 h-12 text-teal-400 mb-6 mx-auto lg:mx-0' />

                <blockquote className='text-2xl lg:text-3xl font-light text-white mb-8 leading-relaxed'>
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                <div className='flex flex-col sm:flex-row items-center justify-between gap-6'>
                  <div>
                    <h4 className='text-2xl font-bold text-white mb-2'>
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className='text-lg text-teal-400'>{testimonials[currentTestimonial].role}</p>
                  </div>

                  {/* Rating */}
                  <div className='flex items-center gap-1'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < testimonials[currentTestimonial].rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className='flex justify-center mt-12 space-x-4'>
              <button
                onClick={() =>
                  setCurrentTestimonial(
                    (prev) => (prev - 1 + testimonials.length) % testimonials.length,
                  )
                }
                className='p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-colors'
                aria-label='Previous testimonial'
              >
                <ChevronLeft className='w-6 h-6' />
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className='p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-colors'
                aria-label='Next testimonial'
              >
                <ChevronRight className='w-6 h-6' />
              </button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className='absolute top-20 left-10 w-20 h-20 bg-teal-500 rounded-full opacity-10 blur-2xl animate-pulse'></div>
          <div className='absolute bottom-20 right-10 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-2xl animate-pulse'></div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className='py-20 bg-gradient-to-r from-teal-600 to-blue-600'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='mb-8'>
              <Mail className='w-16 h-16 text-white mx-auto mb-4' />
              <h2 className='text-4xl font-bold text-white mb-4'>
                Stay Connected with CuraConnect
              </h2>
              <p className='text-xl text-white/90 max-w-2xl mx-auto'>
                Get the latest updates on healthcare innovations, platform features, and industry
                insights delivered to your inbox
              </p>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'
            >
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email address'
                className='flex-1 px-6 py-3 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50'
                required
              />
              <button
                type='submit'
                className='px-8 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2'
              >
                <Send className='w-5 h-5' />
                Subscribe
              </button>
            </form>

            {subscribed && (
              <div className='mt-6 p-4 bg-white/20 rounded-lg backdrop-blur-sm'>
                <p className='text-white font-medium'>
                  ✓ Thank you for subscribing! Check your email for confirmation.
                </p>
              </div>
            )}

            <p className='text-white/70 text-sm mt-6'>
              By subscribing, you agree to receive our newsletter. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' className='py-20 bg-teal-600'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-white mb-4'>Get In Touch</h2>
            <p className='text-xl text-white/90 max-w-2xl mx-auto'>
              Have questions? We're here to help you succeed
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
            <div className='text-center'>
              <Mail className='w-8 h-8 text-white mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-white mb-2'>Email</h3>
              <p className='text-white/90'>support@curaconnect.com</p>
            </div>
            <div className='text-center'>
              <Phone className='w-8 h-8 text-white mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-white mb-2'>Phone</h3>
              <p className='text-white/90'>+1 (800) 123-4567</p>
            </div>
            <div className='text-center'>
              <MapPin className='w-8 h-8 text-white mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-white mb-2'>Address</h3>
              <p className='text-white/90'>123 Healthcare Ave, Medical City, MC 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-slate-900 text-white py-12'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <h4 className='text-lg font-semibold mb-4'>CuraConnect</h4>
              <p className='text-slate-400 mb-4'>
                Your trusted partner for medical supply chain management
              </p>
              <div className='flex space-x-4'>
                <a href='#' className='text-slate-400 hover:text-white transition-colors'>
                  <Facebook className='w-5 h-5' />
                </a>
                <a href='#' className='text-slate-400 hover:text-white transition-colors'>
                  <Twitter className='w-5 h-5' />
                </a>
                <a href='#' className='text-slate-400 hover:text-white transition-colors'>
                  <Linkedin className='w-5 h-5' />
                </a>
                <a href='#' className='text-slate-400 hover:text-white transition-colors'>
                  <Instagram className='w-5 h-5' />
                </a>
              </div>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
              <ul className='space-y-2'>
                <li>
                  <a href='#features' className='text-slate-400 hover:text-white transition-colors'>
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='#testimonials'
                    className='text-slate-400 hover:text-white transition-colors'
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <Link
                    to='/auth/login'
                    className='text-slate-400 hover:text-white transition-colors'
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white transition-colors'>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Resources</h4>
              <ul className='space-y-2'>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white transition-colors'>
                    Documentation
                  </a>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white transition-colors'>
                    API Access
                  </a>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white transition-colors'>
                    Support Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Legal</h4>
              <ul className='space-y-2'>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white transition-colors'>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white transition-colors'>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white transition-colors'>
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-t border-slate-800 mt-8 pt-8 text-center'>
            <p className='text-slate-400'>2024 CuraConnect. All rights reserved.</p>
            <p className='text-slate-400 text-sm mt-2'>Built with for healthcare professionals</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default WelcomePage
