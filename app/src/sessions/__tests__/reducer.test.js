// @flow
import * as Fixtures from '../__fixtures__'
import { sessionReducer } from '../reducer'

import type { Action } from '../../types'
import type { SessionState } from '../types'

type ReducerSpec = {|
  name: string,
  state: SessionState,
  action: Action,
  expected: SessionState,
|}

const SPECS: Array<ReducerSpec> = [
  {
    name: 'handles sessions:CREATE_SESSION_SUCCESS',
    action: {
      type: 'sessions:CREATE_SESSION_SUCCESS',
      payload: {
        robotName: 'eggplant-parm',
        ...Fixtures.mockSessionResponse,
      },
      meta: {},
    },
    state: {
      'eggplant-parm': {
        robotSessions: {},
      },
    },
    expected: {
      'eggplant-parm': {
        robotSessions: {
          '1234': Fixtures.mockSessionResponse.data.attributes,
        },
      },
    },
  },
  {
    name: 'handles sessions:CREATE_SESSION_SUCCESS with existing',
    action: {
      type: 'sessions:CREATE_SESSION_SUCCESS',
      payload: {
        robotName: 'eggplant-parm',
        ...Fixtures.mockSessionResponse,
      },
      meta: {},
    },
    state: {
      'eggplant-parm': {
        robotSessions: {
          '4321': Fixtures.mockSessionResponse.data.attributes,
        },
      },
    },
    expected: {
      'eggplant-parm': {
        robotSessions: {
          '4321': Fixtures.mockSessionResponse.data.attributes,
          '1234': Fixtures.mockSessionResponse.data.attributes,
        },
      },
    },
  },
  {
    name: 'handles sessions:FETCH_SESSION_SUCCESS',
    action: {
      type: 'sessions:FETCH_SESSION_SUCCESS',
      payload: {
        robotName: 'eggplant-parm',
        ...Fixtures.mockSessionResponse,
      },
      meta: {},
    },
    state: {
      'eggplant-parm': {},
    },
    expected: {
      'eggplant-parm': {
        robotSessions: {
          '1234': Fixtures.mockSessionResponse.data.attributes,
        },
      },
    },
  },
  {
    name: 'handles sessions:FETCH_SESSION_SUCCESS with existing',
    action: {
      type: 'sessions:FETCH_SESSION_SUCCESS',
      payload: {
        robotName: 'eggplant-parm',
        ...Fixtures.mockSessionResponse,
      },
      meta: {},
    },
    state: {
      'eggplant-parm': {
        robotSessions: {
          '4321': Fixtures.mockSessionResponse.data.attributes,
        },
      },
    },
    expected: {
      'eggplant-parm': {
        robotSessions: {
          '1234': Fixtures.mockSessionResponse.data.attributes,
          '4321': Fixtures.mockSessionResponse.data.attributes,
        },
      },
    },
  },
  {
    name: 'handles sessions:DELETE_SESSION_SUCCESS',
    action: {
      type: 'sessions:DELETE_SESSION_SUCCESS',
      payload: {
        robotName: 'eggplant-parm',
        ...Fixtures.mockSessionResponse,
      },
      meta: {},
    },
    state: {
      'eggplant-parm': {
        robotSessions: {
          '4321': Fixtures.mockSessionAttributes,
          '1234': Fixtures.mockSessionAttributes,
        },
      },
    },
    expected: {
      'eggplant-parm': {
        robotSessions: {
          '4321': Fixtures.mockSessionAttributes,
        },
      },
    },
  },
]

describe('robotSessionReducer', () => {
  SPECS.forEach(spec => {
    const { name, state, action, expected } = spec
    it(name, () => expect(sessionReducer(state, action)).toEqual(expected))
  })
})
