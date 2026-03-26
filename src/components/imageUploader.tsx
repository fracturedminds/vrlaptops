import { useState } from "react"
import { uploadImage } from '../services/cloudinaryServices'

export default function ImageUploader() {

  const [files, setFiles] = useState<File[]>([])

  const handleUpload = async () => {
    if (!files) return

    const imageUrls = []

    for(const file of files){
      const url = await uploadImage(file)
      imageUrls.push(url)
    }

    console.log(imageUrls)
  }

  return (
    <div>

      <input
        type="file"
        onChange={(e) => setFiles(Array.from(e.target.files|| []))}
      />

      <button onClick={handleUpload}>
        Upload Image
      </button>

    </div>
  )
}