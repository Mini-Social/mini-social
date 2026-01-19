interface Props {
  text: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const ConversationFilter = ({ text, active, setActive }: Props) => (
  <div
    className={`flex h-full cursor-pointer items-center justify-center rounded-[99px] px-3 font-medium ${!active ? 'hover:bg-(--hoverColor)' : ''} ${active ? 'bg-[#DFE9F2] text-[#005FC6]' : ''}`}
    onClick={() => setActive(text)}
  >
    {text}
  </div>
);

export default ConversationFilter;
