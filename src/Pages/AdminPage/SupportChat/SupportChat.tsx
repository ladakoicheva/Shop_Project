import styles from '../Admin.module.css';
import type { messageDataI } from '../type';
import { useParams } from 'react-router-dom';
import type { Params } from 'react-router-dom';
import { getDateDDMMYYYY } from '../../../utils/getDate';
import { formatTime } from '../../../utils/formatTime';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { MessageItem } from '../../../redux/supportChat/type';
import { scrollDown } from '../../../utils/scroll';
import { adminReadMessage } from '../../../services/firebase/db/support';
import FileBtn from '../FileBtn';
import '../file.css';

type props = {
  messages: messageDataI;
  changeInputValue: (value: string) => void;
  inputValue: string;
  sendMessage: (email: string, file: File | null) => void;
  isEditing: { is: boolean; time: string };
  setIsEditing: (data: { is: boolean; time: string }) => void;
  editMessage: (email: string, message: string, time: string) => void;
  deleteMessage: (email: string, message: MessageItem, time: string) => void;
  isAiThinking?: boolean;
  isAiAutoReplyEnabled?: boolean;
  onToggleAiAutoReply?: () => void;
  onGenerateAiSuggestion?: () => void;
};

export default function SupportChat({
  messages,
  changeInputValue,
  inputValue,
  sendMessage,
  editMessage,
  isEditing,
  setIsEditing,
  deleteMessage,
  isAiThinking = false,
  isAiAutoReplyEnabled = false,
  onToggleAiAutoReply,
  onGenerateAiSuggestion,
}: props) {
  const params = useParams<Params<string>>();
  const email = params.email || ('' as string);
  const ref = useRef(null);
  const [file, setFile] = useState<{ imgFile: File; url: string } | null>(null);

  const getFile = (data: { imgFile: File; url: string } | null) => {
    setFile(data);
  };

  const handleSend = () => {
    if (isEditing.is) {
      editMessage(email, inputValue, isEditing.time);
    } else {
      if (!inputValue.trim() && !file?.imgFile) return;
      sendMessage(email, file?.imgFile || null);
      setFile(null);
    }
  };

  const messagesMemo = useMemo(() => {
    const editMsg = (messageText: string, time: string) => {
      setIsEditing({ is: true, time });
      changeInputValue(messageText);
    };
    const userMessages = messages[email] || {};
    const mess = { ...userMessages };
    delete mess.isIncoming;
    delete mess.isIncomingAdmin;
    if (Object.keys(mess).length === 0) return <div>Начните диалог...</div>;

    let currentDate = '';
    const times = Object.keys(mess);
    times.sort((a, b) => Number(a) - Number(b));

    const showMessages = times.map((time: string) => {
      //@ts-ignore
      const messageItem = mess[time] as MessageItem;
      const date = getDateDDMMYYYY(+time);
      const formatedTime = formatTime(+time);
      const isNeededDate = date !== currentDate;
      currentDate = date;

      return (
        <li key={time} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          {isNeededDate && (
            <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, margin: '8px 0' }}>
              {currentDate}
            </div>
          )}

          <div
            onDoubleClick={() => (messageItem.is ? editMsg(messageItem.message, time) : null)}
            className={messageItem.is ? styles.messageAdmin : styles.messageClient}
          >
            {messageItem.file && (
              <a href={messageItem.file} target="_blank" rel="noopener noreferrer">
                <img className={styles.fileImg} src={messageItem.file} alt="attachment" />
              </a>
            )}
            {messageItem.message && <div>{messageItem.message}</div>}

            <span className={styles.msgTime}>{formatedTime}</span>

            <span
              className={styles.deleteIcon}
              onClick={(e) => {
                e.stopPropagation();
                deleteMessage(email, messageItem, time);
              }}
              title="Удалить сообщение"
            >
              ×
            </span>
          </div>
        </li>
      );
    });
    return showMessages;
  }, [email, messages, changeInputValue, deleteMessage, setIsEditing]);

  useEffect(() => {
    scrollDown(ref);
  }, [messagesMemo, messages, email, isAiThinking]);

  useEffect(() => {
    if (email && messages[email]?.isIncomingAdmin) {
      adminReadMessage(email);
    }
  }, [email, messages]);

  return (
    <div className={styles.supportChat}>
      <div className={styles.chatHeader}>
        <h1>{params.email}</h1>
        <div className={styles.aiHeaderControls}>
          <button
            type="button"
            className={`${styles.aiAutoReplyBtn} ${isAiAutoReplyEnabled ? styles.aiActive : ''}`}
            onClick={onToggleAiAutoReply}
            title="Автоматические ответы ИИ на новые сообщения клиента"
          >
            🤖 {isAiAutoReplyEnabled ? 'Авто-ответ ИИ: ВКЛ' : 'Авто-ответ ИИ: ВЫКЛ'}
          </button>
          <button
            type="button"
            className={styles.aiSuggestBtn}
            onClick={onGenerateAiSuggestion}
            disabled={isAiThinking}
            title="Сгенерировать ответ с помощью ИИ"
          >
            ✨ Сгенерировать ответ
          </button>
        </div>
      </div>

      <div ref={ref} className={styles.groupWrapper}>
        <ul>{messagesMemo}</ul>
        {isAiThinking && (
          <div className={styles.aiThinkingIndicator}>
            <span className={styles.aiPulse}>🤖</span> ИИ генерирует ответ...
          </div>
        )}
      </div>

      <div className={styles.messageInput}>
        <input
          onChange={(e) => changeInputValue(e.target.value)}
          placeholder="Напишите сообщение..."
          type="text"
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />

        <div className={styles.sendBtns}>
          <FileBtn getFile={getFile} attachedFile={file} />
          <button onClick={handleSend} className={styles.sendBtn}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}