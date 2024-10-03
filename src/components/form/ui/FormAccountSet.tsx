import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { FaSync } from "react-icons/fa";
import { login, register } from "@/api";
import { Data, UserProps } from "@/config";
import { IoMdLogIn } from "react-icons/io";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TbCloudExclamation } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { clearUserData, getUserData, saveUserData } from "@/utils";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const FormAccountSet = ({ user, setUser }: UserProps) => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register: registerUser,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleModeChange = () => {
    setIsSignIn((prev) => !prev);
  };

  const handleSignOut = () => {
    clearUserData();
    setUser(null);
    toast({
      title: "Success",
      description: "You have been logged out",
      duration: 3000,
    });
  };

  const handleLogIn = async (data: Data) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      saveUserData(response);
      setMessage(response.message);
    } catch (error) {
      console.error("Error logging in: ", error);
    } finally {
      setUser(getUserData());
      toast({
        description: message,
        duration: 3000,
      });
      setIsDialogOpen(false);
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data: Data) => {
    setIsLoading(true);
    try {
      const response = await register(data);
      setMessage(response.message);
    } catch (error) {
      console.error("Error signing up: ", error);
    } finally {
      toast({
        description: `${message} Redirecting to login page...`,
        duration: 3000,
      });
      setIsLoading(false);
      setIsSignIn(true);
    }
  };

  useEffect(() => {
    if (!isDialogOpen) {
      reset();
    }
  }, [isDialogOpen, reset]);

  return (
    <div className="w-full h-auto bg-purple-100 border-t-8 border-purple-600 rounded-md p-6">
      <div className="w-full h-auto flex items-center justify-start">
        <p className="w-[95%] text-left text-2xl font-sans font-semibold">
          Setup Account
        </p>
      </div>
      <div className="border-t-2 border-purple-600 w-full mt-2" />
      <div className="w-full h-auto flex items-center justify-between mt-3 border-b border-purple-400">
        <div className="flex items-center justify-center gap-3 mb-2">
          <p className="text-base font-sans font-semibold">
            {user ? user?.email : "Login to access the form"}
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="text-base text-purple-700 font-semibold font-sans">
              {user ? "Switch acount" : "Sign In"}
            </DialogTrigger>
            <DialogContent className="bg-purple-100">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Sign {user ? "Out from" : isSignIn ? "In to" : "Up to"} Survey
                  Forms!
                </DialogTitle>
                <DialogDescription>
                  {user
                    ? "Sign Out and login with another account"
                    : isSignIn
                    ? "This action will signin you into your account. Ensure your credentials are correct to access your survey responses and settings."
                    : "This action will create a new account for you. Please provide valid information to set up your profile and access your survey features."}
                </DialogDescription>
              </DialogHeader>
              {user ? (
                <div onClick={handleSignOut}>sdhfjkh</div>
              ) : (
                <form
                  className="w-full h-auto flex flex-col items-center justify-center"
                  onSubmit={handleSubmit(
                    (isSignIn
                      ? handleLogIn
                      : handleSignUp) as SubmitHandler<FieldValues>
                  )}
                >
                  {!isSignIn && (
                    <>
                      <input
                        type="text"
                        className="w-full h-10 px-3 rounded-lg outline-none border-2 text-lg font-sans bg-purple-200 font-medium border-black mt-6"
                        placeholder="username"
                        {...registerUser("username", {
                          required: "Username is required",
                          minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters",
                          },
                        })}
                      />
                      {errors.username && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.username?.message as string}
                        </p>
                      )}
                    </>
                  )}
                  <input
                    type="text"
                    className="w-full h-10 px-3 rounded-lg outline-none border-2 text-lg font-sans font-medium border-black mt-6 bg-purple-200"
                    placeholder="email"
                    {...registerUser("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email?.message as string}
                    </p>
                  )}
                  <div className="w-full h-auto flex items-center justify-center mt-6">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-[90%] h-10 px-3 rounded-l-lg outline-none bg-purple-200 border-2 border-r-0 text-lg font-sans font-medium border-black"
                      placeholder="password"
                      {...registerUser("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <div
                      className="w-[10%] h-10 px-3 bg-purple-200 rounded-r-lg outline-none border-2 border-l-0 text-lg font-sans font-medium border-black flex items-center justify-center"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? (
                        <FaEye className="text-xl" />
                      ) : (
                        <FaEyeSlash className="text-xl" />
                      )}
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password?.message as string}
                    </p>
                  )}
                  <button
                    className="w-full h-10 px-3 rounded-lg outline-none border-2 text-xl flex items-center justify-center gap-2 leading-none font-sans font-medium border-black hover:bg-black bg-black/[0.8] mt-6 text-white"
                    type="submit"
                  >
                    {isLoading && <FaSync className="animate-spin" />}
                    {isLoading ? "Loading..." : "Submit"}
                    {!isLoading && <IoMdLogIn />}
                  </button>
                  <div className="w-full h-auto mt-4 flex items-center justify-end">
                    <p
                      className="text-base font-sans font-medium cursor-pointer"
                      onClick={handleModeChange}
                    >
                      {isSignIn
                        ? "Don't have an account? SignUp"
                        : "Already have an account? SignIn"}
                    </p>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <TbCloudExclamation className="text-2xl" />
      </div>
      <div className="w-full h-auto mt-3 flex items-center justify-start">
        <p className="text-sm text-red-500 font-medium font-sans">
          * Indicates required question
        </p>
      </div>
    </div>
  );
};

export default FormAccountSet;
