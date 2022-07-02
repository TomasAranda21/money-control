import Users from "../models/usersModel.js"
import errors from "../helpers/errors.js"
import createJWT from "../helpers/createJWT.js"
import createToken from "../helpers/createToken.js"
import emailForgotPass from "../helpers/emailForgotPass.js"


const registerUsers = async ( req, res) => {

    const { email } = req.body

    const users = await Users.findOne({email})

    if(users){

        return errors(res, 400, "the email already exists")

    }

    try {
        
        const users = new Users(req.body)

        const userSave = await users.save()

        return res.status(200).json({msg: "user"})
        

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

        return errors(res, 403, "the password or email is incorrect")

    }

}



const getProfileUser = (req, res) => {

    const { usersBudget } = req

    res.json(usersBudget)
}




const updateBudget = async (req, res) => {

    const { budget } = req.body

    const user = await Users.findById(req.params.id)

    if(!user){

        return errors(res, 400, "error")
    }

    const budgetString = budget.toString()

    try {

        user.budget = budgetString
        const updateBudgetUser = await user.save()

        res.json(updateBudgetUser)
        
    } catch (error) {

        console.log(error)
        
    }
}



// recover password
const forgotPassword = async (req, res) => {

    const { email } = req.body

    const userExists = await Users.findOne({email: email})

    if(!userExists){
        const error = new Error("The email has not been registered")

        return res.status(403).json({msg: error.message})
    }

    try {

        userExists.token = createToken()

        console.log(userExists.token)

        await userExists.save() 

        emailForgotPass({
            email,
            name: userExists.name,
            token: userExists.token
      
        })

        res.json({msg: "We have sent an email with the instructions"})

    } catch (error) {
        console.log(error)
    }

}

const checkToken = async (req, res) => {

    const { token } = req.params

    const check_token = await Users.findOne({token})

    if (!check_token){
        const error = new Error ('invalid token')
        return res.status(400).json({msg: error.message})

    }else{

        res.json({msg: "Valid token user exists"})
    }

}

const newPassword = async (req, res) => {

  const { token } = req.params 
    const { password } = req.body 

    const userExists = await Users.findOne({token})

    if(!userExists){
        const error = new Error ('There was a mistake')
        return res.status(400).json({msg: error.message})
    }

    try {
        userExists.token = null
        userExists.password = password
        await userExists.save()

        res.json({msg: 'Your password has been reset successfully'})
        
    } catch (error) {
        console.log(error)
    }
}



export {
    registerUsers,
    loginUser,
    getProfileUser,
    updateBudget,
    forgotPassword, 
    checkToken, 
    newPassword


}