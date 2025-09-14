import IMask from 'imask'

export default function inputMask() {

  const phoneMaskOptions = {
    mask: '+{7} (000) 000-00-00'
  }

  const phoneNameInputs = document.querySelectorAll('input[name="phone"]')
  const phoneTypeTelInputs = document.querySelectorAll('input[type="tel"]')

  if (phoneNameInputs.length > 0) {
    phoneNameInputs.forEach(input => {
      IMask(input, phoneMaskOptions)
    })
  }

  if (phoneTypeTelInputs.length > 0) {
    phoneTypeTelInputs.forEach(input => {
      IMask(input, phoneMaskOptions)
    })
  }
}