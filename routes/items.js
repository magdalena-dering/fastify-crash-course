const {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
} = require("../controllers/items");

const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};

// Options for get all items
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  handler: getItems,
};

const getItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: getItem,
};

const postItemOpts = {
  schema: {
    body: {
      type: "object",
      // It's mean that the property "name" is required. If the property is missed, the 404 error occurs.
      // "statusCode": 400,
      // "error": "Bad Request",
      // "message": "body should have required property 'name'"
      required: ["name"],
      properties: {
        name: {
          type: "string",
        },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: addItem,
};

const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: deleteItem,
};

const updateItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
        },
      },
    },
    response: {
      200: Item,
    },
  },
  handler: updateItem,
};

function itemsRoutes(fastify, options, done) {
  // Get all items
  fastify.get("/items", getItemsOpts);

  // Get single item
  fastify.get("/items/:id", getItemOpts);

  // Add items
  fastify.post("/items", postItemOpts);

  // Delete item
  fastify.delete("/items/:id", deleteItemOpts);

  // Update item
  fastify.put("/items/:id", updateItemOpts);

  done();
}

module.exports = itemsRoutes;
