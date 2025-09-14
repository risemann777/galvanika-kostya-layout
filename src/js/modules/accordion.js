const accordion = () => {
  const accordionNodeList = document.querySelectorAll('.accordion')
  const classes = {
    expanded: 'accordion__item--expanded',
    item: 'accordion__item',
    head: 'accordion__head',
    body: 'accordion__body',
    arrow: 'accordion__arrow',
    collapse: 'accordion__collapse',
    collapsing: 'accordion__collapse--collapsing',
  }

  const toggle = (item) => {
    const itemBody = item.querySelector(`.${classes.body}`)
    const collapse = item.querySelector(`.${classes.collapse}`)

    if(!item.classList.contains(classes.expanded)) {
      collapse.style.display = 'block'
      collapse.classList.add(classes.collapsing)
      const height = getComputedStyle(itemBody).height
      item.classList.add(classes.expanded)
      collapse.style.height = `${height}`

      setTimeout(() => {
        collapse.removeAttribute('style')
        collapse.classList.remove(classes.collapsing)
      }, 300)
    } else {
      collapse.style.display = 'block'
      const height = getComputedStyle(itemBody).height
      collapse.classList.add(classes.collapsing)
      item.classList.remove(classes.expanded)
      collapse.style.height = `${height}`

      setTimeout(() => {
        collapse.style.height = 0

        setTimeout(() => {
          collapse.removeAttribute('style')
          collapse.classList.remove(classes.collapsing)
        }, 300)
      }, 1)
    }
  }

  if (accordionNodeList) {
    accordionNodeList.forEach((wrapper) => {
      const items = wrapper.querySelectorAll(`.${classes.item}`)

      if (items) {
        items.forEach((item) => {
          const head = item.querySelector(`.${classes.head}`)

          head.addEventListener('click', () => {
            toggle(item)
          })
        })
      }
    })
  }
}

export default accordion