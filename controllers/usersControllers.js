import Users from "../models/usersModel.js"


const registerUsers = async ( req, res) => {

    const { email } = req.body

    const users = await Users.findOne({email})

    if(users){

        const error = new Error("the email already exists")

        return res.status(400).json({msg: error.message})
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