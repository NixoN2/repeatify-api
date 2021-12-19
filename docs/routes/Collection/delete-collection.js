module.exports = {
    delete:{
        tags: ['Collection'],
        description: "Deleting a collection",
        operationId: "deleteCollection",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    type: "string",
                    example: "1"
                },
                required:true,
                description: "Deleting collection"
            }
        ],
        responses:{
            '200':{
                description:"Collection was deleted"
            },
            '400': {
                description: "Collection doesn't exist"
            },
            '500':{
                description:"Server error"
            }
        }
    }
}
