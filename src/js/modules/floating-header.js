export default function floatingHeader() {
  const header = document.querySelector('.header--floating')

  if (!header) return console.warn(`Element width class "header--floating" not found`)

  let lastScrollPosition = window.scrollY
  let upScrollDiff = 0
  const classNames = {
    hidden: 'header--hidden',
    fill: 'header--fill',
    fillShow: 'header--fill-show',
  }

  const doFloat = (scrollPos) => {
    if (header) {
      let direction

      if (scrollPos === 0 && header.classList.contains(classNames.hidden)) {
        header.classList.remove(classNames.hidden)
      }

      if (header.classList.contains(classNames.fill)) {
        if (scrollPos >= 300) {
          header.classList.add(classNames.fillShow)
        } else {
          header.classList.remove(classNames.fillShow)
        }
      }

      if (lastScrollPosition < scrollPos) {
        direction = 'down'
        upScrollDiff = 0
      } else {
        direction = 'up'
        upScrollDiff += lastScrollPosition - scrollPos
      }

      if (direction === 'down' && scrollPos >= 100) {
        if (!header.classList.contains(classNames.hidden)) {
          header.classList.add(classNames.hidden)
        }
      }

      if (direction === 'up' && upScrollDiff >= 150) {
        if (header.classList.contains(classNames.hidden)) {
          header.classList.remove(classNames.hidden)
        }
      }
    }
  }

  window.addEventListener('load', () => {
    if (header && header.classList.contains(classNames.hidden) && window.scrollY <= 10) {
      setTimeout(() => {header.classList.remove(classNames.hidden)}, 500)
    }
  })

  window.addEventListener('scroll', () => {
    doFloat(window.scrollY)
    lastScrollPosition = window.scrollY
  })
}