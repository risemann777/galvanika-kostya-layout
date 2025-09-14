export default function openButton() {
  const buttons = document.querySelectorAll('[data-open]')

  if (buttons) {
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        const url = button.getAttribute('data-open')

        if (url) {
          window.open(url, '_blank')
        }
      })
    })
  }
}