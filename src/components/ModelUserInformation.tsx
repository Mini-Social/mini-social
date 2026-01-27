import CloseIcon from '@mui/icons-material/Close';

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModelUserInformation = ({ setIsVisible }: Props) => (
  <div className="pointer-events-auto fixed inset-0 z-9999 bg-gray-500/50 shadow-[0px_0px_1px_1px_rgba(0_0_0/0.2)]">
    <div className="flex h-full w-full items-center justify-center">
      <div className="bg-background relative flex h-dvh w-full flex-col rounded-2xl p-2 md:h-[80vh] md:w-[40%] lg:w-[40%]">
        <div className="border-b--border bg-background flex h-15 w-full items-center justify-between border-b p-2">
          <span></span>
          <span className="text-[20px] font-bold text-(--textColor2)">
            Edit profile
          </span>
          <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[50%] bg-(--closeColor) hover:opacity-80">
            <CloseIcon
              fontSize="small"
              className="cursor-pointer"
              onClick={() => setIsVisible(false)}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 p-2">
          <span>Address</span>
          <input type="text" />
        </div>
        <div className="flex flex-col items-center gap-2 p-2">
          <span>Gender</span>
          <input type="date" />
        </div>
        <div className="flex items-center gap-2 p-2">
          <span>Birthday</span>
          <input type="text" />
        </div>
        <div className="flex items-center gap-2 p-2">
          <span>Phone</span>
          <input type="text" />
        </div>
        <div className="flex items-center gap-2 p-2">
          <span>Relationship</span>
          <input type="text" />
        </div>
      </div>
    </div>
  </div>
);

export default ModelUserInformation;
