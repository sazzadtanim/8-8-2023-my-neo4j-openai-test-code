async function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

async function minDelay<T>(promise: Promise<T>, ms: number) {
  let [p] = await Promise.all([promise, sleep(ms)])
  return p
}

export { minDelay, sleep }

