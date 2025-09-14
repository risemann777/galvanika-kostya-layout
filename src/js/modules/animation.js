import mobileDetect from "../lib/mobile-detect.js"

export default function animation() {
  const body = document.body

  if (mobileDetect()) {
    body.classList.add('page--mobile')
  } else {
    body.classList.add('page--desktop')
  }
}