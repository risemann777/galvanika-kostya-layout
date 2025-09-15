import Swiper from "swiper"
import {Pagination, Navigation} from 'swiper/modules'
import inputMask from "./modules/inputMask.js"

document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.hero__slider', {
    modules: [Pagination],
    pagination: {
      el: '.swiper-pagination',
    },
  })

  const serviceSlider = document.querySelectorAll('.service__slider')

  if (serviceSlider) {
    new Swiper('.service__slider', {
      modules: [Pagination, Navigation],
      spaceBetween: 30,
      slidesPerView: 1,
      breakpoints: {
        576: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1366: {
          slidesPerView: 4,
        },
      },
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  }

  inputMask()
})