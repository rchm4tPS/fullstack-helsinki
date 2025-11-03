import StatisticLine from "./StatisticLine"

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
    const positivePercentage = good / total * 100 + "%"

    return (
        <>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <tr>
                        <StatisticLine text="good" value={good} />
                    </tr>
                    <tr>
                        <StatisticLine text="neutral" value={neutral} />
                    </tr>
                    <tr>
                        <StatisticLine text="bad" value={bad} />
                    </tr>
                    <tr>
                        <StatisticLine text="all" value={total} />
                    </tr>
                    <tr>
                        <StatisticLine text="average" value={averageScore || 0} />
                    </tr>
                    <tr>
                        <StatisticLine text="positive" value={positivePercentage || "0 %"} />
                    </tr>
                </tbody>
            </table>
        </>
    )
}