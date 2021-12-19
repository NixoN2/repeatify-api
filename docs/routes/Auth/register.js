
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
                        $ref:'#/components/schemas/User'
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