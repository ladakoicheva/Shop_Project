import type { MessageItem } from "../type"
import styles from '../Admin.module.css'

type props = {
  date: string,
  messagesArr :MessageItem[]
}

export default function MessagesGroup({ date, messagesArr }: props) {

  return (

      <ul >
          <h1>{date}</h1>
          {messagesArr.map((messageItem) => <li key={messageItem.id}>{messageItem.message }</li>)}
      </ul>
  
    
  )
}
