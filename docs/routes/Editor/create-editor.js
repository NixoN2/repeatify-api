
module.exports = {
    post:{
        tags:['Editor'],
        description: "Create Editor",
        operationId: "createEditor",
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
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        type:'object',
                        properties:{
                            email: {
                                type: "string",
                                example: "string@string.com"
                            }
                        }
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Editor created successfully",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/User"
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