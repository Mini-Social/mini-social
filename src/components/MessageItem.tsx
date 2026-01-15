import { PhotoProvider, PhotoView } from 'react-photo-view';

import { FormatDate } from "@/utils/formatDate";
import 'react-photo-view/dist/react-photo-view.css';

interface Props {
  isOwn: boolean;
  content: string;
  images?: string[];
  createdAt: string;
  isLast?: boolean;
  isRead?: boolean;
}
const MessageItem = ({ isOwn, content, images, createdAt, isLast, isRead }: Props) => (
  <div>
    <div className="px-5 py-4 text-center">
      <span className="text-xs text-[#65686c]">{FormatDate(createdAt, true)}</span>
    </div>
    <div className={`flex ${content && images && images?.length > 0 && 'flex-col'} ${isOwn ? 'justify-end' : 'justify-start'} flex items-end gap-1 px-2`}>
      {!isOwn && <img className='w-7 h-7 shrink-0 rounded-[50%]'  src="https://scontent.fhph4-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s100x100&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=hXJ7wx4on2cQ7kNvwF3Fyb4&_nc_oc=AdnlDJM06szOL5c4UR0sd7d75Iyx-T9iy47DbA3lGSFdgwGK0vr7ybX51Sa74soN-vLJtC3e-uH_bDoTaLVKkXSZ&_nc_ad=z-m&_nc_cid=0&_nc_zt=24&_nc_ht=scontent.fhph4-1.fna&oh=00_AfoYY11C7DmjzugvuWdV6A0buEWn8Uy1nVfnP7pSjEb0bw&oe=698F1EFA" alt="" />}
      {
        content && <div className={`mr-2 max-w-[70%] rounded-[20px] px-3 py-2 ${isOwn ? 'bg-[#4244F9] text-white' : 'bg-[#F0F2F5] text-black'}`}>
        <p className="break-all wrap-break-word whitespace-pre-wrap">{content}</p>
      </div>
      }
       {
        images && images.length > 0 && (
          <div className={`flex flex-col ${isOwn ? 'justify-end' : 'justify-start'} gap-0.5`}>
            {images.map((image, index) => (
              <PhotoProvider key={index}>
                <PhotoView src={image}>
                  <img key={index} src={image} alt={`image-${index}`} className="max-w-45 max-h-45 rounded-lg object-cover cursor-pointer" />
                </PhotoView>
              </PhotoProvider>
            ))}
          </div>
        )
      }
    </div>

    {
      isOwn && isLast && isRead && <div className="mt-2 mr-6 flex items-center justify-end">
      <img
        src="https://scontent.fhph4-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s100x100&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=hXJ7wx4on2cQ7kNvwF3Fyb4&_nc_oc=AdnlDJM06szOL5c4UR0sd7d75Iyx-T9iy47DbA3lGSFdgwGK0vr7ybX51Sa74soN-vLJtC3e-uH_bDoTaLVKkXSZ&_nc_ad=z-m&_nc_cid=0&_nc_zt=24&_nc_ht=scontent.fhph4-1.fna&oh=00_AfoYY11C7DmjzugvuWdV6A0buEWn8Uy1nVfnP7pSjEb0bw&oe=698F1EFA"
        alt=""
        className="h-3.5 w-3.5 rounded-[50%]"
      />
    </div>
    }
  </div>
);

export default MessageItem;
