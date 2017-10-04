import { ProjectListContent } from './ProjectListContent';
import { CVContent } from './CVContent';

export interface Section<CONTENT_TYPE = CVContent | ProjectListContent>
{
    id: number;

    /**
     * Defines the order of sections in the view.
     *
     * @type {number}
     * @memberof Section
     */
    sortOrder: number;

    /**
     * The title shown in the section overview and the section details.
     *
     * @type {string}
     * @memberof Section
     */
    title: string;

    /**
     * The image to display in the overview
     *
     * @type {string}
     * @memberof Section
     */
    image: string;

    /**
     * A short text displayed in the section overview.
     *
     * @type {string}
     * @memberof Section
     */
    snippetText: string;

    content: CONTENT_TYPE;
}
