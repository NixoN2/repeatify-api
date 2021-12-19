module.exports = {
    get:{
        tags: ['Collection'],
        description: "Get collections",
        operationId: 'getCollections',
        parameters:[],
        responses:{
            '200':{
                description:"Getting collections",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Collection'
                        }
                    }
                }
            }
        }
    }
}