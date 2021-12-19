module.exports = {
    components:{
        schemas:{
            User:{
                type:'object',
                properties: {
                    id: {
                        type: "number",
                        example: 1
                    },
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
            },
            Collection:{
                type:'object',
                properties:{
                    id:{
                        type:'number',
                        example:1
                    },
                    userId: {
                        type: "number",
                        example: 1
                    },
                    private:{
                        type:'boolean',
                        example:true
                    },
                    name:{
                        type:"string",
                        example: "string"
                    }
                }
            },
            Card:{
                type:'object',
                properties:{
                    id:{
                        type:'number',
                        example:1
                    },
                    collectionId: {
                        type: "number",
                        example: 1
                    },
                    material:{
                        type:'string',
                        example:"text"
                    },
                    name:{
                        type:"string",
                        example: "string"
                    }
                }
            },
            Editor:{
                type:'object',
                properties:{
                    id:{
                        type:'number',
                        example:1
                    },
                    userId: {
                        type: "number",
                        example: 1
                    },
                    collectionId: {
                        type: "number",
                        example: 1
                    }
                }
            }
        }
    }
}