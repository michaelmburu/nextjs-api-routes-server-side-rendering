import { useState } from 'react'
import { buildFilePath, extractFeedback } from '../api/feedback'
const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState()

  const loadFeedbackHandler = (id) => {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback)
      })
  }
  return (
    <>
    {feedbackData && <p>{feedbackData.email}: {feedbackData.text}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.email}: {item.text}{' '}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps = () => {
  const feedbackPath = buildFilePath()
  const data = extractFeedback(feedbackPath)
  return {
    props: {
      feedbackItems: data,
    },
  }
}

export default FeedbackPage
