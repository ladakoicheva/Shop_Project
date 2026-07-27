import type { MessageItem } from "../type"

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
