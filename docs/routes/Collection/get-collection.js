module.exports = {
    get:{
        tags:['Collection'],
        description: "Get a collection",
        operationId: "getCollection",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    type: "string",
                    example: "1"
                },
                required:true,
                description: "A single collection id"
            }
        ],
        responses:{
            '200':{
                description:"Getting collection",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Collection"
                        }
                    }
                }
            },
            '400': {
                description: "Collection doesn't exist"
            },
            '500': {
                description: "Server error"
            }
        }
    }
}