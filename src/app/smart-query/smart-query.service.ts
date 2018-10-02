import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmartQueryService {

  constructor() { }

  // Search logic
  // 1. Joiner
  // 2. Field
  // 3. Value
  calculateSearchParams(
    str: string,
    config: {
      joiners?: string[];
      equators?: string[];
      fields?: string[];
    } = {}
  ): {
    type: string;
    values: string[]
  }[] {
    // trim the left side of the string
    str = str.trimLeft();
    // if string size 0 return null
    if (str.trim() === '') {
      return [];
    }

    if (!(config.joiners && config.equators)) {
      return [];
    }

    if (!(config.joiners.length && config.equators.length)) {
      return [];
    }

    // Split the array by the joiners first
    const processedArray: string[] =
      this.processJoiners(config.joiners, str);

    // We are only interested in the last chunk
    const lastPart = processedArray[processedArray.length - 1];

    // Split it by the equators
    const lastPartSplitted =
      this.splitByEquators(config.equators, lastPart);

    // If lastPart is an empty string return all the fields
    if (lastPart === '') {
      return [{
        type: 'fields',
        values: config.fields
      }];
    }

    // If the length is 1 and it's a complete query we suggest for
    // joiner next or the value
    if (processedArray.length === 1 &&
      lastPartSplitted.equator &&
      lastPartSplitted.field &&
      lastPartSplitted.value) {
      return [{
        type: 'joiner',
        values: []
      }];
    }


    // If there is no equator yet
    // We suggest for the matching fileds
    // or the equator
    if (!lastPartSplitted.equator) {
      return [{
        type: 'field',
        values: []
      }, {
        type: 'equator',
        values: []
      }];
    }
  }

  /**
   * This function split the string by the joiners
   * @param joiners array of joiner strings [$AND, $OR]
   * @param str the string
   */
  processJoiners(joiners: string[], str: string): string[] {
    const specialJoiner = '$$==@@';
    let processedArray: string[];
    // Split the string by the joiners
    for (let i = 0; i < joiners.length; i++) {
      processedArray = str.split(joiners[i]);
      str = processedArray.join(specialJoiner);
    }
    return str.split(specialJoiner).map(i => i.trim());
  }

  /**
   * This function split a single query by the equator
   * and returns the field, value and the equator
   * @param equators
   * @param str
   */
  splitByEquators(equators: string[], str: string): {
    field: string;
    equator: string | null,
    value: string | null
  } {
    // First we should sort descending the equators by the length
    // Else if there is an equator like '=' and another like '!='
    // and the string consist '!=', it would still split it by '=' if
    // that is what stays before '!=' in the array of equators
    equators = [...equators].sort((a, b) => b.length - a.length);

    for (let i = 0; i < equators.length; i++) {
      const splitted = str.split(equators[i]);
      if (splitted.length > 1) {
        return {
          field: splitted[0].trimRight(),
          equator: equators[i],
          value: splitted[1].trimLeft()
        };
      }
    }

    return {
      field: str,
      equator: null,
      value: null
    };
  }
}
