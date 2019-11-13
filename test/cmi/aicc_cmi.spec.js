import {describe, it} from 'mocha';
import {aicc_constants} from '../../src/constants/api_constants';
import {scorm12_error_codes} from '../../src/constants/error_codes';
import {
  CMI,
  CMIEvaluationCommentsObject,
  CMITriesObject, NAV,
} from '../../src/cmi/aicc_cmi';
import * as h from '../helpers';
import {
  CMIInteractionsCorrectResponsesObject,
  CMIInteractionsObject,
  CMIObjectivesObject,
} from '../../src/cmi/scorm12_cmi';
import {expect} from 'chai';

const invalid_set = scorm12_error_codes.INVALID_SET_VALUE;
const type_mismatch = scorm12_error_codes.TYPE_MISMATCH;
const write_only = scorm12_error_codes.WRITE_ONLY_ELEMENT;
const read_only = scorm12_error_codes.READ_ONLY_ELEMENT;
const invalid_range = scorm12_error_codes.VALUE_OUT_OF_RANGE;

describe('AICC CMI Tests', () => {
  describe('CMI Spec Tests', () => {
    describe('Pre-Initialize Tests', () => {
      const cmi = () => {
        return new CMI();
      };

      /**
       * Base CMI Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi._version',
        expectedValue: '3.4',
        expectedError: invalid_set,
      });
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi._children',
        expectedValue: aicc_constants.cmi_children,
        expectedError: invalid_set,
      });

      h.checkFieldConstraintSize({
        cmi: cmi(),
        fieldName: 'cmi.suspend_data', limit: 4096,
        expectedError: type_mismatch,
      });
      h.checkReadAndWrite({
        cmi: cmi(),
        fieldName: 'cmi.launch_data',
      });
      h.checkFieldConstraintSize({
        cmi: cmi(),
        fieldName: 'cmi.comments', limit: 4096,
        expectedError: type_mismatch,
      });
      h.checkReadAndWrite({
        cmi: cmi(),
        fieldName: 'cmi.comments_from_lms',
      });

      /**
       * cmi.core Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.core._children',
        expectedValue: aicc_constants.core_children,
        expectedError: invalid_set,
      });
      h.checkReadAndWrite({
        cmi: cmi(),
        fieldName: 'cmi.core.student_id',
      });
      h.checkReadAndWrite({
        cmi: cmi(),
        fieldName: 'cmi.core.student_name',
      });
      h.checkFieldConstraintSize({
        cmi: cmi(),
        fieldName: 'cmi.core.lesson_location',
        limit: 255,
        expectedError: type_mismatch,
      });
      h.checkReadAndWrite({
        cmi: cmi(),
        fieldName: 'cmi.core.credit',
      });
      h.checkRead({
        cmi: cmi(),
        fieldName: 'cmi.core.lesson_status',
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.core.lesson_status',
        validValues: [
          'passed',
          'completed',
          'failed',
          'incomplete',
          'browsed',
        ],
        invalidValues: [
          'Passed',
          'P',
          'F',
          'p',
          'true',
          'false',
          'complete',
        ],
      });
      h.checkReadAndWrite({
        cmi: cmi(),
        fieldName: 'cmi.core.entry',
      });
      h.checkReadAndWrite({
        cmi: cmi(),
        fieldName: 'cmi.core.total_time',
      });
      h.checkReadAndWrite({
        cmi: cmi(),
        fieldName: 'cmi.core.lesson_mode',
        expectedValue: 'normal',
      });
      h.checkWrite({
        cmi: cmi(),
        fieldName: 'cmi.core.exit',
        valueToTest: 'suspend',
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.core.exit',
        validValues: [
          'time-out',
          'suspend',
          'logout',
        ], invalidValues: [
          'complete',
          'exit',
        ],
      });

      h.checkWriteOnly({
        cmi: cmi(),
        fieldName: 'cmi.core.session_time',
        valueToTest: '00:00:00',
        expectedError: write_only,
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.core.session_time',
        validValues: [
          '10:06:57',
          '00:00:01.56',
          '23:59:59',
          '47:59:59',
        ],
        invalidValues: [
          '06:5:13',
          '23:59:59.123',
          'P1DT23H59M59S',
        ],
      });

      /**
       * cmi.core.score Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.core.score._children',
        expectedValue: aicc_constants.score_children,
        expectedError: invalid_set,
      });

      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.core.score.raw',
        validValues: [
          '0',
          '25.1',
          '50.5',
          '75',
          '100',
        ],
        invalidValues: [
          '-1',
          '101',
        ],
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.core.score.min',
        validValues: [
          '0',
          '25.1',
          '50.5',
          '75',
          '100',
        ],
        invalidValues: [
          '-1',
          '101',
        ],
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.core.score.max',
        validValues: [
          '0',
          '25.1',
          '50.5',
          '75',
          '100',
        ],
        invalidValues: [
          '-1',
          '101',
        ],
      });

      /**
       * cmi.objectives Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.objectives._children',
        expectedValue: aicc_constants.objectives_children,
        expectedError: invalid_set,
      });
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.objectives._count', expectedValue: 0,
        expectedError: invalid_set,
      });

      /**
       * cmi.student_data Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.student_data._children',
        expectedValue: aicc_constants.student_data_children,
        expectedError: invalid_set,
      });
      h.checkReadAndWrite({
        cmi: cmi(),
        fieldName: 'cmi.student_data.mastery_score',
      });
      h.checkReadAndWrite({
        cmi: cmi(),
        fieldName: 'cmi.student_data.max_time_allowed',
      });
      h.checkReadAndWrite({
        cmi: cmi(),
        fieldName: 'cmi.student_data.time_limit_action',
      });
      h.checkReadAndWrite({
        cmi: cmi(),
        fieldName: 'cmi.student_data.tries_during_lesson',
      });

      /**
       * cmi.student_preference Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.student_preference._children',
        expectedValue: aicc_constants.student_preference_children,
        expectedError: invalid_set,
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.audio',
        validValues: [
          '1',
          '-1',
          '50',
          '100',
        ],
        invalidValues: [
          'invalid',
          'a100',
        ],
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.audio',
        validValues: [],
        invalidValues: [
          '101',
          '5000000',
          '-500',
        ],
      });
      h.checkFieldConstraintSize({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.language',
        limit: 255,
        expectedError: type_mismatch,
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.speed',
        validValues: [
          '1',
          '-100',
          '50',
          '100',
        ],
        invalidValues: [
          'invalid',
          'a100',
        ],
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.speed',
        validValues: [],
        invalidValues: [
          '101',
          '-101',
          '5000000',
          '-500',
        ],
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.text',
        validValues: [
          '1',
          '-1',
        ],
        invalidValues: [
          'invalid',
          'a100',
        ],
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.text',
        validValues: [],
        invalidValues: [
          '2',
          '-2',
        ],
      });

      /**
       * cmi.interactions Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.interactions._children',
        expectedValue: aicc_constants.interactions_children,
        expectedError: invalid_set,
      });
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.interactions._count', expectedValue: 0,
        expectedError: invalid_set,
      });
    });

    describe('Post-Initialize Tests', () => {
      const cmi = () => {
        const obj = new CMI();
        obj.initialize();
        return obj;
      };

      /**
       * Base CMI Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi._version',
        expectedValue: '3.4',
        expectedError: invalid_set,
      });
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi._children',
        expectedValue: aicc_constants.cmi_children,
        expectedError: invalid_set,
      });
      h.checkFieldConstraintSize({
        cmi: cmi(),
        fieldName: 'cmi.suspend_data', limit: 4096,
        expectedError: type_mismatch,
      });
      h.checkReadOnly({
        cmi: cmi(),
        fieldName: 'cmi.launch_data',
        expectedError: read_only,
      });
      h.checkFieldConstraintSize({
        cmi: cmi(),
        fieldName: 'cmi.comments', limit: 4096,
        expectedError: type_mismatch,
      });
      h.checkReadOnly({
        cmi: cmi(),
        fieldName: 'cmi.comments_from_lms',
        expectedError: read_only,
      });

      /**
       * cmi.core Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.core._children',
        expectedValue: aicc_constants.core_children,
        expectedError: invalid_set,
      });
      h.checkReadOnly({
        cmi: cmi(),
        fieldName: 'cmi.core.student_id',
        expectedError: read_only,
      });
      h.checkReadOnly({
        cmi: cmi(),
        fieldName: 'cmi.core.student_name',
        expectedError: read_only,
      });
      h.checkFieldConstraintSize({
        cmi: cmi(),
        fieldName: 'cmi.core.lesson_location',
        limit: 255,
        expectedError: type_mismatch,
      });
      h.checkReadOnly({
        cmi: cmi(),
        fieldName: 'cmi.core.credit',
        expectedError: read_only,
      });
      h.checkRead({
        cmi: cmi(),
        fieldName: 'cmi.core.lesson_status',
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.core.lesson_status',
        validValues: [
          'passed',
          'completed',
          'failed',
          'incomplete',
          'browsed',
        ],
        invalidValues: [
          'Passed',
          'P',
          'F',
          'p',
          'true',
          'false',
          'complete',
        ],
      });
      h.checkReadOnly({
        cmi: cmi(),
        fieldName: 'cmi.core.entry',
        expectedError: read_only,
      });
      h.checkReadOnly({
        cmi: cmi(),
        fieldName: 'cmi.core.total_time',
        expectedError: read_only,
      });
      h.checkReadOnly({
        cmi: cmi(),
        fieldName: 'cmi.core.lesson_mode',
        expectedValue: 'normal',
        expectedError: read_only,
      });
      h.checkWrite({
        cmi: cmi(),
        fieldName: 'cmi.core.exit',
        valueToTest: 'suspend',
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.core.exit',
        validValues: [
          'time-out',
          'suspend',
          'logout',
        ], invalidValues: [
          'complete',
          'exit',
        ],
      });
      h.checkWriteOnly({
        cmi: cmi(),
        fieldName: 'cmi.core.session_time',
        valueToTest: '00:00:00',
        expectedError: write_only,
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.core.session_time',
        validValues: [
          '10:06:57',
          '00:00:01.56',
          '23:59:59',
          '47:59:59',
        ],
        invalidValues: [
          '06:5:13',
          '23:59:59.123',
          'P1DT23H59M59S',
        ],
      });

      /**
       * cmi.core.score Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.core.score._children',
        expectedValue: aicc_constants.score_children,
        expectedError: invalid_set,
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.core.score.raw',
        validValues: [
          '0',
          '25.1',
          '50.5',
          '75',
          '100',
        ],
        invalidValues: [
          '-1',
          '101',
        ],
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.core.score.min',
        validValues: [
          '0',
          '25.1',
          '50.5',
          '75',
          '100',
        ],
        invalidValues: [
          '-1',
          '101',
        ],
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.core.score.max',
        validValues: [
          '0',
          '25.1',
          '50.5',
          '75',
          '100',
        ],
        invalidValues: [
          '-1',
          '101',
        ],
      });

      /**
       * cmi.objectives Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.objectives._children',
        expectedValue: aicc_constants.objectives_children,
        expectedError: invalid_set,
      });
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.objectives._count', expectedValue: 0,
        expectedError: invalid_set,
      });

      /**
       * cmi.student_data Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.student_data._children',
        expectedValue: aicc_constants.student_data_children,
        expectedError: invalid_set,
      });
      h.checkReadOnly({
        cmi: cmi(),
        fieldName: 'cmi.student_data.mastery_score',
        expectedError: read_only,
      });
      h.checkReadOnly({
        cmi: cmi(),
        fieldName: 'cmi.student_data.max_time_allowed',
        expectedError: read_only,
      });
      h.checkReadOnly({
        cmi: cmi(),
        fieldName: 'cmi.student_data.time_limit_action',
        expectedError: read_only,
      });
      h.checkReadOnly({
        cmi: cmi(),
        fieldName: 'cmi.student_data.tries_during_lesson',
        expectedError: read_only,
      });

      /**
       * cmi.student_preference Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.student_preference._children',
        expectedValue: aicc_constants.student_preference_children,
        expectedError: invalid_set,
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.audio',
        validValues: [
          '1',
          '-1',
          '50',
          '100',
        ],
        invalidValues: [
          'invalid',
          'a100',
        ],
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.audio',
        validValues: [],
        invalidValues: [
          '101',
          '5000000',
          '-500',
        ],
      });
      h.checkFieldConstraintSize({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.language',
        limit: 255,
        expectedError: type_mismatch,
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.speed',
        validValues: [
          '1',
          '-100',
          '50',
          '100',
        ],
        invalidValues: [
          'invalid',
          'a100',
        ],
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.speed',
        validValues: [],
        invalidValues: [
          '101',
          '-101',
          '5000000',
          '-500',
        ],
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.text',
        validValues: [
          '1',
          '-1',
        ],
        invalidValues: [
          'invalid',
          'a100',
        ],
      });
      h.checkValidValues({
        cmi: cmi(),
        fieldName: 'cmi.student_preference.text',
        validValues: [],
        invalidValues: [
          '2',
          '-2',
        ],
      });

      /**
       * cmi.interactions Properties
       */
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.interactions._children',
        expectedValue: aicc_constants.interactions_children,
        expectedError: invalid_set,
      });
      h.checkInvalidSet({
        cmi: cmi(),
        fieldName: 'cmi.interactions._count', expectedValue: 0,
        expectedError: invalid_set,
      });

      it('should export JSON', () => {
        const cmiObj = cmi();
        cmiObj.objectives.childArray.push(new CMIObjectivesObject());
        cmiObj.interactions.childArray.push(new CMIInteractionsObject());
        cmiObj.evaluation.comments.childArray.push(
            new CMIEvaluationCommentsObject());
        cmiObj.student_data.tries.childArray.push(new CMITriesObject());
        expect(
            JSON.stringify(cmiObj),
        ).
            to.
            equal(
                '{"suspend_data":"","launch_data":"","comments":"","comments_from_lms":"","core":{"student_id":"","student_name":"","lesson_location":"","credit":"","lesson_status":"","entry":"","total_time":"","lesson_mode":"normal","exit":"","session_time":"00:00:00","score":{"raw":"","min":"","max":"100"}},"objectives":{"0":{"id":"","status":"","score":{"raw":"","min":"","max":"100"}}},"student_data":{"mastery_score":"","max_time_allowed":"","time_limit_action":"","tries":{"0":{"status":"","time":"","score":{"raw":"","min":"","max":"100"}}}},"student_preference":{"audio":"","language":"","speed":"","text":""},"interactions":{"0":{"id":"","time":"","type":"","weighting":"","student_response":"","result":"","latency":"","objectives":{},"correct_responses":{}}},"evaluation":{"comments":{"0":{"content":"","location":"","time":""}}}}');
      });
    });

    describe('CMITriesObject Tests', () => {
      const triesObject = () => {
        return new CMITriesObject();
      };
      const triesInitialized = () => {
        const cmi = new CMITriesObject();
        cmi.initialize();
        return cmi;
      };

      /**
       * cmi.interactions.n.objectives.n object
       */
      h.checkRead({
        cmi: triesObject(),
        fieldName: 'cmi.status',
      });
      h.checkRead({
        cmi: triesInitialized(),
        fieldName: 'cmi.status',
      });
      h.checkValidValues({
        cmi: triesObject(),
        fieldName: 'cmi.status',
        validValues: [
          'passed',
          'completed',
          'failed',
          'incomplete',
          'browsed',
          'not attempted',
        ],
        invalidValues: [
          'P',
          'f',
          'complete',
          'started',
          'in progress',
        ],
      });
      h.checkReadAndWrite({
        cmi: triesObject(),
        fieldName: 'cmi.time',
        expectedError: write_only,
        valueToTest: '23:59:59',
      });
      h.checkValidValues({
        cmi: triesObject(),
        fieldName: 'cmi.time',
        validValues: [
          '15:00:30',
          '00:50:30',
          '23:00:30',
        ],
        invalidValues: [
          '-00:00:30',
          '0:50:30',
          '23:00:30.',
        ],
      });

      /**
       * cmi.student_data.tries.n.score Properties
       */
      h.checkInvalidSet({
        cmi: triesObject(),
        fieldName: 'cmi.score._children',
        expectedValue: aicc_constants.score_children,
        expectedError: invalid_set,
      });
      h.checkValidValues({
        cmi: triesObject(),
        fieldName: 'cmi.score.raw',
        validValues: [
          '0',
          '25.1',
          '50.5',
          '75',
          '100',
        ],
        invalidValues: [
          '-1',
          '101',
        ],
      });
      h.checkValidValues({
        cmi: triesObject(),
        fieldName: 'cmi.score.min',
        validValues: [
          '0',
          '25.1',
          '50.5',
          '75',
          '100',
        ],
        invalidValues: [
          '-1',
          '101',
        ],
      });
      h.checkValidValues({
        cmi: triesObject(),
        fieldName: 'cmi.score.max',
        validValues: [
          '0',
          '25.1',
          '50.5',
          '75',
          '100',
        ],
        invalidValues: [
          '-1',
          '101',
        ],
      });

      it('should export JSON', () => {
        const cmi = triesObject();
        expect(
            JSON.stringify(cmi),
        ).
            to.
            equal(
                '{"status":"","time":"","score":{"raw":"","min":"","max":"100"}}');
      });
    });

    describe('CMIEvaluationCommentsObject Tests', () => {
      const evaluationComment = () => {
        return new CMIEvaluationCommentsObject();
      };

      /**
       * cmi.evaluation.comments.n object
       */
      h.checkFieldConstraintSize({
        cmi: evaluationComment(),
        fieldName: 'cmi.content',
        expectedError: type_mismatch,
        limit: 255,
      });
      h.checkFieldConstraintSize({
        cmi: evaluationComment(),
        fieldName: 'cmi.location',
        expectedError: type_mismatch,
        limit: 255,
      });
      h.checkReadAndWrite({
        cmi: evaluationComment(),
        fieldName: 'cmi.time',
        expectedError: write_only,
        valueToTest: '23:59:59',
      });
      h.checkValidValues({
        cmi: evaluationComment(),
        fieldName: 'cmi.time',
        validValues: [
          '15:00:30',
          '00:50:30',
          '23:00:30',
        ],
        invalidValues: [
          '-00:00:30',
          '0:50:30',
          '23:00:30.',
        ],
      });

      it('should export JSON', () => {
        const cmi = evaluationComment();
        expect(
            JSON.stringify(cmi),
        ).to.equal('{"content":"","location":"","time":""}');
      });
    });

    describe('NAV Tests', () => {
      const nav = () => {
        return new NAV();
      };

      /**
       * cmi.interactions.n.correct_responses.n object
       */
      h.checkValidValues({
        cmi: nav(),
        fieldName: 'cmi.event',
        validValues: [
          'previous',
          'continue',
        ],
        invalidValues: [
          'P',
          'f',
          'complete',
          'started',
          'in progress',
        ],
      });

      it('should export JSON', () => {
        const cmi = nav();
        expect(
            JSON.stringify(cmi),
        ).to.equal('{"event":""}');
      });
    });
  });
});