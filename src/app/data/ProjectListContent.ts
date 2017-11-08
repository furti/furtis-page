export interface ProjectListContent {
    contentType: 'PROJECT_LIST';
    projects: Project[];
}

export interface Project {
    name: string;
    slogan: string;
    description: string;
    technologies?: string[];
    thumbnail?: string;
    githubLink?: string;
    pageLink?: string;
}
