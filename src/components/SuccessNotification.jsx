import '../styles/SuccessNotification.scss';

function SuccessNotification({setIsComplete}) {
  return (
    <div className="success-wrapper">
      <h1>Success!</h1>
      <p>Check your inbox to verify your account before logging in.</p>
      <span className="notice">Did you need to go back?</span>
      <button onClick={()=>setIsComplete(false)}>Go back</button>
    </div>
  )
}

export default SuccessNotification;