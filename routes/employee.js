const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

/**
 * @swagger
 * /employee:
 *   get:
 *     description: to get all employees present in DB
 *     tags:
 *       - employee
 *     summary: Get employee Objects 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/employee', employeeController.get);

/**
 * @swagger
 * /employee:
 *   post:
 *     description: Insert a new employee object
 *     tags:
 *       - employee
 *     summary: Insert New employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: employee
 *         description: new employee details
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definitions/postDefinition'
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/employee', employeeController.payloadValidate, employeeController.post);

/**
 * @swagger
 * /employee:
 *   put:
 *     description: update employee details
 *     tags:
 *       - employee
 *     summary: Update Editable employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: employee
 *         description: update employee details
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definitions/putDefinition'
 *     responses:
 *       200:
 *         description: Success
 *  
 */
router.put('/employee', employeeController.put);
/**
 * @swagger
 * /employee:
 *   delete:
 *     description: delete employee
 *     tags:
 *       - employee
 *     summary: Delete employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: employee
 *         description: delete employee
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definitions/deleteDefinition'
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/employee', employeeController.delete);

module.exports = router;