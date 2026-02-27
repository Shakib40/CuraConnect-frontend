import React from 'react'
import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20',
  secondary: 'bg-secondary hover:bg-secondary-hover text-white shadow-lg shadow-secondary/20',
  accent: 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20',
  outline:
    'bg-transparent border border-border text-text-muted hover:bg-surface-muted hover:text-text-main',
  ghost: 'bg-transparent text-text-muted hover:bg-surface-muted hover:text-text-main',
  danger: 'bg-error hover:bg-red-600 text-white shadow-lg shadow-error/20',
  success: 'bg-success hover:bg-green-600 text-white shadow-lg shadow-success/20',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
  icon: 'p-2',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const variantClasses = variants[variant] || variants.primary
  const sizeClasses = sizes[size] || sizes.md

  const baseClasses =
    'inline-flex items-center justify-center font-bold tracking-tight rounded-xl transition-all active:scale-95 disabled:opacity-60 disabled:pointer-events-none disabled:scale-100'

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={`w-4 h-4 ${children ? 'ml-2' : ''}`} />
      )}
    </button>
  )
}

export default Button
