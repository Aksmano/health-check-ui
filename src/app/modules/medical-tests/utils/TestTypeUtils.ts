import {TestType} from "../../../data/model/common/TestType";

export function getTypesAsStringArray() {

  Object.keys(TestType)
    .filter((item) => {
      return isNaN(Number(item));
    })
}

export function getTypesAsDropdownItem(): any {
  Object.keys(TestType)
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
