/**
 * @typedef {'alert-warn' | 'alert-danger'} alertClass
 * @description alert function
 * @param {string} msg 
 * @param {alertClass} className 
 */
const alertMsg = (msg, className) => {
  const toast = document.createElement('div')
  toast.textContent = msg
  toast.classList.add('alert', className, 'show')

  document.body.prepend(toast)

  setTimeout(() => {
    toast.classList.remove('show')
    document.body.removeChild(toast)
  }, 3000)
}
