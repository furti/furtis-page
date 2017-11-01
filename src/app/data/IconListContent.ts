export interface IconListContent {
    contentType: 'ICON_LIST';
    entries: IconListEntry[];
}

export interface IconListEntry {
    icon: string;
    paragraphs: string[];
}
