export interface AutoCompleteItem {
    name: string;
    code: string;
};

export interface LocationSearchItem extends AutoCompleteItem {
    addresses: AutoCompleteItem[];
}

export interface AutoCompleteEvent {
    originalEvent: PointerEvent;
    query: string;
}