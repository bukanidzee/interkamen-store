import timeout from './timeout';

export const makeSearchDelay = (callback, initialValue, time) => {
  const action = async (verifyValueRef) => {
    await timeout(time)
    if (verifyValueRef.current.value == initialValue){
      await callback()
    }
  }

  return action

}
