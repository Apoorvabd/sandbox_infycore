import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
    openapi: "3.0.0",

    info: {
        title: "Sandbox Backend",
        version: "1.0.0",
        description: "Fintech Assignment API"
    },

    servers: [
        {
            url: "http://localhost:4000/api"
        }
    ],

    components: {
        schemas: {

            ApiResponse: {
                type: "object",
                properties: {
                    statusCode: {
                        type: "integer",
                        example: 200
                    },
                    data: {
                        type: "object"
                    },
                    message: {
                        type: "string",
                        example: "Success"
                    },
                    success: {
                        type: "boolean",
                        example: true
                    },
                    errors: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    }
                }
            },

            Rule: {
                type: "object",
                properties: {
                    keyword: {
                        type: "string",
                        example: "amazon"
                    },
                    clean_merchant_name: {
                        type: "string",
                        example: "Amazon"
                    },
                    target_category: {
                        type: "string",
                        example: "Shopping"
                    }
                }
            }
        }
    }
},

    apis: [
        "./src/modules/**/*.js"
    ]
};

const swaggerSpec = swaggerJsdoc(options);

export {
    swaggerUi,
    swaggerSpec
};