module.exports = {
    put:{
        tags:['Card'],
        description: "Update card",
        operationId: "updateCard",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    type: "string",
                    example: "1"

                },
                required:true,
                description: "Id of card to be updated"
            }
        ],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        type:'object',
                        properties: {
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
            '200':{
                description:"Updated card",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Card"
                        }
                    }
                }
            },
            '500':{
                description: "Server error"
            }

        }
    }
}