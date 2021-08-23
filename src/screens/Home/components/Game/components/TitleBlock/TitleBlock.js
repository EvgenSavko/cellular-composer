import React from 'react'
import PropTypes from 'prop-types'

import { Typography, Button, Spin, Radio } from 'antd'

const { Title } = Typography

const TitleBlock = ({
  viewTypeGame,
  amIGameCreator,
  gameName,
  loadingGame,
  loadingListGame,
  handleViewTypeGame,
  handleDeleteGame,
  logOutOfGame,
}) => {
  return (
    <div className="title-wrapper">
      <Title level={3}>
        GAME: "{gameName.name !== 'default' ? gameName.name : 'connect or create'}"{' '}
        {(loadingGame || loadingListGame) && <Spin size="small" />}
      </Title>
      <div className="init-game-action-block">
        {amIGameCreator && (
          <Button danger onClick={() => handleDeleteGame()}>
            <span className="submit-btn-text">Delete game</span>
          </Button>
        )}
        {gameName.name !== 'default' && (
          <Button danger onClick={() => logOutOfGame()}>
            <span className="submit-btn-text">Quit game</span>
          </Button>
        )}
      </div>
      {gameName.name === 'default' && (
        <Radio.Group value={viewTypeGame} onChange={handleViewTypeGame}>
          <Radio.Button value="2D">2D</Radio.Button>
          <Radio.Button value="3D">3D</Radio.Button>
        </Radio.Group>
      )}
    </div>
  )
}

TitleBlock.propTypes = {
  amIGameCreator: PropTypes.bool,
  gameName: PropTypes.shape({
    name: PropTypes.string,
  }),
  handleDeleteGame: PropTypes.func,
  handleViewTypeGame: PropTypes.func,
  loadingGame: PropTypes.bool,
  loadingListGame: PropTypes.bool,
  logOutOfGame: PropTypes.func,
  viewTypeGame: PropTypes.string,
}

export default TitleBlock
