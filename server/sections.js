"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("./database");
const jwt_1 = require("./jwt");
const router = express_1.Router();
const client = new database_1.Database();
function handleError(response, reason) {
    console.error(`Error happended`, reason);
    const message = typeof reason === 'object' ? reason.message : reason;
    response.status(500).send(message);
}
router.get('/', (req, res) => {
    return client
        .findAllSections()
        .then(sections => {
        res.status(200).json(sections);
    })
        .catch(reason => {
        handleError(res, reason);
    });
});
router.get('/:id', jwt_1.isAuthenticated, (req, res) => {
    return client
        .getSection(req.sectionId)
        .then(section => {
        if (!req.user.hasAnyRole(section.requiredRoles)) {
            res.status(403).send('Du besitzt nicht die benötigten Berechtigungen, um die Daten sehen zu können.');
            return;
        }
        delete section.requiredRoles;
        res.status(200).json(section);
    })
        .catch(reason => {
        handleError(res, reason);
    });
});
router.get('*', (req, res) => {
    res.status(404).send(`URL "${req.originalUrl}" not found!`);
});
router.param('id', (req, res, next, id) => {
    req.sectionId = Number(id);
    next();
});
module.exports = router;
