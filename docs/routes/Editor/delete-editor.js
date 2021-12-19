module.exports = {
    delete:{
        tags: ['Editor'],
        description: "Deleting an Editor",
        operationId: "deleteEditor",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    type: "string",
                    example: "1"
                },
                required:true,
                description: "Deleting editor"
            }
        ],
        responses:{
            '200':{
                description:"Editor was deleted"
            },
            '400': {
                description: "This user already editing this collection"
            },
            '500':{
                description:"Server error"
            }
        }
    }
}
