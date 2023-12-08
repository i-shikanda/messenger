"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

interface ConnversationListProps {
    initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConnversationListProps> = ({
    initialItems
}) => {
  const [items, setItems ] = useState(initialItems);

  const router = useRouter();

  const {conversationId, isOpen} = useConversation();
  return (
    <aside className={clsx(`fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:bloc overflow-y-auto border-r border-gray-200`, isOpen ? 'hidden' : 'blockw-full left-0')}>
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">
            Messeges
          </div>
          <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
            <MdGroupAdd size={20}/>
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox key={item.id} data={item} selected={conversationId === item.id}/>
        ))}
      </div>
    </aside>
  );
}

export default ConversationList;