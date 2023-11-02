import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useAddAccountMutation } from "../apis/account";
import { toast } from "react-toastify";
type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: number;
};

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("Không được bỏ trống"),
  email: Yup.string()
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      "Invalid email address"
    )
    .required("Không được bỏ trống"),
  password: Yup.string()
    .min(8, "The Password must be at least 6 ")
    .max(20, "The Password must be  at max 30 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/,
      "Password must contain uppercase letters, lowercase letters, digits and non-alphanumeric character"
    )
    .required("Không được bỏ trống"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu phải trùng khớp")
    .required("Không được bỏ trống"),
  phoneNumber: Yup.string()
    .matches(/^0[0-9]{9,10}$/, "Invalid phone number")
    .required("Không được bỏ trống"),
});
export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setConfirmPass] = useState(false);

  const navigate = useNavigate();

  const [addAccount, { isSuccess: isRegisterSucess, isError, error }] =
    useAddAccountMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(LoginSchema) });

  const onSubmit = handleSubmit(async (data) => {
    await addAccount(data);
  });

  console.log(isError);
  console.log(error);

  useEffect(() => {
    if (isRegisterSucess) {
      toast.success("Loggin in successfully");
      navigate("/login");
    }
  }, [isRegisterSucess, navigate]);

  return (
    <div className="bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/1a5c57fd-7621-42e4-8488-e5ae84fe9ae5/VN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg')] w-full h-screen bg-auto bg-no-repeat bg-center">
      <div className="px-20 py-4">
        <img
          src="\src\assets\images\Logonetflix.png"
          alt="logo"
          className="w-52 h-16"
        />
      </div>
      <div className="flex items-center justify-center relative h-80 mt-32">
        <div className="bg-current px-8 md:px-16 py-10 rounded-lg">
          <h5 className="text-3xl text-white font-semibold pb-8">Sign Up</h5>
          <div className="flex flex-col gap-8">
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-10 relative">
                <div style={{ position: "relative" }}>
                  <input
                    placeholder="Enter Name..."
                    className="bg-slate-800 w-80 py-3 px-4 text-white rounded-lg"
                    {...register("name")}
                  ></input>
                  <p
                    style={{
                      position: "absolute",
                      top: "100%",
                      marginTop: "0.25rem",
                    }}
                    className="text-error text-xs"
                  >
                    {errors?.name && errors.name.message}
                  </p>
                </div>

                <div style={{ position: "relative" }}>
                  <input
                    placeholder="Enter Email..."
                    className="bg-slate-800 w-80 py-3 px-4 text-white rounded-lg"
                    {...register("email")}
                  ></input>
                  <p
                    style={{
                      position: "absolute",
                      top: "100%",
                      marginTop: "0.25rem",
                    }}
                    className="text-error text-xs"
                  >
                    {errors?.email && errors.email.message}
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      top: "100%",
                      marginTop: "0.25rem",
                    }}
                    className="text-error text-xs"
                  >
                    {error?.data.message}
                  </p>
                </div>
                

                <div style={{ position: "relative" }}>
                  <input
                    placeholder="Enter Password..."
                    type={showPassword ? "text" : "password"}
                    className="bg-slate-800 w-80 py-3 px-4 text-white rounded-lg relative"
                    {...register("password")}
                  ></input>
                  <p
                    style={{
                      position: "absolute",
                      top: "100%",
                      marginTop: "0.25rem",
                    }}
                    className="text-error text-xs"
                  >
                    {errors?.password && errors.password.message}
                  </p>

                  {showPassword ? (
                    <RemoveRedEyeOutlinedIcon
                      className="eye-icon absolute top-1/4 right-2 text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      className="eye-icon absolute top-1/4 right-2 text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>

                <div style={{ position: "relative" }}>
                  <input
                    placeholder="Confirm Password..."
                    type={showConfirmPass ? "text" : "password"}
                    className="bg-slate-800 w-80 py-3 px-4 text-white rounded-lg"
                    {...register("confirmPassword")}
                  ></input>
                  <p
                    style={{
                      position: "absolute",
                      top: "100%",
                      marginTop: "0.25rem",
                    }}
                    className="text-error text-xs"
                  >
                    {errors?.confirmPassword && errors.confirmPassword.message}
                  </p>

                  {showConfirmPass ? (
                    <RemoveRedEyeOutlinedIcon
                      className="eye-icon absolute top-1/4 right-2 text-white"
                      onClick={() => setConfirmPass(!showConfirmPass)}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      className="eye-icon absolute top-1/4 right-2 text-white"
                      onClick={() => setConfirmPass(!showConfirmPass)}
                    />
                  )}
                </div>

                <div style={{ position: "relative" }}>
                  <input
                    placeholder="Phone Number..."
                    className="bg-slate-800 w-80 py-3 px-4 text-white rounded-lg"
                    {...register("phoneNumber")}
                  ></input>
                  <p
                    style={{
                      position: "absolute",
                      top: "100%",
                      marginTop: "0.25rem",
                    }}
                    className="text-error text-xs"
                  >
                    {errors?.phoneNumber && errors.phoneNumber.message}
                  </p>
                </div>

                <button className="bg-red-700 py-2 text-white text-xl rounded-lg mt-2">
                  Sign Up
                </button>
              </div>
            </form>
            <div className="flex items-center justify-between text-slate-400 -mt-6 text-sm">
              <div className="flex gap-1 items-center">
                <input type="checkbox"></input>
                <span>Remember me</span>
              </div>
              <p>Need helps?</p>
            </div>
            <div className="text-slate-400 -mt-5">
              Has account?
              <span
                className="text-white pl-1 hover:underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign in now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
