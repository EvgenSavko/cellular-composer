import { useEffect } from 'react'

const ESCAPE = 'Escape'

const useEscapeHook = (callBack, trigger) => {
  const handlePressDown = async ({ code }) => {
    if (code === ESCAPE) {
      await callBack()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handlePressDown)
    return () => {
      document.removeEventListener('keydown', handlePressDown)
    }
  }, [trigger])

  return {}
}

export default useEscapeHook
