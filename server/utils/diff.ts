export function getUpdatedFields<T extends Record<string, any>>(
  oldData: T,
  newData: T,
  ignore: (keyof T)[] = []
): Partial<T> {
  const diff: Partial<T> = {}

  for (const key in newData) {
    if (ignore.includes(key as keyof T)) continue
    if (newData[key] !== oldData[key]) {
      diff[key] = newData[key]
    }
  }

  return diff
}
