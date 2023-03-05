export function copyLink(shareLink) {
  navigator.clipboard.writeText(shareLink).then(() => {
    alert('Copied link to clipboard!')
  })
}