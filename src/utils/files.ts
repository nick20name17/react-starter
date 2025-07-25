export const downloadFile = async (url: string, filename: string): Promise<void> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.statusText}`)
  }

  const blob = await response.blob()
  const link = document.createElement('a')

  link.href = URL.createObjectURL(blob)
  link.download = filename

  document.body.appendChild(link)

  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(link.href)
}

export const formatBytes = (bytes: number): string => {
  const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte']

  const unitIndex = Math.max(0, Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1))

  return Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: units[unitIndex]
  }).format(+Math.round(bytes / 1024 ** unitIndex))
}
