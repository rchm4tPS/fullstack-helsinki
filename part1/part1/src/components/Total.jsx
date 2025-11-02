export default function Total({parts}) {
    return (
        <p>
            Number of exercises {
                parts.reduce((acc, val) => acc + val.exercises, 0)
            }
        </p>
    )
}