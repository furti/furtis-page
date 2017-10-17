import { Router, Request, Response } from 'express';
import { Database } from './database';

const router = Router();
const client = new Database();


function handleError(response: Response, reason: any)
{
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

router.get('*', (req, res) =>
{
    res.status(404).send(`URL "${req.originalUrl}" not found!`);
});

module.exports = router;
