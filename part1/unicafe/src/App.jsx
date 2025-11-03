import { useState } from 'react'
import GiveFeedback from './Components/GiveFeedback'
import Statistics from './Components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // handlers
  const handleGood = () => setGood(oldGood => oldGood + 1)
  const handleNeutral = () => setNeutral(oldNeutral => oldNeutral + 1)
  const handleBad = () => setBad(oldBad => oldBad + 1)

  return (
    <div>
      <GiveFeedback 
        onGood={handleGood}
        onNeutral={handleNeutral}
        onBad={handleBad}
      />
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App