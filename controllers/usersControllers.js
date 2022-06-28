import Users from "../models/usersModel.js"
import errors from "../helpers/errors.js"
import createJWT from "../helpers/createJWT.js"


const registerUsers = async ( req, res) => {

    const { email } = req.body

    const users = await Users.findOne({email})

    if(users){

        return errors(res, 400, "the email already exists")

    }

    try {
        
        const users = new Users(req.body)

        const userSave = await users.save()

        return userSave
        

    } catch (error) {
     
        console.log(error)
    }
}



const loginUser = async(req, res) => {

    const { email, password } = req.body

    const user = await Users.findOne({ email})

    if(!user){

        return errors(res, 400, "the email dont exist")
    }

    if(await user.checkPassword(password)){

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: createJWT(user._id)
        })
    }

    else{

        return errors(res, 403, "the password or username is incorrect")

    }

}



const profileUser = (req, res) => {

    const { usersBudget } = req

    res.json(usersBudget)
}




export {
    registerUsers,
    loginUser,
    profileUser,


}