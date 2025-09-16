import animation from "./modules/animation"
import accordion from "./modules/accordion"
import Modal from "./modules/modal.js"
import mobileMenu from './modules/mobile-menu.js'

document.addEventListener('DOMContentLoaded', () => {
  animation()
  mobileMenu()
  accordion()
  new Modal({closeOnEsc: true})
})

window.addEventListener('load', () => {
  const body = document.body
  body.classList.add('page--loaded')
})