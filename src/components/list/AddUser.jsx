const AddUser = () => {
  return (
    <div className=" w-max  h-max px-8 z-50 py-8 bg-[rgba(17,25,40,0.85)] rounded-xl absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto ">
      <form action="" className=" flex gap-5">
        <input
          type="text"
          placeholder="Username"
          name="username"
          className=" px-5 py-4 rounded-xl outline-none border-none"
        />
        <button className=" px-5 py-4 rounded-xl bg-[#1a73e8] text-white cursor-pointer">
          Search
        </button>
      </form>
      {/* user */}
      <div className=" mt-12 flex items-center justify-between">
        {/* user details */}
        <div className=" flex items-center gap-5">
          <img
            src="/avatar.png"
            alt=""
            className=" w-12 object-cover h-12 rounded-full "
          />
          <span>Jane Doe</span>
        </div>
        <button className=" px-3 py-2 rounded-xl bg-[#1a73e8] text-white cursor-pointer">
          Add User
        </button>
      </div>
    </div>
  );
};

export default AddUser;
