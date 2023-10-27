import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useForm, Resolver } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NavBarHome } from "./navbar/NavBarHome";

type FormValues = {
  email: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "Email is required..",
          },
        }
      : {},
  };
};
export const Home = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className="">
      <div className="bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/1a5c57fd-7621-42e4-8488-e5ae84fe9ae5/VN-vi-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg')] w-full h-screen bg-auto bg-no-repeat bg-center">
        <NavBarHome/>
        <div className="flex items-center justify-center flex-col w-full h-full gap-4">
          <p className="text-4xl font-bold text-white">
            Enjoy big movies, hit series and more from 70,000 ₫.
          </p>
          <p className="text-2xl font-semibold text-white">
            Join today. Cancel anytime.
          </p>
          <p className="text-xl font-light text-white">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <form onSubmit={onSubmit}>
            <div className="flex gap-3">
              <input
                {...register("email")}
                type="email"
                placeholder="Email address…"
                className=" w-96 py-4 px-2 rounded"
              />

              <button className="bg-red-700 px-5 text-white text-xl font-semibold flex items-center gap-2" onClick={() => navigate('/login')}>
                Get Started
                <ArrowForwardIosIcon fontSize="small" />
              </button>
            </div>
            <div className="">
              {errors?.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
