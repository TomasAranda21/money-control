const errors = (res, msg) => {

    const error = new Error(msg)

    return res.status(400).json({msg: error.message})

}


export default errors