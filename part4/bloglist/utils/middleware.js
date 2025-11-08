const handleUnknownEndpoint = (req, res) => {
    return res.status(404).json({
        error: "Unknown endpoint!"
    })
}

const handleError = (err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.content?.message?.data || err.message || err
    })

    next()
}

export default {
    handleUnknownEndpoint,
    handleError
}