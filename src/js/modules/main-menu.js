export default function mainMenu() {
  document.addEventListener('click', (e) => {
    const body = document.body
    const composedPath = e.composedPath()
    const wrapper = body.querySelector('.main-menu')
    const hamburger = body.querySelector('.hamburger')

    if (wrapper) {
      const clickOutside = !composedPath.includes(wrapper) && !composedPath.includes(hamburger)

      if (clickOutside) {
        body.classList.remove('menu-opened')
      }

      if (e.target === hamburger) {
        body.classList.toggle('menu-opened')
      }
    }
  })
}