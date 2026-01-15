import { useState } from "react"

import ConversationFilter from "@/components/ConversationFilter"


const ConversationTabFilter = () => {
  const [active, setActive] = useState<string>('All')
  return  <div className="flex items-center px-4.5 py-2">
          <div className="flex h-9 gap-1 items-center">
            <ConversationFilter active={active === 'All'}   setActive={setActive} text="All" />
            <ConversationFilter active={active=== 'Unread'} setActive={setActive} text="Unread" />
            <ConversationFilter active={active === 'Group'} setActive={setActive} text="Group" />
          </div>
        </div>
}

export default ConversationTabFilter
