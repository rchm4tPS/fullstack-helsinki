export default function Total({parts}) {
    return (
        <b>
            total of {
                parts.reduce((acc, val) => acc + val.exercises, 0)
            } exercises
        </b>
    )
}