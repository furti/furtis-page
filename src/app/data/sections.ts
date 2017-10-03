import { Section } from './Section';

export const sections: Section[] = [{
    id: 1,
    sortOrder: 1,
    title: 'Lebenslauf',
    image: '/assets/cv_overview.png',
    snippetText: 'Hier erfährst du, in umgekehrt chronologischer Reihenfolge, was in meinem Leben so alles passiert ist und wie ich zu dem geworden bin der ich heute bin.',
    content: {
        contentType: 'CV',
        basedata: {
            name: 'Daniel Furtlehner',
            birthdate: '01.01.1970',
            nationality: 'Österreich',
            address: {
                street: 'Some Street 1',
                zip: '0815',
                city: 'Far far away'
            },
            phone: '+43 123 45 67',
            homepage: 'https://furti.193b.starter-ca-central-1.openshiftapps.com/',
            email: 'foo@bar.com'
        }
    }
}, {
    id: 2,
    sortOrder: 4,
    title: 'Meine Projekte',
    image: '/assets/projects_overview.png',
    snippetText: 'Eine Liste der Projekte die ich bis heute umgesetzt oder begonnen habe. Vielleicht ist ja was dabei das dich interressiert.',
    content: {
        contentType: 'PROJECT_LIST'
    }
}, {
    id: 3,
    sortOrder: 3,
    title: 'Stärken und Schwächen',
    image: '/assets/proscons_overview.png',
    snippetText: 'Hier gibts infos darüber was ich besonders gut kann und wo es noch Aufholbedarf gibt.',
    content: {
        contentType: 'PROJECT_LIST'
    }
},
{
    id: 4,
    sortOrder: 2,
    title: 'Fähigkeiten und Kenntnisse',
    image: '/assets/skills_overview.png',
    snippetText: 'Mit welchen Frameworks und Tools kenne ich mich aus? Welche Technologien habe ich schon benutzt und gemeistert? Hier erfährst du mehr darüber.',
    content: {
        contentType: 'PROJECT_LIST'
    }
},
{
    id: 5,
    sortOrder: 5,
    title: 'Hobbys',
    image: '/assets/hobbys_overview.png',
    snippetText: 'Arbeit ist nicht alles. Was macht mir neben dem Entwickeln sonst noch Spaß?',
    content: {
        contentType: 'PROJECT_LIST'
    }
}];
