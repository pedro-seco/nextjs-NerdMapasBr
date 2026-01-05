// src/lib/openapi.ts
export const openapiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Maps API",
    version: "1.0.0",
  },
  paths: {
    "/api/maps": {
      get: {
        summary: "List maps",
        tags: ['Maps'],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/MapWithPOIsResponse" },
                },
              },
            },
          },
          '500': { 
            description: "Something went wrong.",
          }
        },
      },
      post: {
        summary: 'Create a new map',
        tags: ['Maps'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateMapRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Map created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MapResponse' }
              }
            }
          },
          '400': { description: 'Bad Request - Invalid input data' },
          '500': { description: "Something went wrong." }
        }
      },
      delete: {
        summary: 'Delete all maps',
        tags: ['Maps'],
        responses: {
          '204': { description: 'No Content - All maps deleted successfully' },
          '500': { description: 'Internal Server Error' }
        }
      }
    },

    "/api/maps/{mapId}": {
      parameters: [
        {
          name: 'mapId',
          in: 'path',
          required: true,
          description: 'The numeric ID of the map',
          schema: { type: 'integer', format: 'int32' }
        }],
      get: {
        summary: 'Get map details',
        tags: ['Maps'],
        responses: {
          '200': {
            description: 'Map details retrieved successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MapWithPOIsResponse' }
              }
            }
          },
          '400': {description: 'Bad Request - Invalid ID or Body'},
          '404': { description: 'Map not found' },
          '500': { description: "Something went wrong." }
        }
      },
      delete: {
        summary: 'Delete a specific map',
        tags: ['Maps'],
        responses: {
          '204': { description: 'No Content - Map deleted successfully' },
          '400': {description: 'Bad Request - Invalid ID or Body'},
          '404': { description: 'Record not found' },
          '500': { description: 'Internal Server Error' }
        }
      }
    },

    "/api/maps/{mapId}/points": {
      parameters: [
        {
          name: 'mapId',
          in: 'path',
          required: true,
          description: 'The numeric ID of the map',
          schema: { type: 'integer', format: 'int32' }
        }],
      post: {
        summary: 'Create a POI',
        tags: ['POIs'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreatePOIRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'POI created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PointResponse'
                }
              }
            }
          },
          '400': {description: 'Bad Request - Invalid ID or Body'},
          '404': { description: 'Record not found' },
          '500': { description: 'Internal Server Error' }
        }
      },
      delete: {
        summary: 'Delete all POIs on map',
        tags: ['POIs'],
        responses: {
          '204': {
            description: 'No Content - POIs deleted successfully'
          },
          '400': {description: 'Bad Request - Invalid ID or Body'},
          '500': { description: 'Internal Server Error' }
        }
      }
    },

    "/api/points/{pointId}": {
      parameters: [
        {
          name: 'pointId',
          in: 'path',
          required: true,
          description: 'The numeric ID of the point',
          schema: { type: 'integer', format: 'int32' }
        }
      ],
      get: {
        summary: 'Get Point details',
        tags: ['POIs'],
        responses: {
          '200': {
            description: 'Point details retrieved successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PointResponse' }
              }
            }
          },
          '400': {description: 'Bad Request - Invalid ID or Body'},
          '404': { description: 'Point not found' },
          '500': { description: "Something went wrong." }
        }
      },
      put: {
        summary: 'Update a POI',
        tags: ['POIs'],
        description: 'Updates the name or coordinates of a specific Point of Interest.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/EditPOIRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'POI updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PointResponse'
                }
              }
            }
          },
          '400': {description: 'Bad Request - Invalid ID or Body'},
          '404': { description: 'Record not found' },
          '500': { description: 'Internal Server Error' }
        }
      },
      delete: {
        summary: 'Delete a POI',
        tags: ['POIs'],
        description: 'Deletes a single Point of Interest by its ID.',
        responses: {
          '204': {description: 'No Content - POI deleted successfully'},
          '400': {description: 'Bad Request - Invalid ID or Body'},
          '404': { description: 'Record not found' },
          '500': { description: 'Internal Server Error' }
        }
      }
    },
  },

  components: {
    schemas: {
      Borders:{
        type: 'object',
        description: 'Map boundaries defined by Southwest and Northeast coordinates',
        required: ['sw', 'ne'],
        properties: {
          sw: {
            type: 'object',
            required: ['latitude', 'longitude'],
            properties: {
              latitude: { type: 'number', format: 'float' },
              longitude: { type: 'number', format: 'float' }
            }
          },
          ne: {
            type: 'object',
            required: ['latitude', 'longitude'],
            properties: {
              latitude: { type: 'number', format: 'float', example: -22.7460878 },
              longitude: { type: 'number', format: 'float', example: -43.0990811 }
            }
          }
        }
      },

      CreateMapRequest: {
        type: 'object',
        required: ['name', 'latitude', 'longitude', 'borders'],
        properties: {
          name: { type: 'string' },
          pois: {
            type: 'array',
            description: 'List of Points of Interest',
            items: { type: 'object', additionalProperties: false }
          },
          latitude: { type: 'number', format: 'float' },
          longitude: { type: 'number', format: 'float' },
          borders: {
            type: 'object',
            $ref: '#/components/schemas/Borders',
          }
        }
      },

      CreatePOIRequest: {
        type: 'object',
        required: ['name', 'latitude', 'longitude'],
        properties: {
          name: {
            type: 'string'
          },
          latitude: {
            type: 'number',
            format: 'float',
            example: 40.6892
          },
          longitude: {
            type: 'number',
            format: 'float',
            example: -74.0445
          }
        }
      },

      EditPOIRequest: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          latitude: {
            type: 'number',
            format: 'float'
          },
          longitude: {
            type: 'number',
            format: 'float'
          }
        }
      },

      MapResponse: {
        type: 'object',
        properties: {
          id: { type: 'integer', format: 'int32' },
          name: { type: 'string' },
          latitude: { type: 'number', format: 'float' },
          longitude: { type: 'number', format: 'float' },
          borders: { type: 'object', $ref: '#/components/schemas/Borders'},
          createdAt: { type: 'string', format: 'date-time' }
        }
      },

      MapWithPOIsResponse: {
        type: 'object',
        required: ["id", "name", "latitude", "longitude", "borders", "pois", "createdAt"],
        properties: {
          id: { type: 'integer', format: 'int32' },
          name: { type: 'string' },
          latitude: { type: 'number', format: 'float' },
          longitude: { type: 'number', format: 'float' },
          borders: { 
            type: 'object',
            $ref: '#/components/schemas/Borders',
           },
          pois: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/PointResponse'
            }
          },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },

      PointResponse: {
        type: "object",
        required: ["id", "name", "latitude", "longitude", "mapId"],
        properties: {
          id: { type: "integer", format: "int32" },
          name: { type: "string" },
          latitude: { type: "number", format: "double" },
          longitude: { type: "number", format: "double" },
          mapId: { type: "integer", format: "int32" },
        },
      }
    },
  },
} as const;