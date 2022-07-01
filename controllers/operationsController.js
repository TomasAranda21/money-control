import Operations from "../models/operationsModel.js"
import errors from "../helpers/errors.js"
import Users from "../models/usersModel.js"
import { updateBudget, updateBudgetWhenDelete } from "../helpers/updateBudget.js"


const addOperations = async (req, res) => {

    const { amount, concept, category, type, data, id } = req.body

    const amountString = amount.toString()

    const objOper = {amount: amountString ,concept, category, type, data}

    const operations = new Operations(objOper)


    operations.user = req.usersBudget._id


    try {
        
        const oparationSave = await operations.save()

        res.json(oparationSave)

    } catch (error) {

        
        console.log(error)
    }

    const user = await Users.findById(id)

    if(!user){

        return errors(res, 400, "error")
    }

    await updateBudget(operations, user , amount)


}


const getOperations = async (req, res) => {

    const operations = await Operations.find().where('usersBudget').equals(req.usersBudget)
    
    if(!operations) {

       return errors(res, 403, 'Not found')

    }

    const operationsFilter = operations.filter(oper => oper?.user?.toString() === req.usersBudget?._id.toString())

    res.json(operationsFilter)
}



const getOneOperation = async (req, res) => {

    const {id} = req.params

    try {
        
        const operation = await Operations.findById(id)

        res.json(operation)


    } catch (error) {

        return errors(res, 403, 'Not found')

    }


}


const updateOperation = async (req, res) => {

    const {id} = req.params

    const {concept, category, amount, date, _id} = req.body
    
    try {
        
        const operation = await Operations.findById(id)
        
        operation.amount = amount || operation.amount
        operation.date = date || operation.date
        operation.concept = concept || operation.concept
        operation.category = category || operation.category


        try {
            
            const updatedOperation = await operation.save()

            res.json(updatedOperation)
                
            
        } catch (error) {

            console.log(error)
            
        }

        const user = await Users.findById(_id)

        if(!user){
    
            return errors(res, 400, "error")
        }
    
        await updateBudget(operation, user , amount)

    
        
    } catch (error) {
        
        return errors(res, 403, 'Not found')

    }
}



const changeBudgetWhenDeleted = async (req, res) => {

    const {id} = req.params
    const { _id } = req.body

    try {

        const operation = await Operations.findById(id)

        const user = await Users.findById(_id)

        if(!user){
    
            return errors(res, 400, "error")
        }
    
        await updateBudgetWhenDelete(operation, user , operation.amount)

        
    } catch (error) {
    
        return errors(res, 403, 'Not found')

    }
}





const deleteOperation = async (req, res) => {

    const {id} = req.params

    try {

        const operation = await Operations.findById(id)

        try {
            
            await operation.deleteOne()
    
            res.json({msg: 'Deleted operation'})
    
        } catch (error) {
            
            console.log(error)

        }

    } catch (error) {
    
        return errors(res, 403, 'Not found')

    }
}







export { 
    
    addOperations,
    getOperations,
    getOneOperation, 
    updateOperation, 
    changeBudgetWhenDeleted,
    deleteOperation
 

}