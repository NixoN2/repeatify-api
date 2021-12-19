
module.exports = {
    post:{
        tags:['Editor'],
        description: "Create Editor",
        operationId: "createEditor",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/Editor'
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