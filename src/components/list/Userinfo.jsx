const Userinfo = () => {
  return (
    <div className=" px-3 py-5 flex items-center justify-between w-full ">
      <div className="user flex items-center gap-3">
        <img
          src="/avatar.png"
          alt=""
          width={40}
          height={40}
          className=" rounded-full object-cover"
        />
        <h2>User Name</h2>
      </div>
      <div className="icons flex gap-5 cursor-pointer">
        <img src="/more.png" alt="" width={20} height={20} />
        <img src="/video.png" alt="" width={20} height={20} />
        <img src="/edit.png" alt="" width={20} height={20} />
      </div>
    </div>
  );
};

export default Userinfo;
