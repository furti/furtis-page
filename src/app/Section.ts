import { SectionContentType } from './SectionContentType';

export interface Section
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
     * The type of section data to display when a user clicks on the section.
     *
     * @type {SectionContentType}
     * @memberof Section
     */
    contentType: SectionContentType;

    /**
     * A short text displayed in the section overview.
     *
     * @type {string}
     * @memberof Section
     */
    snippetText: string;
}
