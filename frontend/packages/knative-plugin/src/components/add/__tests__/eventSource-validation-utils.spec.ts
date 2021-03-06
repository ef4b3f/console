import { cloneDeep } from 'lodash';
import { eventSourceValidationSchema } from '../eventSource-validation-utils';
import { getDefaultEventingData } from '../../../utils/__tests__/knative-serving-data';
import { EventSources } from '../import-types';

describe('Event Source ValidationUtils', () => {
  it('should validate the form data', async () => {
    const defaultEventingData = getDefaultEventingData(EventSources.CronJobSource);
    const mockData = cloneDeep(defaultEventingData);
    await eventSourceValidationSchema
      .isValid(mockData)
      .then((valid) => expect(valid).toEqual(true));
  });

  it('should throw an error for required fields if empty', async () => {
    const defaultEventingData = getDefaultEventingData(EventSources.CronJobSource);
    const mockData = cloneDeep(defaultEventingData);
    mockData.sink.knativeService = '';
    await eventSourceValidationSchema
      .isValid(mockData)
      .then((valid) => expect(valid).toEqual(false));
    await eventSourceValidationSchema.validate(mockData).catch((err) => {
      expect(err.message).toBe('Required');
      expect(err.type).toBe('required');
    });
  });

  describe('ApiServerSource : Event Source Validation', () => {
    it('should validate the form data', async () => {
      const defaultEventingData = getDefaultEventingData(EventSources.ApiServerSource);
      const mockData = cloneDeep(defaultEventingData);
      await eventSourceValidationSchema
        .isValid(mockData)
        .then((valid) => expect(valid).toEqual(true));
    });

    it('should throw an error for required fields if empty', async () => {
      const defaultEventingData = getDefaultEventingData(EventSources.ApiServerSource);
      const mockData = cloneDeep(defaultEventingData);
      mockData.sink.knativeService = '';
      await eventSourceValidationSchema
        .isValid(mockData)
        .then((valid) => expect(valid).toEqual(false));
      await eventSourceValidationSchema.validate(mockData).catch((err) => {
        expect(err.message).toBe('Required');
        expect(err.type).toBe('required');
      });
    });
  });
});
