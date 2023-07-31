import { useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [openBill, setOpenBill] = useState(null);
  const [openAddFriend, setOpenAddFriend] = useState(null);
  const [addFriendName, setAddFriendName] = useState("");
  const [imgLink, setImgLink] = useState("https://i.pravatar.cc/48");

  function handleAddFriend(item){
    setData((items) => [...items, item])
  }
  
  function handleDeleteItem(id){
    setData((items) => items.filter(item => item.id !== id))
  }

  return (
    <>
      <div 
        className={`${openAddFriend || openBill ? "blur" : ""} h-[100vh]`}
        onClick={() => {if(openBill || openAddFriend){
          setOpenBill(null);
          setOpenAddFriend(null); 
        }}}
      >
      <Header></Header>
      <Main 
        data={data} 
        openBill={openBill} 
        setOpenBill={setOpenBill}
        openAddFriend={openAddFriend}
        onDeleteItem={handleDeleteItem}
      ></Main>
      <AddButton 
        setOpenAddFriend={setOpenAddFriend}
      ></AddButton>
      </div>
      {openBill ? <WindowSplitBill setOpenBill={setOpenBill} ></WindowSplitBill> : ""}
      {
        openAddFriend ? 
        <AddFriend 
          setOpenAddFriend={setOpenAddFriend} 
          data={data} 
          setData={setData} 
          addFriendName={addFriendName} 
          setAddFriendName={setAddFriendName}
          imgLink={imgLink}
          setImgLink={setImgLink}
          onAddFriend={handleAddFriend}
        ></AddFriend> : ""
      }
    </>
  );
}

function Header(){
  return(
    <div className="bg-gradient-to-r from-seconday-color to-primary-color text-white drop-shadow-lg py-4 px-2 sm:px-5 ">
      <h1 className="tracking-wider uppercase text-2xl sm:text-4xl font-thin inline-block border-2 border-white rounded-full px-4 py-2">Eat N' Sp\it</h1>
    </div>
  )
}

function Main({ data, openBill, setOpenBill, onDeleteItem }){
  return(
    <div>
      <ul className="z-40 flex flex-col space-y-3 py-5 mx-auto min-w-[17rem] max-w-[40rem] px-2">
        {data.map((i, e) => <Items itemsObj={i} key={i.id} userId={i.id} openBill={openBill} setOpenBill={setOpenBill} balance={i.balance} onDeleteItem={onDeleteItem}></Items>)}
      </ul>
    </div>
  )
}

function Items({ itemsObj, openBill, setOpenBill, userId, onDeleteItem }){
  const isOpen = userId === openBill;

  function open() {
    setOpenBill(isOpen ? null : userId);
  }

  return(
    <li className={`grid grid-cols-3 items-center shadow-md px-3 py-2 rounded-lg bg-white `}>
      <img className="rounded-full row-span-2 w-[4rem] place-self-center" src={itemsObj.image} alt={itemsObj.name} />
      <div className="">
        <p className="font-semibold">{itemsObj.name}</p>
        <p className=" text-xs col-start-2 row-start-2 ">{itemsObj.balance < 1 ? `You and ${itemsObj.name} are even` : ""}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button 
          className={`${isOpen ? "pointer-events-none" : ""} border border-seconday-color hover:bg-seconday-color hover:text-white rounded-lg text-sm py-2 font-semibold`}
          onClick={() => open()}
        >
          Select</button>
        <button 
          className={`${isOpen ? "pointer-events-none" : ""} col-start-3 border border-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm py-2 font-semibold`}
          onClick={() => onDeleteItem(userId)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

function WindowSplitBill({ setOpenBill }){
  return(
    <div className="flex justify-center">
      <div className="absolute top-[20vh] flex flex-col mx-2 bg-white p-5 gap-5 rounded-lg">
        <h1 className="text-lg text-center uppercase font-bold">split a bill with name</h1>
        <div className="grid grid-cols-2 items-center grid-rows-4 gap-4">
          <label className="text-sm">Bill value</label>
          <input className="shadow-md shadow-black/30 rounded-md h-[2rem] text-center" id="bill-value" type="number" />
          <label className="text-sm">Your expense</label>
          <input className="shadow-md shadow-black/30 rounded-md h-[2rem] text-center" id="expense1" type="number" />
          <label className="text-sm">Friend's expense</label>
          <input className="shadow-md shadow-black/30 rounded-md h-[2rem] text-center" id="expense2" type="number" />
          <label className="text-sm">Who is paying the bill</label>
          <select className="shadow-md shadow-black/30 rounded-md h-[2rem] text-center" id="payer"type="text">
            <option value="">
              You
            </option>
            <option value="">
              friend that will pay
            </option>
          </select>
          <button 
            className=" text-center uppercase border border-seconday-color hover:bg-seconday-color hover:text-white rounded-lg text-sm font-semibold py-2"
            onClick={() =>  setOpenBill(null)}
          >Cancel</button>
          <button className="text-center uppercase border border-seconday-color hover:bg-seconday-color hover:text-white rounded-lg text-sm font-semibold py-2">Split bill</button>
        </div>
      </div>
    </div>
  )
}

function AddFriend({ setOpenAddFriend, addFriendName, setAddFriendName, imgLink, setImgLink, onAddFriend }){
  function handleSubmit(){
    const newItem = {id: Date.now(), name: addFriendName, image: imgLink, balance: 0};
    if(!addFriendName) return
    onAddFriend(newItem);
    setAddFriendName("");
  }

  return(
    <div className="flex justify-center">
      <div className="grid grid-cols-1 absolute top-[20vh] text-center max-w-[18rem] gap-5 mx-2 bg-white p-5 rounded-lg">
        <h1 className="text-lg text-center uppercase font-bold">ADD FRIEND</h1>
        <div className="">
          <label for="add-friend-name" className="text-base font-semibold">Friend Name</label>
          <input 
            id="add-friend-name" 
            className={`shadow-md shadow-black/30 rounded-md h-[2rem] text-center`}
            type="text"
            value={addFriendName}
            onChange={(e) => setAddFriendName(e.target.value)}
          />
        </div>
        <div className="">
          <label for="profile-img" className="text-base font-semibold">Image URL</label>
          <input 
            id="profile-img" 
            className="shadow-md shadow-black/30 rounded-md h-[2rem] text-center" 
            type="text" 
            value={imgLink}
            onChange={(e) => setImgLink(e.target.value)}
          />
        </div>
        <button 
          className="text-center uppercase border border-seconday-color hover:bg-seconday-color hover:text-white rounded-lg text-sm font-semibold py-2"
          onClick={() => handleSubmit()}
        >Add</button>
        <button 
          className="text-center uppercase border border-seconday-color hover:bg-seconday-color hover:text-white rounded-lg text-sm font-semibold py-2"
          onClick={() => {setOpenAddFriend(null); setAddFriendName("")}}
        >cancel</button>
      </div>
    </div>
  )
}

function AddButton({ setOpenAddFriend }){
  return(
    <div 
      className="cursor-pointer fixed right-5 bottom-5 w-[3rem] h-[3rem] text-center bg-white rounded-full shadow-md shadow-black/40"
      onClick={() => setOpenAddFriend((open) => !open)}
    >
      <button className="font-thin text-4xl">+</button>
    </div>
  )
}