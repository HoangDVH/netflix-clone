import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
type FormValues = {
  email: string;
  password: number;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập địa chỉ email hợp lệ")
    .required("Không được bỏ trống"),
  password: Yup.string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(20, "Mật khẩu không được vượt quá 20 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/,
      "Mật khẩu phải chứa ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 số và 1 ký tự đặc biệt (!@#$%^&*()_+{}[]:;<>,.?~\\/-)"
    )
    .required("Không được bỏ trống"),
});
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(LoginSchema) });
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <div className="bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/1a5c57fd-7621-42e4-8488-e5ae84fe9ae5/VN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg')] w-full h-screen bg-auto bg-no-repeat bg-center">
      <div className="px-20 py-4">
        <img
          src="\src\assets\images\Logonetflix.png"
          alt="logo"
          className="w-52 h-16"
        />
      </div>
      <div className="flex items-center justify-center relative">
        <div className="bg-current px-16 py-10 rounded-lg h-screen">
          <h5 className="text-3xl text-white font-semibold pb-8">Sign In</h5>
          <div className="flex flex-col gap-8">
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-8 relative">
                <input
                  placeholder="Email or phone number"
                  className="bg-slate-800 w-80 py-3 px-4 text-white rounded-lg"
                  {...register("email")}
                ></input>
                {errors?.email && (
                  <p className="text-error text-xs -mt-7">
                    {errors.email.message}
                  </p>
                )}

                <input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="bg-slate-800 w-80 py-3 px-4 text-white rounded-lg relative"
                  {...register("password")}
                ></input>

                {showPassword ? (
                  <RemoveRedEyeOutlinedIcon
                    className="eye-icon absolute top-28 right-2 text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    className="eye-icon absolute top-28 right-2 text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
                {errors?.password && (
                  <p className="text-error text-xs -mt-7 w-80">
                    {errors.password.message}
                  </p>
                )}

                <button className="bg-red-700 py-2 text-white text-xl rounded-lg mt-2">
                  Sign In
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
              New to Netflix?
              <span
                className="text-white pl-1 hover:underline cursor-pointer"
                onClick={() => navigate("/")}
              >
                Sign up now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
