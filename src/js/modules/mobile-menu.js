export default function mobileMenu(props) {
  const classes = {
    wrapper: 'mobile-menu',
    container: 'mobile-menu__container',
    backdrop: 'mobile-menu__backdrop',
    hamburger: 'hamburger',
    menuOpened: 'mobile-menu-opened',
    menuShow: 'mobile-menu--show',
    header: 'header'
  }
  const body = document.body
  const wrapper = body.querySelector(`.${classes.wrapper}`)
  const backdrop = body.querySelector(`.${classes.backdrop}`)
  const hamburger = body.querySelector(`.${classes.hamburger}`)

  if (!wrapper) return console.warn(`Block ".${classes.wrapper}" is not exists!`)
  if (!hamburger) return console.warn(`Block ".${classes.hamburger}" is not exists!`)

  const menuLinks = wrapper.querySelectorAll('.mobile-menu__link')

  const lenis = props?.lenis || null

  const setContainerPadding = () => {
    const header = body.querySelector(`.${classes.header}`)

    if (header) {
      wrapper.style.setProperty(`--${classes.wrapper}-container-padding`, `${header.clientHeight}px`)
    }
  }

  setContainerPadding()

  const switchBodyOverflow = (fixed) => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    if (fixed) {
      if (scrollbarWidth) body.style.paddingRight = scrollbarWidth + 'px'
      body.style.overflow = 'hidden'
      body.classList.add(classes.menuOpened)
    } else {
      if (body.style.paddingRight) {
        body.style.removeProperty('padding-right')
      }
      body.style.removeProperty('overflow')
      body.classList.remove(classes.menuOpened)
    }
  }

  const close = () => {
    wrapper.classList.remove(classes.menuShow)

    setTimeout(() => {
      wrapper.style.display = 'none'
      switchBodyOverflow(false)
    }, 250)
  }

  const open = () => {
    wrapper.style.display = 'block'
    switchBodyOverflow(true)

    setTimeout(() => {
      wrapper.classList.add(classes.menuShow)
    }, 150)
  }

  if (menuLinks) {
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.hasAttribute('data-smooth-scroll') && lenis) {
          e.preventDefault()
          const id = link.getAttribute('href')

          if (!id) return false

          const target = body.querySelector(id)

          if (target) {
            lenis.scrollTo(id)
          }
        }
        close()
      })
    })
  }

  document.addEventListener('click', (e) => {
    const composedPath = e.composedPath()
    const clickOutside = !composedPath.includes(wrapper) && !composedPath.includes(hamburger)

    if (clickOutside) {
      close()
    }

    if (backdrop && e.target === backdrop) {
      close()
    }

    if (e.target === hamburger) {
      if(wrapper.classList.contains(classes.menuShow)) {
        close()
      } else {
        open()
      }
    }
  })
}