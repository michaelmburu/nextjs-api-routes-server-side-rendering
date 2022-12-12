import fs from 'fs'
import path from 'path'

export const buildFilePath = () => {
  const filePath = path.join(process.cwd(), 'data', 'feedback.json')
  return filePath
}

export const extractFeedback = (filePath) => {
  const fileData = fs.readFileSync(filePath)
  const data = JSON.parse(fileData)
  return data
}
const handler = (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email
    const feedbackText = req.body.text

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    }

    //Store in database or a file
    const filePath = buildFilePath()

    //Get data
    const data = extractFeedback(filePath)
    data.push(newFeedback)

    fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(201).json({ message: 'Success: ', newFeedback })
  } else {
    const filePath = buildFilePath()
    const data = extractFeedback(filePath)
    res.status(200).json({ feedback: data })
  }
}

export default handler
