
module.exports = {
    post:{
        tags:['Auth'],
        description: "Login",
        operationId: "login",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        type: "object",
                        properties: {
                            email: {
                                type: "string",
                                example: "string@string.com"
                            },
                            password: {
                                type: "string",
                                example: "string"
                            }
                        }
                    }
                }
            }
        },
        responses:{
            '200':{
                description: "User information",
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