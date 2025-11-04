const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else {
      const notificationClassName = new String(message).toLowerCase().includes("failed")
        ? 'error'
        : 'success'
    
      return (
        <div className={notificationClassName}>
          {message}
        </div>
      )
  }

}

export default Notification