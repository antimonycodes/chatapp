import Chat from "./components/Chat";
import Details from "./components/Details";
import List from "./components/list/List";

function App() {
  return (
    <>
      <div
        className=" w-[90vw] h-[90vh] rounded-lg  border border-solid border-gray-500  md:flex "
        style={{
          background:
            "linear-gradient(90deg, rgba(91,33,182,0.75) 47%, rgba(39,121,216,0.75) 100%)",
        }}
      >
        <div className="flex-1 ">
          <List />
        </div>
        <div
          className="hidden md:block border-l border-r border-solid border-[#dddddd35] "
          style={{ flex: "2" }}
        >
          <Chat />
        </div>
        <div className=" hidden xl:block flex-1 ">
          <Details />
        </div>
      </div>
    </>
  );
}

export default App;
