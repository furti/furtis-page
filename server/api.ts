import { Router, Request, Response } from 'express';
import { Database } from './database';
import { isAuthenticated, AuthenticatedRequest } from './jwt';

const router = Router();
const client = new Database();

interface SectionRequest extends AuthenticatedRequest
{
    sectionId: number;
}

function handleError(response: Response, reason: any)
{
    console.error(`Error happended`, reason);

    const message = typeof reason === 'object' ? reason.message : reason;

    response.status(500).send(message);
}

router.get('/sections', (req, res) =>
{
    return client.findAllSections()
        .then(sections =>
        {
            res.status(200).json(sections);
        })
        .catch(reason =>
        {
            handleError(res, reason);
        });
});

router.get('/sections/:id', isAuthenticated, (req: SectionRequest, res) =>
{
    return client.getSection(req.sectionId).then(section =>
    {
        if (!req.user.hasAnyRole(section.requiredRoles))
        {
            res.status(403).send('Du besitzt nicht die benötigten Berechtigungen, um die Daten sehen zu können.');

            return;
        }

        delete section.requiredRoles;

        res.status(200).json(section);
    }).catch(reason =>
    {
        handleError(res, reason);
    });
});

router.get('*', (req, res) =>
{
    res.status(404).send(`URL "${req.originalUrl}" not found!`);
});

router.param('id', (req: SectionRequest, res, next, id) =>
{
    req.sectionId = Number(id);

    next();
});

module.exports = router;
