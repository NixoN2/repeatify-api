
module.exports = {
    post:{
        tags:['Collection'],
        description: "Create Collection",
        operationId: "createCollection",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        type:'object',
                        properties:{
                            userId: {
                                type: "number",
                                example: 1
                            },
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
            '201':{
                description: "User created successfully",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Collection"
                        }
                    }
                }
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}