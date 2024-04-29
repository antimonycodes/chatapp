import { useUserStore } from "../../lib/Userstore";

const Userinfo = () => {
  const { currentUser } = useUserStore();

  return (
    <div className="flex items-center justify-between w-full px-3 py-5 ">
      <div className="flex items-center gap-3 user">
        <img
          src={currentUser.avatar || "/avatar.png"}
          alt=""
          className="object-cover w-[40px] h-[40px] rounded-full "
        />
        <h2 className="text-xl ">{currentUser.username}</h2>
      </div>
      <div className="flex gap-5 cursor-pointer icons">
        <img src="/more.png" alt="" width={20} height={20} />
        <img src="/video.png" alt="" width={20} height={20} />
        <img src="/edit.png" alt="" width={20} height={20} />
      </div>
    </div>
  );
};

export default Userinfo;
