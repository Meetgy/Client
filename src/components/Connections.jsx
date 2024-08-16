import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const Connections = ({ data, handleReceiverId }) => {
    const [isOpen, setIsOpen] = useState(false)

    const userId = window.localStorage.getItem("biscut");

    const handleDropDown = () => {
        setIsOpen(curr => !curr)
    }

    let content = data?.map((user, i) => {
        if (user._id !== userId) {
            return (
                <div key={i} className="flex flex-row gap-2 bg-gray-950" onClick={() => {
                    handleReceiverId(user);
                    setIsOpen(false);
                }} >
                    <div>{user.name}</div>
                    <div>{user.username}</div>
                </div>
            )
        }
    })

    return (
        <div className="text-white w-96 ">
            <div onClick={handleDropDown} className="flex flex-row items-center">
                Users {isOpen ? <IoMdArrowDropup className="text-xl" /> : <IoMdArrowDropdown className="text-xl" />}
            </div>
            <div className="h-48 overflow-y-auto my-1">
                {isOpen && content}
            </div>
        </div>
    )
}

export default Connections;