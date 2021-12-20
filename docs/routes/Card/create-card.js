
module.exports = {
    post:{
        tags:['Card'],
        description: "Create Card",
        operationId: "createCard",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        type:'object',
                        properties:{
                            collectionId: {
                                type: "number",
                                example: 1
                            },
                            material:{
                                type:'string',
                                example:"text"
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
                description: "Card created successfully",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Card"
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