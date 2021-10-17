var express = require('express');
const ProjectController = require('../controllers/projectController');

var router = express.Router();

/**
 * @swagger
 * /api/project/create:
 *   post:
 *     summary: creates a new project
 *     tags: 
 *          - Projects
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: string
 *                              example: user-objectID
 *                          name:
 *                              type: string
 *                              example: project1
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/project/create", ProjectController.createProject);

/**
 * @swagger
 * /api/project/fetch-models:
 *   post:
 *     summary: fetch models inside a project
 *     tags: 
 *          - Projects
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: ObjectID
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/project/fetch-models", ProjectController.fetchModels);

/**
 * @swagger
 * /api/project/update:
 *   post:
 *     summary: updates project name
 *     tags: 
 *          - Projects
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: projectId
 *                          userId:
 *                              type: string
 *                              example: userId
 *                          name:
 *                              type: string
 *                              example: ObjectID
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/project/update", ProjectController.updateProject);

/**
 * @swagger
 * /api/project/delete:
 *   post:
 *     summary: deletes a project of a user
 *     tags: 
 *          - Projects
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: projectId
 *                          userId:
 *                              type: string
 *                              example: userId
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/project/delete", ProjectController.deleteProject);

/**
 * @swagger
 * /api/project/add-real-data:
 *   post:
 *     summary: creates a new user
 *     tags: 
 *          - Projects
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: projectId
 *                          userId:
 *                              type: string
 *                              example: userId
 *                          filename:
 *                              type: string
 *                              example: name-of-csv-to-store
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
router.post("/project/add-real-data", ProjectController.addRealData);

/**
 * @swagger
 * /api/project/update-real-data:
 *   post:
 *     summary: updates name of the real data csv
 *     tags: 
 *          - Projects
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: projectId
 *                          userId:
 *                              type: string
 *                              example: userId
 *                          realDataId:
 *                              type: string
 *                              example: realDataCsvId
 *                          filename:
 *                              type: string
 *                              example: new-file-name
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/project/update-real-data", ProjectController.updateRealData);

/**
 * @swagger
 * /api/project/delete-real-data:
 *   post:
 *     summary: deletes real data csv
 *     tags: 
 *          - Projects
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: projectId
 *                          userId:
 *                              type: string
 *                              example: userId
 *                          realDataId:
 *                              type: string
 *                              example: realDataCsvId
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/project/delete-real-data", ProjectController.deleteRealData);

/**
 * @swagger
 * /api/project/fetch:
 *   post:
 *     summary: fetch project details
 *     tags: 
 *          - Projects
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: projectId
 *                          userId:
 *                              type: string
 *                              example: userId
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/project/fetch", ProjectController.fetchProject);

module.exports = router;