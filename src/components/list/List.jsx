import Chatlist from "./Chatlist";
import Userinfo from "./Userinfo";

const List = () => {
  return (
    <div className=" flex-1 flex flex-col h-full w-full ">
      <div className="">
        <Userinfo />
      </div>
      <div className="custom-scrollbar overflow-y-scroll ">
        <Chatlist />
      </div>
    </div>
  );
};

export default List;
