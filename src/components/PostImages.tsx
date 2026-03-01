import { PhotoProvider, PhotoView } from 'react-photo-view';

const PostImages = ({ images }: { images: string[] }) => {
  const lengthImage = images.length;
  return (
    <div
      className={`border-t-border grid gap-0.5 border-t ${lengthImage === 1 ? 'grid-cols-1' : 'grid-cols-2'} ${lengthImage === 3 ? 'grid-cols-[2fr_1fr]' : ''}`}
    >
      {lengthImage === 1 && (
        <PhotoProvider photoClassName="z-99999 relative">
          <PhotoView src={images[0]}>
            <img
              src={images[0]}
              alt=""
              className="max-h-140 w-full object-cover"
            />
          </PhotoView>
        </PhotoProvider>
      )}
      {lengthImage === 2 &&
        images.map((image, index) => (
          <PhotoProvider key={index}>
            <PhotoView src={image}>
              <img src={image} alt="" className="h-full w-full object-cover" />
            </PhotoView>
          </PhotoProvider>
        ))}
      {
        lengthImage === 3 && (
          <>
            <PhotoProvider>
              <PhotoView src={images[0]}>
                <div className="row-span-2 block h-full w-full">
                  <img
                    src={images[0]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </PhotoView>
            </PhotoProvider>
            <PhotoProvider>
              <PhotoView src={images[1]}>
                <div className="block h-full w-full">
                  <img
                    src={images[1]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </PhotoView>
            </PhotoProvider>
            <PhotoProvider>
              <PhotoView src={images[2]}>
                <div className="block h-full w-full">
                  <img
                    src={images[2]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </PhotoView>
            </PhotoProvider>
          </>
        )
        //  || <>
        //   <Link to={'/'} className="col-span-2 block w-full h-full"><img src={images[0]} alt='' className='w-full max-h-120 object-cover' /></Link>
        //   <Link to={'/'} className="w-full h-full block aspect-square"><img src={images[1]} alt='' className='w-full h-full object-cover' /></Link>
        //   <Link to={'/'} className="w-full h-full block aspect-square"><img src={images[2]} alt='' className='w-full h-full object-cover' /></Link>
        //  </>
      }
      {lengthImage === 4 &&
        images.map((image, index) => (
          <PhotoProvider key={index}>
            <PhotoView src={image}>
              <img
                src={image}
                alt=""
                className="aspect-square max-h-125 w-full object-cover"
              />
            </PhotoView>
          </PhotoProvider>
        ))}
      {lengthImage >= 5 && (
        <>
          <PhotoProvider>
            <PhotoView src={images[0]}>
              <div className="block aspect-square h-full w-full">
                <img
                  src={images[0]}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </PhotoView>
          </PhotoProvider>
          <PhotoProvider>
            <PhotoView src={images[1]}>
              <div className="block aspect-square h-full w-full">
                <img
                  src={images[1]}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </PhotoView>
          </PhotoProvider>
          <div className="col-span-2 grid grid-cols-3 gap-0.5">
            {images.map(
              (image, index) =>
                index > 1 &&
                index < 5 && (
                  <PhotoProvider key={index}>
                    <PhotoView src={image}>
                      <div
                        key={index}
                        className="block aspect-square h-full w-full"
                      >
                        <img
                          src={image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </PhotoView>
                  </PhotoProvider>
                ),
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostImages;
