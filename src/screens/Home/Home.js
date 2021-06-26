import React from 'react'

import { Spin, Space } from 'antd'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import firebase from '@Shared/firebase/firebase'
import ModalError from '@Components/ModalError'
import Game from './components/Game'

const Home = () => {
  const querySchools = firebase.firestore().collection('school')
  const [valueCollection, loading, error] = useCollectionData(querySchools)

  return (
    <div>
      {loading && (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      )}
      {error && <ModalError error={error} />}
      Home school - collection
      {valueCollection?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <br />
      <Game />
    </div>
  )
}

export default Home
