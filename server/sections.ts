import { Router, Request, Response } from 'express';
import { Database } from './database';
import { isAuthenticated, hasAnyRole, AuthenticatedRequest } from './jwt';

const router = Router();
const client = new Database();

interface SectionRequest extends AuthenticatedRequest {
    sectionId: number;
    section: any;
}

function handleError(response: Response, reason: any) {
    console.error(`Error happended`, reason);

    const message = typeof reason === 'object' ? reason.message : reason;

    response.status(500).send(message);
}

function loadSection(req: SectionRequest, res: Response, next: any): void {
    client
        .getSection(req.sectionId)
        .then(section => {
            req.section = section;

            next();
        })
        .catch(reason => {
            handleError(res, reason);
        });
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

router.get(
    '/:id',
    loadSection,
    isAuthenticated<SectionRequest>(req => req.section.requiredRoles && req.section.requiredRoles.length > 0),
    hasAnyRole<SectionRequest>(req => req.section.requiredRoles),
    (req: SectionRequest, res) => {
        delete req.section.requiredRoles;

        res.status(200).json(req.section);
    }
);

router.get('*', (req, res) => {
    res.status(404).send(`URL "${req.originalUrl}" not found!`);
});

router.param('id', (req: SectionRequest, res, next, id) => {
    req.sectionId = Number(id);

    next();
});

module.exports = router;
