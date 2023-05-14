export abstract class TableView {
    protected processOngoing: boolean = false;
    protected loadingMessage: string = '';

    constructor() {}

    abstract deleteEntity(entity: any): void;
    abstract modifyEntity(entity: any): void;
}