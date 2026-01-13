import { Link } from 'react-router-dom';

const PostImages = ({ images }: { images: string[] }) => {
  const lengthImage = images.length;
  return (
    <div
      className={`grid gap-0.5 border-t border-t-gray-300 ${lengthImage === 1 ? 'grid-cols-1' : 'grid-cols-2'} ${lengthImage === 3 ? 'grid-cols-[2fr_1fr]' : ''}`}
    >
      {lengthImage === 1 && (
        <Link to={'/'}>
          <img
            src={images[0]}
            alt=""
            className="max-h-140 w-full object-cover"
          />
        </Link>
      )}
      {lengthImage === 2 &&
        images.map((image, index) => (
          <Link key={index} to={'/'}>
            <img src={image} alt="" className="max-h-125 w-full object-cover" />
          </Link>
        ))}
      {
        lengthImage === 3 && (
          <>
            <Link to={'/'} className="row-span-2 block h-full w-full">
              <img
                src={images[0]}
                alt=""
                className="h-full w-full object-cover"
              />
            </Link>
            <Link to={'/'} className="block h-full w-full">
              <img
                src={images[1]}
                alt=""
                className="h-full w-full object-cover"
              />
            </Link>
            <Link to={'/'} className="block h-full w-full">
              <img
                src={images[2]}
                alt=""
                className="h-full w-full object-cover"
              />
            </Link>
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
          <Link key={index} to={'/'}>
            <img
              src={image}
              alt=""
              className="aspect-square max-h-125 w-full object-cover"
            />
          </Link>
        ))}
      {lengthImage >= 5 && (
        <>
          <Link to={'/'} className="block aspect-square h-full w-full">
            <img
              src={images[0]}
              alt=""
              className="h-full w-full object-cover"
            />
          </Link>
          <Link to={'/'} className="block aspect-square h-full w-full">
            <img
              src={images[1]}
              alt=""
              className="h-full w-full object-cover"
            />
          </Link>
          <div className="col-span-2 grid grid-cols-3 gap-0.5">
            {images.map(
              (image, index) =>
                index > 1 &&
                index < 5 && (
                  <Link
                    key={index}
                    to={'/'}
                    className="block aspect-square h-full w-full"
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </Link>
                ),
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostImages;
