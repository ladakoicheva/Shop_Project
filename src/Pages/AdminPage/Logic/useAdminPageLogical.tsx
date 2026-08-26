import type { messageDataI } from '../type';
import { useEffect, useRef, useState } from 'react';
import { adminSendMessage } from '../../../services/firebase/db/support';
import { connectLiveChatAdmin } from '../../../services/firebase/socket/chat';
import { adminEditMessage } from '../../../services/firebase/db/support';
import { useAppSelector } from '../../../redux/type';
import { adminDeleteMessage } from '../../../services/firebase/db/support';
import type { MessageItem } from '../../../redux/supportChat/type';
import { generateSupportReply } from '../../../services/ai/gemini';

export default function useAdminPageLogical() {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<messageDataI>({});
  const [isEditing, setIsEditing] = useState({ is: false, time: '' });
  const { user } = useAppSelector((s) => s.auth);

  useEffect(() => {
    const callback = (data: messageDataI) => {
      setMessages(data);
    };
    const unsubscribe = connectLiveChatAdmin(callback);
    return unsubscribe;
  }, []);

  const sendMessage = async (email: string, file: File | null) => {
    if (inputValue.trim() === '' && !file) return;
    const textToSend = inputValue;
    setInputValue('');
    const res = await adminSendMessage(email, textToSend, file, user?.uid || '');
    if (!res.ok) {
      setInputValue(textToSend);
    }
  };

  const changeInputValue = (value: string) => {
    setInputValue(value);
  };

  const editMessage = async (email: string, message: string, time: string) => {
    const res = await adminEditMessage(email, message, time);
    if (res.ok) {
      setInputValue('');
      setIsEditing({ is: false, time: '' });
    }
  };

  const deleteMessage = async (email: string, message: MessageItem, time: string) => {
    await adminDeleteMessage(email, message, time, user?.uid || '');
  };

  const setEdit = (data: { is: boolean; time: string }) => {
    setIsEditing(data);
  };

  const [isAiThinking, setIsThinking] = useState<boolean>(false);
  const [aiAutoReplyMap, setAiAutoReplyMap] = useState<{ [email: string]: boolean }>({});
  const processedAiRepliesRef = useRef<Set<string>>(new Set());
  const isAutoReplyingLockRef = useRef<{ [email: string]: boolean }>({});

  const toggleAiAutoReply = (email: string) => {
    setAiAutoReplyMap((prev) => ({
      ...prev,
      [email]: !prev[email],
    }));
  };

  const generateAiSuggestion = async (email: string) => {
    if (!messages[email]) return;
    setIsThinking(true);
    try {
      const aiReply = await generateSupportReply(messages[email], email);
      setInputValue(aiReply);
    } catch (error) {
      console.error('Error generating AI suggestion:', error);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    const runAutoReply = async () => {
      const activeEmails = Object.keys(aiAutoReplyMap).filter((e) => aiAutoReplyMap[e]);

      for (const email of activeEmails) {
        if (!messages[email] || isAutoReplyingLockRef.current[email]) continue;
        const userChat = messages[email];

        const times = Object.keys(userChat).filter(
          (key) => key !== 'isIncoming' && key !== 'isIncomingAdmin'
        );
        if (times.length === 0) continue;

        times.sort((a, b) => Number(a) - Number(b));
        const lastTimeKey = times[times.length - 1];
        const lastMessage = userChat[lastTimeKey];

        const messageUniqueId = `${email}_${lastTimeKey}`;
        if (!lastMessage.is && !processedAiRepliesRef.current.has(messageUniqueId)) {
          // Synchronous lock before any async call
          isAutoReplyingLockRef.current[email] = true;
          processedAiRepliesRef.current.add(messageUniqueId);
          setIsThinking(true);

          try {
            const aiReply = await generateSupportReply(userChat, email);
            await adminSendMessage(email, aiReply, null, user?.uid || 'ai-admin');
          } catch (err) {
            console.error('AI Auto-reply failed:', err);
          } finally {
            setIsThinking(false);
            isAutoReplyingLockRef.current[email] = false;
          }
        }
      }
    };

    runAutoReply();
  }, [messages, aiAutoReplyMap, user?.uid]);

  return {
    inputValue,
    messages,
    editMessage,
    isEditing,
    sendMessage,
    changeInputValue,
    setEdit,
    deleteMessage,
    isAiThinking,
    aiAutoReplyMap,
    toggleAiAutoReply,
    generateAiSuggestion,
  };
}
