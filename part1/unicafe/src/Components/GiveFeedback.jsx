export default function GiveFeedback ({
    onGood, onNeutral, onBad
}) 
{
    return (
      <>
        <h1>give feedback</h1>
        <button onClick={onGood}>good</button>
        <button onClick={onNeutral}>neutral</button>
        <button onClick={onBad}>bad</button>
      </>
    )
}