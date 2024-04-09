
import {inputStyle,labelStyle,loginInputStyle} from "../../components/ui/style"

export const FormFieldInput = ({ label, type, name, register,defaultValue, error, placeholder, ...rest }) => {
  // console.log('REST FROM FORM', rest);
  
    return (
      <div className="flex flex-col ">
       
        <label  className={`${labelStyle.data}`} htmlFor={name}>
          {label}
        </label>
        <input
          type={type}
          defaultValue={defaultValue}
          {...register(name, rest)}
          className={`${inputStyle.data}`}
          placeholder={placeholder}
          
        />
        
        {error && <p className="text-red-500">{`${label} Required`}</p>}
      </div>
    );
  };

  export const FormFieldInputLoginInput = ({ label, type, name, register,defaultValue, error, placeholder, ...rest }) => {
    // console.log('REST FROM FORM', rest);
    
      return (
        <div className="flex flex-col w-full ">
         
          <label  className={`${labelStyle.data}`} htmlFor={name}>
            {/* {label} */}
          </label>
          <input
            type={type}
            defaultValue={defaultValue}
            {...register(name, rest)}
            className={`${loginInputStyle.data}`}
            placeholder={placeholder}
            
          />
          
          {error && <p className="text-red-500">{`${label} Required`}</p>}
        </div>
      );
    };
  
    export const RadioButtonInput = ({ label, type, name, register,defaultValue, error, placeholder, ...rest }) => {
      // console.log('REST FROM FORM', rest);
      
        return (
          // <div className="flex flex-col ">
           
          //   <label  className={`${labelStyle.data}`} htmlFor={name}>
          //     {label}
          //   </label>
          //   <input
          //     type={type}
          //     defaultValue={defaultValue}
          //     {...register(name, rest)}
          //     className={`${inputStyle.data}`}
          //     placeholder={placeholder}
              
          //   />
            
          //   {error && <p className="text-red-500">{`${label} Required`}</p>}
          // </div>
          <div className="flex flex-col  space-x-2 ">
                      <p className={`${labelStyle.data}`}>{label}</p>

         <div className="space-x-2 flex items-center">
         <label className={`${labelStyle.data}`}>
            <input
              type="radio"
              value="yes"

              // checked={selectedOption === 'yes'}
              // onChange={handleOptionChange}
            />
            Yes
          </label>
          <label className={`${labelStyle.data}`}>
            <input
              type="radio"
              value="no"

              // checked={selectedOption === 'no'}
              // onChange={handleOptionChange}
            />
            No
          </label>
         </div>
        </div>
        );
      };

  export const SelectInput = ({ label, name, options,defaultValue,error, register, ...rest }) => {
  
    return (
      <div className="flex flex-col">
        <label htmlFor={name} className={`${labelStyle.data}`}>{label}</label>
        <select
          {...register(name,{required:true})}
          className={`${inputStyle.data}`}
          {...rest}
          defaultValue={defaultValue}
        >
          <option disabled value={defaultValue}>{defaultValue}</option>
          { options && options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500">{`${label} Required`}</p>}
      
      </div>
    );
  };

 

    export  const ImageMaping= ({images}) => {
      return (
        <div className="grid grid-cols-2 gap-x-10  gap-y-5 m-2">
        {images &&  images?.map((imgs, index) => {
           return (
             <div className=" bg-gray-50 rounded-2xl">
        
               <div className="text-center">  <p>Image {index+1}</p></div>
             
    <div className=" flex justify-center">
    <Image src={imgs} alt={imgs} key={index} className="h-80  text-center" />
    </div>
              
             </div>
           );
         })}
            
            </div>
      )
    }
    //