import { Link } from 'react-router-dom';

interface Props {
  src: string;
  text: string;
  link: string;
  isUser?: boolean;
}

const LeftBarItem = ({ src, text, link, isUser }: Props) => (
  <Link
    to={link}
    className="hover:bg-accent px-5 py-2.5 font-normal! text-(--textColor)!"
  >
    <div className="flex items-center gap-2.5">
      <img
        src={src}
        alt=""
        className={`${isUser && 'rounded-[50%] object-cover'} h-7.5 w-7.5`}
      />
      <span>{text}</span>
    </div>
  </Link>
);

export default LeftBarItem;
