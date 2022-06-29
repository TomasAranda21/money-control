import Operations from "../models/operationsModel.js"
import errors from "../helpers/errors.js"


const addOperations = async (req, res) => {

    const { amount, concept, category, type, data } = req.body

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

}


const getOperations = async (req, res) => {

    const operations = await Operations.find().where('usersBudget').equals(req.usersBudget)
    
    if(!operations) {

       return errors(res, 403, 'Not found')

    }

    const operationsFilter = operations.filter(oper => oper.user.toString() === req.usersBudget._id.toString())

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

    const {concept, category, amount, date} = req.body
    
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
    deleteOperation 
 

}