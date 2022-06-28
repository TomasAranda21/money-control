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



export { 
    
    addOperations,
    getOperations,
 

}