import animation from "./modules/animation"
import form from "./modules/form"
import accordion from "./modules/accordion"
import Modal from "./modules/modal.js"
import floatingHeader from "./modules/floating-header"
// import Lenis from 'lenis'
import mobileMenu from './modules/mobile-menu.js'

document.addEventListener('DOMContentLoaded', () => {
  animation()
  mobileMenu()
  form()
  accordion()
  floatingHeader()
  new Modal({closeOnEsc: true})

  // Initialize Lenis
  /*
  new Lenis({
    autoRaf: true,
    duration: 1.5
  })
  */
})

window.addEventListener('load', () => {
  const body = document.body
  body.classList.add('page--loaded')
})