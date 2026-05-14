import React, { useState } from 'react';
import InputField from '../../shared/InputField';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import Spinners from '../../shared/Spinners';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addNewSellerFromDashboard } from '../../../store/actions';

const AddSellerForm = ({ setOpen }) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({ mode: 'onTouched' });

   const [loader, setLoader] = useState(false);
   const dispatch = useDispatch();

   const saveSellerHandler = (data) => {
      const sendData = {
         ...data,
         role: ['seller'],
      };

      dispatch(
         addNewSellerFromDashboard(sendData, toast, reset, setLoader, setOpen)
      );
   };

   return (
      <div className="py-5 relative h-full">
         <form onSubmit={handleSubmit(saveSellerHandler)} className="space-y-4">
            <div className="flex md:flex-row flex-col gap-4 w-full">
               <InputField
                  label="Username"
                  required
                  id="username"
                  type="text"
                  message="This field is required*"
                  register={register}
                  placeholder="Username"
                  errors={errors}
               />
            </div>
            <div className="flex md:flex-row flex-col gap-4 w-full">
               <InputField
                  label="Email"
                  required
                  id="email"
                  type="email"
                  message="This field is required*"
                  register={register}
                  placeholder="Email"
                  errors={errors}
               />
            </div>
            <div className="flex md:flex-row flex-col gap-4 w-full">
               <InputField
                  label="Password"
                  required
                  id="password"
                  type="password"
                  message="This field is required*"
                  register={register}
                  placeholder="Password"
                  errors={errors}
               />
            </div>

            <div className="flex w-full justify-between items-center absolute bottom-14">
               <Button
                  disabled={loader} // this will disable the button when the form is being submitted, bcoz the loader will be true when the form is being submitted
                  type="button"
                  onClick={() => setOpen(false)}
                  variant="outlined"
                  className="bg-red-500 hover:bg-red-700 text-white py-[10px] px-4 text-sm font-medium rounded-md transition-all duration-300 ease-in-out"
               >
                  Cancel
               </Button>

               <Button
                  disabled={loader}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="bg-custom-blue text-white py-[10px] px-4 text-sm font-medium rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out"
               >
                  {loader ? (
                     <div className="flex gap-2 items-center">
                        <Spinners /> Loading...
                     </div>
                  ) : (
                     'Save'
                  )}
               </Button>
            </div>
         </form>
      </div>
   );
};

export default AddSellerForm;
