const Anecdote = ({
    title,
    anecdoteText, voteCounter,
    onNextAnecdoteClick, onVoteClick
}) => 
(
    <div>
        <h1>{title}</h1>
        <p>{anecdoteText}</p>
        <p>has {voteCounter} votes</p>

        {(onNextAnecdoteClick && onVoteClick) 
            ? (
                <>
                <button type="button" onClick={onNextAnecdoteClick}>
                    next anecdote
                </button>
                <button type="button" onClick={onVoteClick}>
                    vote
                </button>
                </>
              )
            : null
        }
    </div>
)

export default Anecdote