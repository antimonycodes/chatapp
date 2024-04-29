import Chatlist from "./Chatlist";
import Userinfo from "./Userinfo";

const List = () => {
  return (
    <div className=" flex flex-col h-[622px] md:h-full">
      <div className="">
        <Userinfo />
      </div>
      <div className="flex-1 overflow-scroll ">
        <Chatlist />
      </div>
    </div>
  );
};

export default List;
