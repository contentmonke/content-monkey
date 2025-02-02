import monkey from '../assets/monkey.svg'

export const Loading = () => {
  return (
    <div>
      <h1>Loading....</h1>
      <br />
      <img width={200} src={monkey} alt='Should be a monkey here' />
    </div>
  )
}

export const SmallLoading = () => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <img width={80} src={monkey} alt='Should be a monkey here' />
        <h5>Loading....</h5>
      </div>
    </div>
  )
}
