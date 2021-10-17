var express = require('express');
const UserController = require('../controllers/userController');

var router = express.Router();

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: creates a new user
 *     tags: 
 *          - Users
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: username1
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/user/create", UserController.createUser);

/**
 * @swagger
 * /api/user/update:
 *   post:
 *     summary: updates name of the user
 *     tags: 
 *          - Users
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: id-of-the-user
 *                          name:
 *                              type: string
 *                              example: newname1
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/user/update", UserController.updateUser);

/**
 * @swagger
 * /api/user/delete:
 *   post:
 *     summary: deletes a user
 *     tags: 
 *          - Users
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: id-of-the-user-to-be-deleted
 *                          name:
 *                              type: string
 *                              example: name-of-the-corresponding-user-with-id
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/user/delete", UserController.deleteUser);

/**
 * @swagger
 * /api/user/fetch-projects:
 *   post:
 *     summary: fetches all the projects by the user
 *     tags: 
 *          - Users
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: user-ObjectID
 *     responses:
 *          200:
 *              description: success status
 *          400:
 *              description: bad request from client
 *          500:
 *              description: internal server error
 *              
*/
router.post("/user/fetch-projects", UserController.fetchProjects);

module.exports = router;