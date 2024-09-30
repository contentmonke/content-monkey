import monkey from '../assets/monkey.svg'

export const UhOh = () => {
  return (
    <div>
      <img width={80} src={monkey} alt='Should be a monkey here' />
      <h5>Uh Oh! Something went wrong</h5>
    </div>
  )
}