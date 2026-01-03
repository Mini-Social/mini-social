import { Link } from 'react-router-dom';

const Register = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-linear-to-t from-sky-500 to-indigo-500">
    <div className="flex min-h-[600px] w-[90%] flex-row-reverse overflow-hidden rounded-[10px] md:w-[80%] xl:w-[60%]">
      {/* Left */}
      <div className="hidden flex-1 flex-col gap-[30px] bg-[linear-gradient(rgba(14,165,233,0.4),rgba(79,70,229,0.4)),url(https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600)] bg-cover bg-center p-[30px] text-white md:flex xl:p-[50px]">
        <h1 className="!text-[70px] font-bold xl:!text-[100px] xl:!leading-[100px]">
          Xuan Social.
        </h1>
        <span className="text-[1rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
          alias totam numquam ipsa exercitationem dignissimos, error nam,
          consequatur.
        </span>
        <span>Do you have an account?</span>
        <Link to={'/login'}>
          <button className="w-[50%] !rounded-none !font-bold text-[#3f51b5] !outline-none">
            Login
          </button>
        </Link>
      </div>
      {/* Right */}
      <div className="flex flex-1 flex-col justify-center gap-[50px] bg-white p-[50px] md:p-[30px]">
        <h2 className="text-[2rem] font-bold text-[#555555]">Register</h2>

        <form action="">
          <div className="flex flex-col gap-[30px]">
            <div className="flex gap-[20px]">
              <input
                type="text"
                placeholder="Firstname"
                className="w-full border-b-[1px] border-b-gray-300 px-[10px] py-[20px]"
              />
              <input
                type="text"
                placeholder="Lastname"
                className="w-full border-b-[1px] border-b-gray-300 px-[10px] py-[20px]"
              />
            </div>
            <input
              type="text"
              placeholder="Username"
              className="w-full border-b-[1px] border-b-gray-300 px-[10px] py-[20px]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b-[1px] border-b-gray-300 px-[10px] py-[20px]"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border-b-[1px] border-b-gray-300 px-[10px] py-[20px]"
            />
            <button className="w-full !rounded-none !bg-[#725dfd] !font-bold !text-white !outline-none md:w-[50%]">
              Register
            </button>
          </div>
          <div className="mt-[30px] text-center md:hidden">
            <Link to="/login" className="mb-[10px] !underline">
              Do you have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default Register;
