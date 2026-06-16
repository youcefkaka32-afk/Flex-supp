import { useState, useEffect, useRef } from 'react'
import './Chatbase.css'

const BOT_ID = import.meta.env.VITE_CHATBASE_BOT_ID
const AUTOLOAD = import.meta.env.VITE_CHATBASE_AUTOLOAD === 'true'

export default function Chatbase() {
  // Hooks MUST be declared before any early return (Rules of Hooks)
  const [open, setOpen] = useState(false)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!BOT_ID) return
    if (AUTOLOAD) {
      const t = setTimeout(() => setOpen(true), 2500)
      return () => clearTimeout(t)
    }
  }, [])

  if (!BOT_ID) return null

  function makeSrcDoc() {
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{height:100%;margin:0;background:transparent;}</style></head><body><script>(function(){if(!window.chatbase||window.chatbase(\"getState\")!==\"initialized\"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop===\"q\"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement('script');script.src='https://www.chatbase.co/embed.min.js';script.id='${BOT_ID}';script.domain='www.chatbase.co';document.body.appendChild(script)};if(document.readyState==='complete'){onLoad()}else{window.addEventListener('load',onLoad)}})();<\/script></body></html>`
  }

  return (
    <>
      {!open && (
        <button type="button" className="chatbase-launch" onClick={() => setOpen(true)} aria-label="Open chat">Chat</button>
      )}

      {open && (
        <div className="chatbase-iframe-wrap" role="dialog" aria-label="Chat widget">
          <iframe
            title="Chatbase chat"
            ref={iframeRef}
            srcDoc={makeSrcDoc()}
            sandbox="allow-scripts allow-same-origin"
            className="chatbase-iframe"
          />
          <button type="button" className="chatbase-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
        </div>
      )}
    </>
  )
}
