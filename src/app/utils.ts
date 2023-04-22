import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

export const getRandomNumber = (min: number, max: number) => Math.round(min + Math.random() * (max - min));

interface MockResponse<T> {
    dataToReturn: T,
    typeName?: string,
    error?: boolean,
    fetchTime?: [number, number]
}

export const mockResponse = <T>(
    { dataToReturn, error, fetchTime, typeName }: MockResponse<T>
): Observable<T> => {
    fetchTime = fetchTime ?? [100, 300];
    const delayTimestamp = getRandomNumber(...fetchTime);

    return new Observable<T>(observer => {
        setTimeout(() => {
            if (!error) {
                console.log(`Mocked getting data of type ${typeName ?? typeof dataToReturn}\nDelay: ${delayTimestamp}ms`)
                observer.next(dataToReturn);
            } else {
                console.error(`Mocked error of getting data of type ${typeName ?? typeof dataToReturn}\nDelay: ${delayTimestamp}ms`)
                observer.error(new Error());
            }

            return {
                unsubscribe: () => {
                    console.log(`Unsubscribed mocked response of type ${typeName ?? typeof dataToReturn}`);
                }
            }
        }, delayTimestamp)
    })
};

export const StringIsNumber = (value: any) => isNaN(Number(value)) === false;

export const mapEnum = (enumArg: any) => {
    return Object.keys(enumArg)
        .filter(StringIsNumber)
        .map(key => enumArg[key]);
}

export const objectToHttpParams = (obj: object): HttpParams => {
    const entries = Object.entries(obj);
    const httpParams = new HttpParams();

    entries.forEach(entry => {
        const valueType = typeof entry[0];
        if (valueType === 'number' || valueType === 'string' || valueType === 'boolean')
            httpParams.append(entry[0], entry[1]);
    })

    return httpParams;
}

export const getPathnamesList = () => window.location.pathname.split('/').slice(1);

export type Nullable<T> = T | null | undefined;