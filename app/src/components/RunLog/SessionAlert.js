// @flow
import * as React from 'react'
import { AlertItem } from '@opentrons/components'
import type { SessionStatus } from '../../robot'

type Props = {
  sessionStatus: SessionStatus,
  className?: string,
  onResetClick: () => mixed,
}

export default function SessionAlert(props: Props) {
  const { sessionStatus, className, onResetClick } = props

  switch (sessionStatus) {
    case 'finished':
      return (
        <AlertItem
          className={className}
          type="success"
          title={
            <p>
              Run complete! <a onClick={onResetClick}>Reset run</a> to run
              protocol again.
            </p>
          }
        />
      )

    case 'paused':
      return (
        <AlertItem
          className={className}
          type="info"
          icon={{ name: 'pause-circle' }}
          title="Run paused"
        />
      )

    case 'stopped':
      return (
        <AlertItem
          className={className}
          type="warning"
          title={
            <p>
              Run canceled. <a onClick={onResetClick}>Reset run</a> to run
              protocol again.
            </p>
          }
        />
      )

    case 'error':
      return (
        <AlertItem
          className={className}
          type="error"
          title={
            <p>
              Run encountered an error. <a onClick={onResetClick}>Reset run</a>{' '}
              to run protocol again. Please contact support if you need help
              resolving this issue.
            </p>
          }
        />
      )

    default:
      return null
  }
}
