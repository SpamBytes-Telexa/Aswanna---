import Navbar from "../madhuni/components/Navbar";
import { motion } from "framer-motion";
import user from "../assets/user.png";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

const headerVarints = {
    hidden: {opacity: 0, y: -50},
    visible: {opacity: 1, y: 0, 
        transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
        }
    },
    hover: {
        y: [0, -10, 0],
        transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse"
        }
    }
    
}

const farmers = [
    {
        username: 1,
        name: "Sarath Gamage",
        about: "Experienced farmer with a passion for sustainable agriculture.",
        crops: ["Rice", "Vegetables"],
        connectedFarmers: [],
        location: "Kandy",
    },
    {
        username: 2,
        name: "Kumara Perera",
        about: "Specializes in organic farming and crop rotation.",
        crops: ["Fruits", "Spices"],
        connectedFarmers: [],
        location: "Galle",
    },
    {
        username: 3,
        name: "Nimal Jayasinghe",
        about: "Innovative farmer using modern techniques for better yield.",
        crops: ["Tea", "Rubber"],
        connectedFarmers: [],
        location: "Colombo",
    },
    {
        username: 4,
        name: "Amal Silva",
        about: "Focuses on traditional farming methods and local crops.",
        crops: ["Coconut", "Pulses"],
        connectedFarmers: [],
        location: "Matara",
    },
    {
        username: 5,
        name: "Lakmal Fernando",
        about: "Expert in pest management and crop protection.",
        crops: ["Sugarcane", "Fruits"],
        connectedFarmers: [],
        location: "Kurunegala",
    },
    {
        username: 6,
        name: "Chathura Bandara",
        about: "Advocate for sustainable farming practices and biodiversity.",
        crops: ["Vegetables", "Herbs"],
        connectedFarmers: [],
        location: "Anuradhapura",
    },
    {
        username: 7,
        name: "Dilani Perera",
        about: "Promotes agroforestry and permaculture techniques.",
        crops: ["Fruits", "Vegetables"],
        connectedFarmers: [],
        location: "Jaffna",
    },
    {
        username: 8,
        name: "Rohan Wijesinghe",
        about: "Utilizes technology for precision farming.",
        crops: ["Rice", "Spices"],
        connectedFarmers: [],
        location: "Badulla",
    },
    {
        username: 9,
        name: "Saman Kumara",
        about: "Engaged in community farming and education.",
        crops: ["Coconut", "Vegetables"],
        connectedFarmers: [],
        location: "Ratnapura",
    },
    {
        username: 10,
        name: "Tharindu Jayasuriya",
        about: "Researcher in agricultural sustainability.",
        crops: ["Tea", "Fruits"],
        connectedFarmers: [],
        location: "Polonnaruwa",
    }
]

const defaultAbout = "Experienced farmer with a passion for sustainable agriculture.";

function FarmerCommunity () {
    const [connectedFarmers, setConnectedFarmers] = useState([]);
    const navigate = useNavigate();

    const handleConnect = (farmer) => {
        let currentUser = localStorage.getItem("username");
        if (!farmer.connectedFarmers.includes(currentUser)) {
            farmer.connectedFarmers.push(currentUser); // need to update with the backend
            setConnectedFarmers([...connectedFarmers, farmer]);
            // alert(`Connecting with ${farmer.name}`);
        } 
    }

    const handleChat = (farmer) => {
        // alert(`Starting chat with ${farmer.name}`);
        navigate("/farmercommunity/chat", { state: { farmer } }); // Pass farmer data to chat page
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100">
            <Navbar />
            <motion.h1
                className="text-4xl font-bold text-center text-green-800 mt-10"
                initial="hidden"
                animate="visible"
                variants={headerVarints}
                whileHover="hover"
            >
                අස්වැන්න ගොවි සමාජය
            </motion.h1>
            <motion.div
                className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center items-center mt-16"
            >
                {farmers.map((farmer) => (
                    <motion.div
                        key={farmer.name}
                        className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg cursor-pointer p-6 mx-2 my-4"
                        style={{ aspectRatio: "4/5", width: "90%" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src={user} alt="user image" className="bg-white w-24 m-3"/>
                        <h2 className="text-2xl font-semibold m-2">{farmer.name}</h2>
                        <p className="text-gray-600 ">{farmer.location}</p>
                        <p className="text-gray-500 text-center text-sm mt-2">{farmer.about ? farmer.about : defaultAbout}</p>
                        <p className="text-gray-500 text-sm mt-2">Crops: {farmer.crops.join(", ")}</p>

                        {(farmer.connectedFarmers.includes(localStorage.getItem("username"))) ?
                            (
                                <motion.button
                                    className="mt-6 px-8 py-2 text-green-700 bg-green-100 border-2 border-green-700 rounded-3xl hover:bg-green-200 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    style={{border: "2px solid #4CAF50"}}
                                    onClick={() => handleChat(farmer)}
                                >
                                    Chat
                                </motion.button>
                            ) : (
                                <motion.button
                                    className="mt-6 px-5 py-2 text-green-700 bg-green-100 border-2 border-green-700 rounded-3xl hover:bg-green-200 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    style={{border: "2px solid #4CAF50"}}
                                    onClick={() => handleConnect(farmer)}
                                >
                                    + Connect
                                </motion.button>
                            )
                        }

                        

                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default FarmerCommunity;