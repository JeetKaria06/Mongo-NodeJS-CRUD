var express = require('express');
const ModelController =  require('../controllers/modelController');

var router = express.Router();

/**
 * @swagger
 * /api/model/create:
 *   post:
 *     summary: creates a new model inside a project
 *     tags: 
 *          - Models
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: string
 *                              example: userObjectId
 *                          projectId:
 *                              type: string
 *                              example: projectObjectId
 *                          name:
 *                              type: string
 *                              example: modelName
 *                          parameters:
 *                              type: object
 *                              properties:
 *                                  batch-size:
 *                                      type: integer
 *                                      example: 128
 *                                  training-cycles:
 *                                      type: integer
 *                                      example: 128
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/model/create", ModelController.createModel);

/**
 * @swagger
 * /api/model/add-synthetic-data:
 *   post:
 *     summary: adding synthetic data csv to a model
 *     tags: 
 *          - Models
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: modelObjectId
 *                          userId:
 *                              type: string
 *                              example: userObjectId
 *                          projectId:
 *                              type: string
 *                              example: projectObjectId
 *                          filename:
 *                              type: string
 *                              example: name-of-the-file-to-store
 *                          path:
 *                              type: string
 *                              example: path-to-the-file
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/model/add-synthetic-data", ModelController.addSyntheticData);

/**
 * @swagger
 * /api/model/update:
 *   post:
 *     summary: creates a new user
 *     tags: 
 *          - Models
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: modelObjectId
 *                          userId:
 *                              type: string
 *                              example: userObjectId
 *                          projectId:
 *                              type: string
 *                              example: projectObjectId
 *                          name:
 *                              type: string
 *                              example: newModelName
 *                          parameters:
 *                              type: object
 *                              properties:
 *                                  batch-size:
 *                                      type: integer
 *                                      example: 128
 *                                  training-cycles:
 *                                      type: integer
 *                                      example: 128
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/model/update", ModelController.updateModel);

/**
 * @swagger
 * /api/model/delete-synthetic-data:
 *   post:
 *     summary: deletes synthetic data csv from a model
 *     tags: 
 *          - Models
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: modelObjectId
 *                          userId:
 *                              type: string
 *                              example: userObjectId
 *                          projectId:
 *                              type: string
 *                              example: projectObjectId
 *                          syntheticDataId:
 *                              type: string
 *                              example: syntheticDataCsvId
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/model/delete-synthetic-data", ModelController.deleteSyntheticData);

/**
 * @swagger
 * /api/model/read:
 *   post:
 *     summary: creates a new user
 *     tags: 
 *          - Models
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: modelObjectId
 *                          userId:
 *                              type: string
 *                              example: userObjectId
 *                          projectId:
 *                              type: string
 *                              example: projectObjectId
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/model/read", ModelController.readModel);

/**
 * @swagger
 * /api/model/update-synthetic-data:
 *   post:
 *     summary: updates name of the synthetic data csv
 *     tags: 
 *          - Models
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: modelObjectId
 *                          userId:
 *                              type: string
 *                              example: userObjectId
 *                          projectId:
 *                              type: string
 *                              example: projectObjectId
 *                          syntheticDataId:
 *                              type: string
 *                              example: syntheticDataCsvId
 *                          filename:
 *                              type: string
 *                              example: newCsvName
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/model/update-synthetic-data", ModelController.updateSyntheticData);

/**
 * @swagger
 * /api/model/delete:
 *   post:
 *     summary: creates a new user
 *     tags: 
 *          - Models
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: modelObjectId
 *                          userId:
 *                              type: string
 *                              example: userObjectId
 *                          projectId:
 *                              type: string
 *                              example: projectObjectId
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/model/delete", ModelController.deleteModel);

module.exports = router;