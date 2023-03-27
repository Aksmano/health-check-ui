import { Observable } from "rxjs";

export const getRandomNumber = (min: number, max: number) => Math.round(min + Math.random() * (max - min));

export const mockResponse = <T>(dataToReturn: T, typeName?: string, error?: boolean): Observable<T> => {
    const delayTimestamp = getRandomNumber(100, 300);

    setTimeout(() => console.log(`Mocked getting data of type ${typeName ?? typeof dataToReturn}\nDelay: ${delayTimestamp}ms`), delayTimestamp);

    return new Observable<T>(observer => {
        if (!error) {
            observer.next(dataToReturn);
        } else {
            observer.error(new Error())
        }

        return {
            unsubscribe: () => {
                console.log(`Unsubscribed mocked response of type ${typeName ?? typeof dataToReturn}`);
            }
        }
    })
};