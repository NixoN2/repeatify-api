module.exports = {
    get:{
        tags:['User'],
        description: "Get a user",
        operationId: "getUser",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    type: "string",
                    example: "1"
                },
                required:true,
                description: "A single user id"
            }
        ],
        responses:{
            '200':{
                description:"Getting user",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/User"
                        }
                    }
                }
            },
            '400': {
                description: "User doesn't exist"
            },
            '500': {
                description: "Server error"
            }
        }
    }
}