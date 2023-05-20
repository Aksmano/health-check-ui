import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { WithProcessIndicator } from "./data/model/utils/WithProcessIndicator";
import { Department } from "./data/model/entities/Department";
import { Address } from "./data/model/dto/common/Address";

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

  console.log(httpParams);
  return httpParams;
}

export const getPathnamesList = () => window.location.pathname.split('/').slice(1);

export const getFriendlyEnumName = (name: string) => {
  return name.split('_')
    .map((word, i) =>
      i === 0
        ? word[0] + word.substring(1).toLowerCase()
        : word.toLowerCase())
    .join(' ');
}

export const getUserFriendlyAddress = (address: Address): string => {
  return `${address.street} ${address.houseNumber}${!!address.apartmentNumber ? '/' + address.apartmentNumber : ''}`
}
