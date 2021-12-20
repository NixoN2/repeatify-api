
module.exports = {
    post:{
        tags:['Auth'],
        description: "Register User",
        operationId: "register",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        type:'object',
                        properties: {
                            first_name: {
                                type: "string",
                                example: "string"
                            },
                            last_name: {
                                type: "string",
                                example: "string"
                            },
                            email: {
                                type: "string",
                                example: "string@string.com"
                            },
                            password: {
                                type: "string",
                                example: "string"
                            },
                            animal: {
                                type: "string",
                                example: "string"
                            },
                            color: {
                                type: "string",
                                example: "string"
                            },
                            role: {
                                type: "string",
                                example: "string"
                            }
                        }
                    }
                }
            }
        },
        responses:{
            '201': {
                description: "User created successfully",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/User"
                        }
                    }
                }
            },
            '400': {
                description: "wrong data format"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}