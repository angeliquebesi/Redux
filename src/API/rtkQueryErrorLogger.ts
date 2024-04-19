import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'
import { notification } from 'antd'
/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  () => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')
      if (action.error) {
        notification.error({
          key: 'apiError',
          duration: 5,
          description: 'Async error!',
          message:
            'data' in action.error
              ? (action.error.data as { message: string }).message
              : action.error.message,
        })
      }
    }

    return next(action)
  }