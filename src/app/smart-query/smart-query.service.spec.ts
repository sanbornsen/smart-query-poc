import { TestBed, inject } from '@angular/core/testing';

import { SmartQueryService } from './smart-query.service';

fdescribe('SmartQueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmartQueryService]
    });
  });

  it('calculateSearchParams :: should be created', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service).toBeTruthy();
  }));

  it('calculateSearchParams :: should return correct search param - 1', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.calculateSearchParams('')).toEqual([]);
  }));

  it('calculateSearchParams :: should return correct search param - 2', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.calculateSearchParams(' ')).toEqual([]);
  }));

  it('calculateSearchParams :: should return correct search param - 3', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.calculateSearchParams(' some string without config')).toEqual([]);
  }));

  it('calculateSearchParams :: should return correct search param - 4', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.calculateSearchParams(
      ' some string without config',
      {
        joiners: [],
        equators: []
      }
    )).toEqual([]);
  }));

  it('processJoiners :: should process joiner correctly - 1.1', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.processJoiners(['$AND'], 'a:b $AND')).toEqual(['a:b', '']);
  }));

  it('calculateSearchParams :: should return correct search param - 5', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.calculateSearchParams(
      'a:b $AND',
      {
        joiners: ['$AND'],
        equators: [':'],
        fields: ['field-1', 'field-2']
      }
    )).toEqual([{
      type: 'fields',
      values: ['field-1', 'field-2']
    }]);
  }));

  it('processJoiners :: should process joiner correctly - 1', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.processJoiners(['$AND'], 'some string')).toEqual(['some string']);
  }));

  it('processJoiners :: should process joiner correctly - 2', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.processJoiners(['$AND'], 'some $AND string')).toEqual(['some', 'string']);
  }));

  it('processJoiners :: should process joiner correctly - 3', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.processJoiners(['$AND', '$OR'], 'some $AND string $OR another string'))
    .toEqual(['some', 'string', 'another string']);
  }));

  it('processJoiners :: should process joiner correctly - 4', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.processJoiners(['$AND', '$OR'], 'some $AND string $OR another $AND string'))
    .toEqual(['some', 'string', 'another', 'string']);
  }));

  it('splitByEquators :: should split single query correctly - 1', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.splitByEquators([], 'some query string'))
    .toEqual({field: 'some query string', equator: null, value: null});
  }));

  it('splitByEquators :: should split single query correctly - 2', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.splitByEquators([':'], 'field:value'))
    .toEqual({field: 'field', equator: ':', value: 'value'});
  }));

  it('splitByEquators :: should split single query correctly - 3', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.splitByEquators([':'], 'field:value'))
    .toEqual({field: 'field', equator: ':', value: 'value'});
  }));

  it('splitByEquators :: should split single query correctly - 4', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.splitByEquators([':', '!:'], 'field!:value'))
    .toEqual({field: 'field', equator: '!:', value: 'value'});
  }));

  it('splitByEquators :: should split single query correctly - 5', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.splitByEquators([':', '!:'], 'field !: value'))
    .toEqual({field: 'field', equator: '!:', value: 'value'});
  }));

  it('splitByEquators :: should split single query correctly - 6', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.splitByEquators([':', '!:'], 'field !: value with space'))
    .toEqual({field: 'field', equator: '!:', value: 'value with space'});
  }));

  it('splitByEquators :: should split single query correctly - 7', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.splitByEquators([':', '!:'], 'field !: value with trailing space '))
    .toEqual({field: 'field', equator: '!:', value: 'value with trailing space '});
  }));

  it('splitByEquators :: should split single query correctly - 7', inject([SmartQueryService], (service: SmartQueryService) => {
    expect(service.splitByEquators([':', '!:'], 'field:'))
    .toEqual({field: 'field', equator: ':', value: ''});
  }));
});
