module.exports = {
    put:{
        tags:['User'],
        description: "Update user",
        operationId: "updateUser",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    type: "string",
                    example: "1"
                },
                required:true,
                description: "Id of user to be updated"
            }
        ],
        responses:{
            '200':{
                description:"Updated User",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/User"
                        }
                    }
                }
            },
            '400':{
                description: "User doesn't exist"
            },
            '500':{
                description: "Server error"
            }

        }
    }
}