import { ArgumentParser } from 'argparse';
import * as fs from 'fs';
import * as path from 'path';

import { Furti } from './furti';


const parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Create Sections'
});

parser.addArgument(['--new'], {
    help: 'Create a new section. node sections.js --new <title>'
});

parser.addArgument(['--import'], {
    help: 'Import the section into the database. node sections.js --import <title>'
});

parser.addArgument(['--user'], {
    help: 'Username to connect to the database',
    required: true
});

parser.addArgument(['--password'], {
    help: 'Password to connect to the database',
    required: true
});

const args = parser.parseArgs();

function jsonFile(title: string)
{
    return path.join(process.cwd(), `database/import/sections/${title}.json`)
}

if (args.new)
{
    const emptySection = {
        id: -1,
        sortOrder: -1,
        title: args.new,
        image: '',
        snippetText: '',
    };

    const sectionFile = jsonFile(args.new);

    fs.exists(sectionFile, exists =>
    {
        if (exists)
        {
            console.log('File already exists');
        }
        else
        {
            fs.writeFile(
                sectionFile,
                JSON.stringify(emptySection, null, 4), 'utf-8', err =>
                {
                    if (err)
                    {
                        throw err;
                    }

                    console.log(`Sectionfile ${sectionFile} written`);
                });
        }
    });
}
else if (args.import)
{
    const sectionFile = jsonFile(args.import);
    fs.readFile(sectionFile, 'utf-8', (err, content) =>
    {
        if (err)
        {
            throw err;
        }

        const section = JSON.parse(content);

        const furti = new Furti(args.user, args.password);

        furti.connect()
            .then(db =>
            {
                db.updateSection(section, {
                    autoclose: true
                });
            });
    });
}
else
{
    console.log('No argument specified!');
}
