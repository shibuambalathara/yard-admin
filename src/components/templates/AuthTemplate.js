import Link from "next/link";
import Logo from "../../../public/login-logo.png";
import yms from "../../../public/yard managment system.jpg";
import Image from "next/image";

const AuthTemplate = ({ children,  }) => {
  return (
    <>
      <div className="h-screen w-full  flex flex-col justify-center relative overflow-hidden      z-[10]  ">
        {/* img strs */}
        {/* <div className="w-full h-full absolute z-[-1]  ">
          <Image
            src={yms}
            alt="key"
            objectFit="cover"
            layout="fill"
            quality={100}
            className="bg-opacity-50 "
          />
        </div> */}
        {/* img ends  */}

        {/* heading strs  */}
        {/* <div className="">
          {heading && (
            <h2 className=" text-center text-3xl font-extrabold text-gray-900">
              {heading}
            </h2>
          )}
          {subHeading && (
            <p className=" text-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
              {subHeading}
            </p>
          )}
        </div> */}
        
        {/* heading ends here  */}

        {/* children strts here */}

        <div className=" flex   justify-center items-center  h-80  ">
        
          <div className="   border-stone-700     flex  flex-col justify-center   ">
         
            <div> {children}</div>
            {/* <div className="text-center   ">
              <Link href="/deleteUser">
                <a target="_blank">
                  <div>
                    <span className="text-red-600 font-bold text-sm" >
                      Delete My Account
                    </span>
                  </div>
                </a>
              </Link>
            </div> */}
          </div>
        </div>

        {/* children ends here */}
      </div>
    </>
  );
};
export default AuthTemplate;
// AuthTemplate.defaultProps = {
//   heading: "",
//   subHeading: "",
// };
