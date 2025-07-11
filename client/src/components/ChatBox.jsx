import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; 
import { IoIosSend } from 'react-icons/io';
import sendMessage from '../services/geminiApis';
import useAuth from '../contexts/auth/useAuth';
import useChat  from '../contexts/chat/useChat';
import Footer from '../components/Footer';


const ChatBox = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const textareaRef = useRef(null);

    const { user, token } = useAuth();
    const { currentChat, chatConv, setChatConv, newChatMutation, updateChatConvMutation} = useChat();


    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; 
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    }, [input]);

    const handleSend = async (e) => {
      if(e.key && e.key !== 'Enter') return;
      if (!input.trim()) return;
      e.preventDefault();

      const userMsg = { sender: 'user', text: input };
      const aiMsg  = { sender: 'ai', text: 'Loading' };

      setChatConv([...chatConv, userMsg, aiMsg]);
      setInput('');
      setIsLoading(true);

      const aiText = await sendMessage(input);

      setChatConv(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { sender: 'ai', text: aiText };
          return newMessages;
      });

      setIsLoading(false);

      if(user) {
          const cnv = [{ sender: 'user', text: input }, { sender: 'ai', text: aiText }];
          const chat = { title: input, cnv };

          const chatId = currentChat?._id;
          if(chatId) {
              updateChatConvMutation.mutate({ cnv, chatId, token });
          } else {
              newChatMutation.mutate({ chat, token });
          }
      }
    };

    return (
        <section className='min-h-[calc(100dvh-106px)]  sm:min-h-[calc(100dvh-128px)] flex flex-col justify-between items-center gap-y-10 relative'>

          <div className='w-[70%] max-w-[70%] flex flex-col gap-y-4'>
            {chatConv.map((msg, idx) => (
              <div key={idx} className={`text-white text-sm ${msg.sender === 'user' ? 'bg-third max-w-[90%] py-2 px-4 ml-auto rounded-xl break-words' : 'flex items-start gap-x-2 ai-response'}`}>
                {msg.sender === 'ai' ? (
                  <>
                    <img  className='mt-0.5 select-none' src='./zai.svg' alt='ZAI Logo' />
                    { msg.text === 'Loading' ? 'Just a sec...' : (
                        <div className='max-w-[90%] flex flex-col gap-y-4 leading-6'>
                            <ReactMarkdown children={msg.text} remarkPlugins={[remarkGfm]}  rehypePlugins={[rehypeHighlight]} />
                        </div>
                    ) }
                  </>
                ) :  msg.text } 
              </div>
            ))}
          </div>

          <div className='bg-secondary w-[90%]  px-4 pb-4 flex flex-col gap-y-4 sticky bottom-0'>

              <div className='bg-third  w-full h-auto p-2 sm:p-4 flex items-end gap-x-2 rounded-xl'>
                  <textarea ref={textareaRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => handleSend(e)}  placeholder='Ask something' className='text-white max-sm:text-[10px] h-auto border-none outline-none flex-1 resize-none overflow-hidden placeholder:text-white placeholder:text-sm sm:placeholder:text-base'></textarea>
                  <button type='buton' onClick={(e) => handleSend(e)} disabled={isLoading} className={`bg-fourth text-white text-base sm:text-xl p-2 rounded-full cursor-pointer select-none ${isLoading || !input ? 'opacity-50' : ''}`}><IoIosSend /></button>
              </div>

              <Footer />

          </div>

        </section>
    );
};

export default ChatBox;