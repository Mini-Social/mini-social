import CheckIcon from '@mui/icons-material/Check';

interface Props {
  src: string;
  count: number;
  state: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}
const ModelMoreReaction = ({ src, count, state, active, setActive }: Props) => (
  <li
    className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
    onClick={() => setActive(state)}
    onMouseEnter={(e: React.MouseEvent) => e.stopPropagation()}
  >
    <div className="flex items-center gap-3">
      <img src={src} alt="" className="h-5 w-5 rounded-[50%]" />
      <span className="text-[15px]">{count}</span>
    </div>
    {active && (
      <CheckIcon
        fontSize="small"
        style={{
          color: '#0806ff',
        }}
      />
    )}
  </li>
);

export default ModelMoreReaction;
