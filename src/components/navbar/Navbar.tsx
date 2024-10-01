import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { login, register } from "@/api";
import { Data, User } from "@/config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { IoMdArrowDropdown, IoMdLogIn } from "react-icons/io";
import { clearUserData, getUserData, saveUserData } from "@/utils";
import { FaEye, FaEyeSlash, FaSheetPlastic } from "react-icons/fa6";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaSync } from "react-icons/fa";

const Navbar = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<User | null>(getUserData());
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLoginForm,
    formState: { errors: loginErrors },
  } = useForm();
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    reset: resetSignupForm,
    formState: { errors: signupErrors },
  } = useForm();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
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
      setIsLoginDialogOpen(false);
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
      setIsSignupDialogOpen(false);
      setIsLoading(false);
      setIsLoginDialogOpen(true);
    }
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

  useEffect(() => {
    if (!isLoginDialogOpen) {
      resetLoginForm();
    }
    if (!isSignupDialogOpen) {
      resetSignupForm();
    }
  }, [isLoginDialogOpen, isSignupDialogOpen, resetLoginForm, resetSignupForm]);

  return (
    <div className="w-full h-16 bg-gray-200 px-10 flex items-center justify-between">
      <Link to={"/"} className="flex items-center justify-center gap-3">
        <FaSheetPlastic className="text-3xl text-purple-900" />
        <p className="text-2xl font-sans font-normal">Survey Forms</p>
      </Link>
      {user ? (
        <div>
          <Popover>
            <PopoverTrigger className="w-fit px-3 py-1 border border-gray-800 rounded-md flex items-center justify-center gap-2 text-base font-semibold hover:bg-gray-300 bg-transparent transition-all duration-300 ease-in-out">
              {user.username}
              <IoMdArrowDropdown className="text-lg" />
            </PopoverTrigger>
            <PopoverContent
              align="center"
              className="w-32 py-2 px-0 bg-gray-300 border border-gray-400 flex flex-col items-center justify-center gap-1"
            >
              <button className="w-full text-lg font-sans transition-all duration-300 ease-in-out font-semibold hover:scale-110">
                Profile Page
              </button>
              <button
                className="w-full text-lg font-sans transition-all duration-300 ease-in-out font-semibold hover:scale-110"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
            <DialogTrigger className="w-fit px-3 py-1 border border-gray-800 rounded-md text-base font-semibold hover:bg-gray-300 bg-transparent transition-all duration-300 ease-in-out">
              Log In
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Log In to Survey Forms!
                </DialogTitle>
                <DialogDescription>
                  This action will log you into your account. Ensure your
                  credentials are correct to access your survey responses and
                  settings.
                </DialogDescription>
              </DialogHeader>
              <form
                className="w-full h-auto flex flex-col items-center justify-center"
                onSubmit={handleSubmitLogin(
                  handleLogIn as SubmitHandler<FieldValues>
                )}
              >
                <input
                  type="text"
                  className="w-full h-10 px-3 rounded-lg outline-none border-2 text-lg font-sans font-medium border-black mt-6"
                  placeholder="email"
                  {...registerLogin("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {loginErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginErrors.email?.message as string}
                  </p>
                )}
                <div className="w-full h-auto flex items-center justify-center mt-6">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-[90%] h-10 px-3 rounded-l-lg outline-none border-2 border-r-0 text-lg font-sans font-medium border-black"
                    placeholder="password"
                    {...registerLogin("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    className="w-[10%] h-10 px-3 rounded-r-lg outline-none border-2 border-l-0 text-lg font-sans font-medium border-black flex items-center justify-center"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? (
                      <FaEye className="text-xl" />
                    ) : (
                      <FaEyeSlash className="text-xl" />
                    )}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginErrors.password?.message as string}
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
              </form>
            </DialogContent>
          </Dialog>
          <Dialog
            open={isSignupDialogOpen}
            onOpenChange={setIsSignupDialogOpen}
          >
            <DialogTrigger className="w-fit px-3 py-1 border border-gray-800 rounded-md text-base font-semibold hover:bg-gray-300 bg-transparent transition-all duration-300 ease-in-out">
              Sign Up
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Sign Up to Survey Forms!
                </DialogTitle>
                <DialogDescription>
                  This action will create a new account for you. Please provide
                  valid information to set up your profile and access your
                  survey features.
                </DialogDescription>
              </DialogHeader>
              <form
                className="w-full h-auto flex flex-col items-center justify-center"
                onSubmit={handleSubmitSignup(
                  handleSignUp as SubmitHandler<FieldValues>
                )}
              >
                <input
                  type="text"
                  className="w-full h-10 px-3 rounded-lg outline-none border-2 text-lg font-sans font-medium border-black mt-6"
                  placeholder="username"
                  {...registerSignup("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                />
                {signupErrors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {signupErrors.username?.message as string}
                  </p>
                )}
                <input
                  type="text"
                  className="w-full h-10 px-3 rounded-lg outline-none border-2 text-lg font-sans font-medium border-black mt-6"
                  placeholder="email"
                  {...registerSignup("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {signupErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {signupErrors.email?.message as string}
                  </p>
                )}
                <div className="w-full h-auto flex items-center justify-center mt-6">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-[90%] h-10 px-3 rounded-l-lg outline-none border-2 border-r-0 text-lg font-sans font-medium border-black"
                    placeholder="password"
                    {...registerSignup("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    className="w-[10%] h-10 px-3 rounded-r-lg outline-none border-2 border-l-0 text-lg font-sans font-medium border-black flex items-center justify-center"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? (
                      <FaEye className="text-xl" />
                    ) : (
                      <FaEyeSlash className="text-xl" />
                    )}
                  </button>
                </div>
                {signupErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {signupErrors.password?.message as string}
                  </p>
                )}
                <button
                  className="w-full h-10 px-3 rounded-lg outline-none border-2 text-xl font-sans font-medium border-black hover:bg-black bg-black/[0.8] mt-6 text-white"
                  type="submit"
                >
                  {isLoading && <FaSync className="animate-spin" />}
                  {isLoading ? "Loading..." : "Submit"}
                  {!isLoading && <IoMdLogIn />}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Navbar;
