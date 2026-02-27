import { Tooltip as FlowbiteTooltip } from 'flowbite-react'

const Tooltip = ({ content, children, placement = 'top', className = '' }) => {
  return (
    <FlowbiteTooltip
      content={content}
      placement={placement}
      animation='duration-300'
      className={className}
    >
      {children}
    </FlowbiteTooltip>
  )
}

export default Tooltip
