import { storage } from './firebase'

export const uploadImage = (collection, file) => {
  const path = (collection + '/' + new Date() + '' + file.name).replace(
    / /g,
    ''
  )
  const ref = storage.ref(path)
  return ref.put(file).then(snapshot => ref.getDownloadURL().then(url => url))
}
