import { ArgumentParser } from 'argparse';
import * as fs from 'fs';
import * as path from 'path';
const DataURI = require('datauri').promise;

import { Furti } from './furti';

const parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Create section content'
});

parser.addArgument(['--new'], {
    help: 'Create a new section content. node sectionconent.js --new <title> --type <type>'
});

parser.addArgument(['--type'], {
    help: 'Type of content.'
});

parser.addArgument(['--import'], {
    help: 'Import thet content into the database. node sectioncontent.js --import <title>'
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
const validTypes = ['CV', 'ICON_LIST', 'TOOL_LIST'];

function jsonFile(title: string) {
    return path.join(process.cwd(), `database/import/content/${title}.json`);
}

function validateType(type: string): void {
    if (!type) {
        throw new Error('Missing type. Add --type <type> option.');
    }

    if (validTypes.indexOf(type) === -1) {
        throw new Error(`Invalid type ${type}. Valid types are ${validTypes}`);
    }
}

function processSection(section: any): Promise<any> {
    if (section.contentType === 'CV') {
        return DataURI(section.basedata.image).then((encoded: string) => {
            section.basedata.image = encoded;
        });
    }

    return Promise.resolve();
}
function createContent(title: string, type: string): any {
    switch (type) {
        case 'CV':
            return {
                sectionTitle: title,
                contentType: type,
                basedata: {
                    image: '<path to image>',
                    name: '',
                    birthdate: '01.01.1970',
                    bornIn: '',
                    familiyStatus: '',
                    nationality: '',
                    address: {
                        street: '',
                        zip: '',
                        city: ''
                    },
                    phone: '',
                    homepage: '',
                    email: ''
                },
                events: [
                    {
                        title: '',
                        subtitle: '',
                        date: {
                            from: '1970-01-01',
                            to: '1970-01-01'
                        },
                        info: ['']
                    },
                    {
                        title: '',
                        date: {
                            from: '1970-01-01',
                            to: '1970-01-01'
                        },
                        info: ['', '']
                    }
                ]
            };
        case 'ICON_LIST':
            return {
                sectionTitle: title,
                contentType: type,
                entries: [
                    { icon: '<clr-icon-shape>', paragraphs: ['<Absatz>', '<Absatz>'] },
                    { icon: '<clr-icon-shape2>', paragraphs: ['<Absatz>', '<Absatz>'] }
                ]
            };
        case 'TOOL_LIST':
            return {
                sectionTitle: title,
                contentType: type,
                groups: [
                    {
                        label: '<group-name>',
                        entries: [
                            {
                                title: '<title>',
                                percentage: 99,
                                description: '<description>'
                            }
                        ]
                    }
                ]
            };
    }
}

if (args.new) {
    validateType(args.type);

    const emptyContent = createContent(args.new, args.type);

    const contentPath = jsonFile(args.new);

    fs.exists(contentPath, exists => {
        if (exists) {
            console.log('File already exists');
        } else {
            fs.writeFile(contentPath, JSON.stringify(emptyContent, null, 4), 'utf-8', err => {
                if (err) {
                    throw err;
                }

                console.log(`Content file ${contentPath} written`);
            });
        }
    });
} else if (args.import) {
    const contentPath = jsonFile(args.import);

    fs.readFile(contentPath, 'utf-8', (err, content) => {
        if (err) {
            throw err;
        }

        const sectionContent = JSON.parse(content);
        processSection(sectionContent).then(() => {
            const furti = new Furti(args.user, args.password);

            furti.connect().then(db => {
                db.updateSectionContent(sectionContent, {
                    autoclose: true
                });
            });
        });
    });
} else {
    console.log('No argument specified!');
}
