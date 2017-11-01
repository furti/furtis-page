export interface ToolListContent {
    contentType: 'TOOL_LIST';
    groups: ToolListGroup[];
}

export interface ToolListGroup {
    label: string;
    entries: TooListEntry[];
}

export interface TooListEntry {
    label: string;
    percentage: number;
    description: string;
}
