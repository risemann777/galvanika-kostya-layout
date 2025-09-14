import Swiper from "swiper"
import {Pagination} from 'swiper/modules'
import inputMask from "./modules/inputMask.js"

document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.slider', {
    modules: [Pagination],
    pagination: {
      el: '.swiper-pagination',
    },
  })
  inputMask()
})