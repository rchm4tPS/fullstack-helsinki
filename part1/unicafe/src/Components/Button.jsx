export default function Button({
    onClicked, text
})
{
    return (
        <button onClick={onClicked}>{text}</button>
    )
}