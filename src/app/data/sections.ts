import { Section } from '../Section';

export const sections: Section[] = [{
    id: 1,
    sortOrder: 1,
    title: 'Lebenslauf',
    contentType: 'CV',
    image: '/assets/cv_overview.png',
    snippetText: 'Hier erfährst du, in umgekehrt chronologischer Reihenfolge, was in meinem Leben so alles passiert ist und wie ich zu dem geworden bin der ich heute bin.'
}, {
    id: 2,
    sortOrder: 4,
    title: 'Meine Projekte',
    contentType: 'PROJECT_LIST',
    image: '/assets/projects_overview.png',
    snippetText: 'Eine Liste der Projekte die ich bis heute umgesetzt oder begonnen habe. Vielleicht ist ja was dabei das dich interressiert.'
}, {
    id: 3,
    sortOrder: 3,
    title: 'Stärken und Schwächen',
    contentType: 'PROJECT_LIST',
    image: '/assets/proscons_overview.png',
    snippetText: 'Hier gibts infos darüber was ich besonders gut kann und wo es noch Aufholbedarf gibt.'
},
{
    id: 4,
    sortOrder: 2,
    title: 'Fähigkeiten und Kenntnisse',
    image: '/assets/skills_overview.png',
    contentType: 'PROJECT_LIST',
    snippetText: 'Mit welchen Frameworks und Tools kenne ich mich aus? Welche Technologien habe ich schon benutzt und gemeistert? Hier erfährst du mehr darüber.'
},
{
    id: 5,
    sortOrder: 5,
    title: 'Hobbys',
    contentType: 'PROJECT_LIST',
    image: '/assets/hobbys_overview.png',
    snippetText: 'Arbeit ist nicht alles. Was macht mir neben dem Entwickeln sonst noch Spaß?'
}];