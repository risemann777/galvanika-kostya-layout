export default class Modal {
  constructor(options = {}) {
    this.options = options
    this.options.closeOnEsc = options?.closeOnEsc || false

    this.buttons = document.querySelectorAll('[data-toggle="modal"]')
    this.modals = document.querySelectorAll('.modal')
    this.body = document.body

    this.buttons.forEach(button => {
      button.addEventListener("click", () => {
        const target = button.dataset.target
        this.show(target)
      })
    })

    window.addEventListener('click', (e) => {
      const {dismiss} = e.target.dataset

      if (dismiss === 'modal') {
        const modal = e.target.closest('.modal')
        if (modal) this.close(modal)
      }
    })

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.options.closeOnEsc) {
        this.modals.forEach(modal => {
          if (modal.classList.contains('modal--show')) {
            this.close(modal)
          }
        })
      }
    })
  }

  switchBodyOverflow = (fixed) => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    if (fixed) {
      if (scrollbarWidth) this.body.style.paddingRight = scrollbarWidth + 'px'
      this.body.style.overflow = 'hidden'
      this.body.classList.add('modal-open')
    } else {
      if (this.body.style.paddingRight) {
        this.body.style.removeProperty('padding-right')
      }
      this.body.style.removeProperty('overflow')
      this.body.classList.remove('modal-open')
    }
  }

  show = (id) => {
    const modal = document.querySelector(id)

    if (!modal) {
      return console.warn(`Modal id = "${id}" does not exist`)
    }

    const modalHasAnimation = modal.classList.contains('modal--fade') || modal.classList.contains('modal--zoom')

    modal.style.display = 'block'
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.setAttribute('role', 'dialog')
    this.switchBodyOverflow(true)

    if (modalHasAnimation) {
      setTimeout(() => {
        modal.classList.add('modal--show')
      }, 150)
    } else {
      modal.classList.add('modal--show')
    }
  }

  close = (modal) => {
    if (!modal) {
      return console.warn(`Modal you want to close is not found`)
    }

    const modalHasAnimation = modal.classList.contains('modal--fade') || modal.classList.contains('modal--zoom')
    const video = modal.querySelector('.video')

    modal.removeAttribute('aria-modal')
    modal.removeAttribute('role', 'dialog')
    modal.classList.remove('modal--show')

    if (video && !video.paused && !video.ended && video.readyState > 2) {
      video.pause()
    }

    if (modalHasAnimation) {
      setTimeout(() => {
        modal.style.display = 'none'
        this.switchBodyOverflow(false)
      }, 150)
    } else {
      modal.style.display = 'none'
      this.switchBodyOverflow(false)
    }

    setTimeout(() => {
      modal.setAttribute('aria-hidden', 'true')
    }, 200)
  }
}