// @flow

export type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE'

// api call + response types

export type RobotHost = {
  name: string,
  ip: string,
  port: number,
}

export type RobotApiRequestOptions = {|
  method: Method,
  path: string,
  body?: { ... },
  query?: { [param: string]: string | boolean | number },
  form?: FormData,
|}

export type RobotApiResponseMeta = {|
  path: string,
  method: Method,
  status: number,
  ok: boolean,
|}

export type RobotApiResponse = {|
  ...RobotApiResponseMeta,
  host: RobotHost,
  body: any,
|}

export type RobotApiRequestMeta = $Shape<{|
  requestId: string,
  response: {|
    method: Method,
    path: string,
    status: number,
    ok: boolean,
  |},
|}>

export type RobotApiErrorResponse = {
  message: string,
  ...
}

// action types

export type DismissRequestAction = {|
  type: 'robotApi:DISMISS_REQUEST',
  payload: {| requestId: string |},
|}

export type RobotApiAction = DismissRequestAction

// API request tracking state

export type RequestState =
  | $ReadOnly<{| status: 'pending' |}>
  | $ReadOnly<{| status: 'success', response: RobotApiResponseMeta |}>
  | $ReadOnly<{|
      status: 'failure',
      response: RobotApiResponseMeta,
      error: { message?: string },
    |}>

export type RobotApiState = $Shape<
  $ReadOnly<{|
    [requestId: string]: void | RequestState,
  |}>
>

export type ResourceLink = {|
  href: string,
  meta?: $Shape<{| [string]: string | void |}>,
|}

export type ResourceLinks = $Shape<{| [string]: ResourceLink | string | void |}>

// generic response data supertype
export type RobotApiV2ResponseData = {|
  id: string,
  // the "+" means that these properties are covariant, so
  // "extending" types may specify more strict subtypes
  +type: string,
  +attributes: { ... },
|}

// parameterized response type
// DataT parameter must be a subtype of RobotApiV2ResponseData
// MetaT defaults to void if unspecified
export type RobotApiV2ResponseBody<
  DataT: RobotApiV2ResponseData,
  MetaT = void
> = {|
  data: DataT,
  links?: ResourceLinks,
  meta?: MetaT,
|}

export type RobotApiV2Error = {|
  id?: string,
  links?: ResourceLinks,
  status?: string,
  title?: string,
  detail?: string,
  source?: {|
    pointer?: string,
    parameter?: string,
  |},
  meta?: { ... },
|}

export type RobotApiV2ErrorResponseBody = {
  errors: Array<RobotApiV2Error>,
}
