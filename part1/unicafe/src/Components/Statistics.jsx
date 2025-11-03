export default function Statistics({
    good, neutral, bad
})
{
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    const GOOD_SCORE = 1
    const NEUTRAL_SCORE = 0
    const BAD_SCORE = -1

    const total = good + neutral + bad
    const averageScore = ((good * GOOD_SCORE)
                       + (neutral * NEUTRAL_SCORE)
                       + (bad * BAD_SCORE)) / total
    const positivePercentage = good / total * 100

    return (
        <>
            <h2>statistics</h2>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {total}</p>
            <p>average {averageScore || 0}</p>
            <p>positive {positivePercentage || 0}%</p>
        </>
    )
}