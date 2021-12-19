module.exports = {
    delete:{
        tags: ['User'],
        description: "Deleting a user",
        operationId: "deleteUser",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    type: "string",
                    example: "1"
                },
                required:true,
                description: "Deleting user"
            }
        ],
        responses:{
            '200':{
                description:"User was deleted"
            },
            '400': {
                description: "User doesn't exist"
            },
            '500':{
                description:"Server error"
            }
        }
    }
}
