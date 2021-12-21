module.exports = {
    get:{
        tags: ['User'],

        description: "Get users",
        operationId: 'getUsers',
        parameters:[],
        responses:{
            '200':{
                description:"Getting users",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/User'
                        }
                    }
                }
            }
        }
    }
}