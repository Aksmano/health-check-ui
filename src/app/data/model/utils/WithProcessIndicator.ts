import { Nullable } from "./Nullable";

// export class WithProcessIndicator<T> {
//     public data?: Nullable<T>;
//     public isProcessOngoing: Nullable<boolean>;

//     constructor(data?: T) {
//         this.data = data ?? undefined;
//         this.isProcessOngoing = false;
//     }

//     public get isDataLoaded() { return !!this.data }
// }

export interface WithProcessIndicator<T> {
    data?: T;
    isProcessOngoing: boolean;
}

export const newWPI = <T>(data?: T, isProcessOngoing?: boolean): WithProcessIndicator<T> => {
    return {
        data: data !== undefined
            ? data
            : undefined,
        isProcessOngoing: isProcessOngoing !== undefined
            ? isProcessOngoing
            : false
    }
}