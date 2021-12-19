
module.exports = {
    post:{
        tags:['Card'],
        description: "Create Card",
        operationId: "createCard",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/Card'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Card created successfully",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Card"
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