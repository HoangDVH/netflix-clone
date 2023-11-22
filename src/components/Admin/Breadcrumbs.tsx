import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const decodedPathname = decodeURIComponent(pathname);
  const breadcrumbs = decodedPathname.split("/").filter((item) => item);

  return (
    <div className="mb-5">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return (
          <span key={item}>
            {index > 0 && <span className="mx-2">{" > "}</span>}
            {index === 0 ? (
              <Link
                to={`/${item}`}
                className="text-blue-600 text-lg capitalize"
              >
                {item}
              </Link>
            ) : (
              <span>
                <Link
                  to={`/admin/${item}`}
                  className={`text-lg capitalize ${
                    isLast
                      ? "pointer-events-none text-slate-500"
                      : "text-blue-600"
                  }`}
                >
                  {item}
                </Link>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};
