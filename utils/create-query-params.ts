export default (fields: Record<string, any>) => {
  return Object.entries(fields).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value.toString()
    }
    return acc
  }, {} as Record<string, string>)
}
