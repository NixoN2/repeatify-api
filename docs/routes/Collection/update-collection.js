module.exports = {
    put:{
        tags:['Collection'],
        description: "Update collection",
        operationId: "updateCollection",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    type: "string",
                    example: "1"
                },
                required:true,
                description: "Id of collection to be updated"
            }
        ],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        type:'object',
                        properties: {
                            private:{
                                type:'boolean',
                                example:true
                            },
                            name:{
                                type:"string",
                                example: "string"
                            }
                        }
                    }
                }
            }
        },
        responses:{
            '200':{
                description:"Updated collection",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Collection"
                        }
                    }
                }
            },
            '400':{
                description: "Collection doesn't exist"
            },
            '500':{
                description: "Server error"
            }

        }
    }
}