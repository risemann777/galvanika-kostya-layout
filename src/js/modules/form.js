import axios from "axios"

export default function form(){
  const forms = document.querySelectorAll('.form')
  const classes = {
    inputError: 'form__control--error',
    inputFocus: 'form__input--focus',
    inputErrorMessage: 'form__input_error',
    inputHasValue: 'form__input--has-value'
  }

  const sendEmail = async (data) => {
    try {
      return await axios.post(`/email/send`, data)
    } catch (e) {
      return e.response
    }
  }

  const renderFileInputs = (form) => {
    const fileFields = form.querySelectorAll('.input-file')

    if (fileFields) {
      fileFields.forEach(fileField => {
        const inputFile = fileField.querySelector('input[type="file"]')
        const nameSpan = fileField.querySelector('span')

        if (inputFile && nameSpan) {
          inputFile.addEventListener('change', () => {
            const file = inputFile.files[0]
            nameSpan.textContent = file.name
          })
        }
      })
    }
  }

  const clearFileInputs = (form) => {
    const fileFields = form.querySelectorAll('.input-file')

    if (fileFields) {
      fileFields.forEach(fileField => {
        const nameSpan = fileField.querySelector('span')

        if (nameSpan) {
          nameSpan.textContent = nameSpan.getAttribute('data-initial-name')
        }
      })
    }
  }

  const renderErrors = (fields, errors) => {
    if (fields) {
      fields.forEach(field => {
        const inputWrapper = field.querySelector('.form__input')
        const control = field.querySelector('.form__control')

        if (inputWrapper && control) {
          const fieldWithError = errors.find(error => error.field === control.getAttribute('name'))

          if (fieldWithError) {
            let inputErrorMessage = field.querySelector(`.${classes.inputErrorMessage}`)
            if (inputErrorMessage) {
              inputErrorMessage.remove()
            }

            inputErrorMessage = document.createElement('div')
            inputErrorMessage.classList.add(classes.inputErrorMessage)
            inputErrorMessage.textContent = fieldWithError.text
            inputWrapper.append(inputErrorMessage)
            control.classList.add(classes.inputError)
          }
        }
      })
    }
  }

  const checkPolicy = (form) => {
    const checkbox = form.querySelector('input[name="policy"]')
    const submit = form.querySelector('button[type="submit"]')
    clearFormMessages(form)
    const check = () => {
      if (checkbox.checked) {
        submit.removeAttribute('disabled')
      } else {
        submit.setAttribute('disabled', true)
      }
    }

    if (checkbox && submit) {
      check()
      checkbox.addEventListener('change', () => check())
    }
  }

  const clearError = (field) => {
    const control = field.querySelector('.form__control')
    const inputErrorMessage = field.querySelector(`.${classes.inputErrorMessage}`)
    control.classList.remove(classes.inputError)

    if (inputErrorMessage)
      inputErrorMessage.remove()
  }

  const showSuccessMessage = (form, messageText) => {
    const formMessagePlace = form.querySelector('.form__message')
    if (formMessagePlace) {
      const message = document.createElement('div')
      message.classList.add('form__message-success')
      message.textContent = messageText
      formMessagePlace.append(message)
    }
  }

  const clearFormMessages = (form) => {
    const formMessagePlace = form.querySelector('.form__message')
    if (formMessagePlace) {
      formMessagePlace.innerHTML = ''
    }
  }

  const resetForm = (form) => {
    const inputs = form.querySelectorAll('.form__input')

    if (inputs) {
      inputs.forEach(input => {
        input.classList.remove(classes.inputHasValue)
      })
    }

    clearFileInputs(form)
    form.reset()
  }

  if (forms) {
    forms.forEach(form => {
      const fields = form.querySelectorAll('.form__field')
      checkPolicy(form)
      renderFileInputs(form)

      form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        const response = await sendEmail(formData)

        if (response.status === 422) {
          renderErrors(fields, response.data)
        }

        if (response.status === 200) {
          showSuccessMessage(form, 'Сообщение успешно отправлено!')
          resetForm(form)
        }
      })

      if (fields) {
        fields.forEach(field => {
          const inputWrapper = field.querySelector('.form__input')
          const control = field.querySelector('.form__control')

          if (inputWrapper && control) {
            if (control.value.length > 0) {
              inputWrapper.classList.add(classes.inputHasValue)
            }

            control.addEventListener('focus', () => {
              inputWrapper.classList.add(classes.inputFocus)
            })

            control.addEventListener('blur', () => {
              inputWrapper.classList.remove(classes.inputFocus)
            })

            control.addEventListener('input', (e) => {
              const value = e.target.value
              clearError(field)
              clearFormMessages(form)

              if (value.length > 0) {
                inputWrapper.classList.add(classes.inputHasValue)
              } else {
                inputWrapper.classList.remove(classes.inputHasValue)
              }
            })
          }
        })
      }
    })
  }
}