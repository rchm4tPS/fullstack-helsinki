import Button from "./Button"

export default function GiveFeedback ({
    onGood, goodLabel, 
    onNeutral, neutralLabel,
    onBad, badLabel
}) 
{
    return (
      <>
        <h1>give feedback</h1>
        <Button onClicked={onGood} text={goodLabel}></Button>
        <Button onClicked={onNeutral} text={neutralLabel}></Button>
        <Button onClicked={onBad} text={badLabel}></Button>
      </>
    )
}