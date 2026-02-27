import { Rating as FlowbiteRating } from 'flowbite-react'

const Rating = ({ score, max = 5, showText = false }) => {
  const fullStars = Math.floor(score)
  const starsArray = Array(max).fill(0)

  return (
    <div className='flex items-center'>
      <FlowbiteRating>
        {starsArray.map((_, index) => (
          <FlowbiteRating.Star key={index} filled={index < fullStars} className='text-amber-400' />
        ))}
      </FlowbiteRating>
      {showText && (
        <span className='ml-2 text-sm font-medium text-slate-600'>
          {score.toFixed(1)} out of {max}
        </span>
      )}
    </div>
  )
}

export default Rating
