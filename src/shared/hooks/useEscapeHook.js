import { useEffect } from 'react'

const ESCAPE = 'Escape'

const useEscapeHook = (callBack) => {
  const handlePressDown = ({ code }) => {
    if (code === ESCAPE) callBack()
  }

  useEffect(() => {
    document.addEventListener('keydown', handlePressDown)
    return () => {
      document.removeEventListener('keydown', handlePressDown)
    }
  }, [])

  return {}
}

export default useEscapeHook
