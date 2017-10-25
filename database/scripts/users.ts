import { ArgumentParser } from 'argparse';
import * as fs from 'fs';
import * as path from 'path';
import { randomBytes, pbkdf2Sync } from 'crypto';

import { Furti } from './furti';

const parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Create Users'
});

parser.addArgument(['--new'], {
    help: 'Create a new user. node users.js --new <username>'
});

parser.addArgument(['--import'], {
    help: 'Import the user into the database. node users.js --import <username>'
});

parser.addArgument(['--createpass'], {
    help: 'Create a new password for the user. node users.js --createpass <username>'
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

function jsonFile(username: string) {
    return path.join(process.cwd(), `database/import/users/${username}.json`);
}

function createId() {
    const bytes = randomBytes(32);

    return bytes.toString('base64');
}

function createPassword(): string {
    const passwordBytes = randomBytes(10);
    return passwordBytes.toString('base64');
}

function createSalt(): string {
    return randomBytes(24).toString('base64');
}

function encodePassword(password: string, salt: string): string {
    const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512');

    return hash.toString('base64');
}

if (args.new) {
    const emptyUser = {
        id: createId(),
        username: args.new,
        name: '',
        roles: ['']
    };

    const userFile = jsonFile(args.new);

    fs.exists(userFile, exists => {
        if (exists) {
            console.log('File already exists');
        } else {
            fs.writeFile(userFile, JSON.stringify(emptyUser, null, 4), 'utf-8', err => {
                if (err) {
                    throw err;
                }

                console.log(`Userfile ${userFile} written`);
            });
        }
    });
} else if (args.import) {
    const userFile = jsonFile(args.import);

    fs.readFile(userFile, 'utf-8', (err, content) => {
        if (err) {
            throw err;
        }

        const user = JSON.parse(content);

        const furti = new Furti(args.user, args.password);

        furti.connect().then(db => {
            db.updateUser(user, {
                autoclose: true
            });
        });
    });
} else if (args.createpass) {
    const username = args.createpass;
    const password = createPassword();
    const salt = createSalt();
    const encodedPassword = encodePassword(password, salt);

    const furti = new Furti(args.user, args.password);

    furti.connect().then(db => {
        db
            .updateUserPassword(username, encodedPassword, salt, {
                autoclose: true
            })
            .then(() => {
                console.log(`Set password ${password} for user ${username}`);
            });
    });
} else {
    console.log('No argument specified!');
}
