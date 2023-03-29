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