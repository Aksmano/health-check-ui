import {TestType} from "../../../data/model/common/TestType";
import {getFriendlyEnumName} from "../../../utils";

export function getTypesAsStringArray() {

  Object.keys(TestType)
    .filter((item) => {
      return isNaN(Number(item));
    })
}

export function getTypesAsDropdownItem(): any {
  return Object.keys(TestType)
    .filter((item) => {
      return isNaN(Number(item));
    })
    .map(item => {
      return mapToDropdownItem(item);
    });
}

function mapToDropdownItem(item: any) {
  return {
    name: item,
    code: item
  }
}

export function getEnumValueName(constEnumValue: string) {
  return getFriendlyEnumName(constEnumValue);
}
