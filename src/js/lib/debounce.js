const debounce = (func, timeout) => {
  let timer

  return (event) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(func, timeout, event)
  }
}

export default debounce