import React from 'react'

import {
  HomeOutlined,
  LogoutOutlined,
  SmileOutlined,
  AppstoreAddOutlined,
  ProfileOutlined,
  MessageOutlined,
} from '@ant-design/icons'

const routes = [
  {
    key: 'home',
    url: '/',
    label: 'Home',
    icon: <HomeOutlined />,
  },
  {
    key: 'message',
    url: '/message',
    label: 'Message',
    icon: <MessageOutlined />,
  },
  {
    key: 'about',
    url: '/about',
    label: 'About us',
    icon: <SmileOutlined />,
  },
  {
    key: 'profile',
    url: '/profile',
    label: 'Profile',
    icon: <ProfileOutlined />,
  },
  {
    key: 'studio',
    url: '/studio',
    label: 'Studio',
    icon: <AppstoreAddOutlined />,
  },
  {
    key: 'logout',
    url: '/logout',
    label: 'Logout',
    icon: <LogoutOutlined />,
  },
]

export default routes
