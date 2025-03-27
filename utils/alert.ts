type AlertClass = 'alert-warn' | 'alert-danger'

export const alertMsg = (msg: string, className: AlertClass) => {
  const toast = document.createElement('div')
  toast.textContent = msg
  toast.classList.add('alert', className, 'show')

  document.body.prepend(toast)

  setTimeout(() => {
    toast.classList.remove('show')
    document.body.removeChild(toast)
  }, 3000)
}