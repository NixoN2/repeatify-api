module.exports = {
    delete:{
        tags: ['Card'],
        description: "Deleting a card",
        operationId: "deleteCard",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    type: "string",
                    example: "1"
                },
                required:true,
                description: "Deleting card"
            }
        ],
        responses:{
            '200':{
                description:"Card was deleted"
            },
            '500':{
                description:"Server error"
            }
        }
    }
}
