import React from 'react'
import PropTypes from 'prop-types'

import { Spin, Alert } from 'antd'
import Portal from '@Components/Portal/Portal'

const LoadingAlert = ({ message, description }) => (
  <Portal id="portal-loading-user">
    <Spin tip="Loading...">
      <Alert message={message} description={description} type="info" />
    </Spin>
    )
  </Portal>
)

LoadingAlert.propTypes = {
  message: PropTypes.string,
  description: PropTypes.string,
}

export default LoadingAlert
