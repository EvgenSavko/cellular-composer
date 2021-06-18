import React from 'react'

import { Spin, Space } from 'antd'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import firebase from '@Shared/firebase/firebase'
import { useAuth } from '@Shared/context/AuthContext'
import Button from '@Components/Button/Button'
import ModalError from '@Components/ModalError'

const querySchools = firebase.firestore().collection('school')

const Home = () => {
  const [valueCollection, loading, error] = useCollectionData(querySchools)
  const { currentUser } = useAuth()

  return (
    <div>
      {loading && (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      )}
      {error && <ModalError error={error} />}
      Home
      <Button title="submit" type="primary" />
      <div className="test-color">
        <Button title="test" type="primary" />
      </div>
      {valueCollection?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}

export default Home
