import Users from "../models/usersModel.js"
import errors from "../helpers/errors.js"


const registerUsers = async ( req, res) => {

    const { email } = req.body

    const users = await Users.findOne({email})

    if(users){

        return errors(res, "the email already exists")
        
    }

    try {
        
        const users = new Users(req.body)

        const userSave = await users.save()

        return userSave
        

    } catch (error) {
     
        
        console.log(error)

    }

}





export {
    registerUsers,


}