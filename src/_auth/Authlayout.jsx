import { Navigate, Outlet } from "react-router-dom";

const Authlayout = () => {
  const isAuthenticated = false;
  return (
    <div
      className=" "
      style={{
        background:
          "linear-gradient(90deg, rgba(91,33,182,0.75) 47%, rgba(39,121,216,0.75) 100%)",
      }}
    >
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section>
            <Outlet />
          </section>
        </>
      )}
    </div>
  );
};

export default Authlayout;
