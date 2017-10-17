"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("./database");
const router = express_1.Router();
const client = new database_1.Database();
function handleError(response, reason) {
    const message = typeof reason === 'object' ? reason.message : reason;
    response.status(500).send(message);
}
router.get('/sections', (req, res) => {
    return client.findAllSections()
        .then(sections => {
        res.status(200).json(sections);
    })
        .catch(reason => {
        handleError(res, reason);
    });
});
router.get('*', (req, res) => {
    res.status(404).send(`URL "${req.originalUrl}" not found!`);
});
module.exports = router;
