import Navbar from "../madhuni/components/Navbar";
import { motion } from "framer-motion";
import user from "../assets/user.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const headerVarints = {
    hidden: { opacity: 0, y: -50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
    hover: {
        y: [0, -10, 0],
        transition: {
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
        },
    },
};

const defaultFarmers = [
    {
        username: 1,
        name: "Sarath Gamage",
        about: "Experienced farmer with a passion for sustainable agriculture.",
        crops: ["Rice", "Vegetables"],
        connectedfarmers: [],
        location: "Kandy",
    },
    // ... other farmers ...
];

const defaultAbout = "Experienced farmer with a passion for sustainable agriculture.";

function FarmerCommunity() {
    const [connectedfarmers, setConnectedfarmers] = useState([]);
    const navigate = useNavigate();
    const [farmers, setFarmers] = useState(defaultFarmers);

    const currentUser = localStorage.getItem("username")?.toLocaleLowerCase().trim();

    const sortedFarmers = [...farmers].sort((a, b) => {
    if (a.username === currentUser) return -1;
    if (b.username === currentUser) return 1;

    const aConnected = a.connectedfarmers.includes(currentUser);
    const bConnected = b.connectedfarmers.includes(currentUser);

    if (aConnected && !bConnected) return -1;
    if (!aConnected && bConnected) return 1;

    return a.name.localeCompare(b.name);
    });


    useEffect(() => {
        fetch("http://localhost:8000/farmers/get_all_farmers")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch farmers data");
                }
                return response.json();
            })
            .then((data) => {
                setFarmers(data["farmers"]);
                console.log(data["farmers"]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const addConnectedFarmer = (farmer) => {
        fetch("http://localhost:8000/farmers/connect_farmer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: localStorage.getItem("username"),
                farmer_username: farmer.username,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to connect with farmer");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setConnectedfarmers([...connectedfarmers, farmer]);
            })
            .catch((error) => {
                console.error(error);
        })
    }

    const handleConnect = (farmer) => {
        let currentUser = localStorage.getItem("username");
        if (!farmer.connectedfarmers.includes(currentUser)) {
            farmer.connectedfarmers.push(currentUser); // need to update with the backend
            addConnectedFarmer(farmer);
        }
    };

    const handleChat = (farmer) => {
        navigate("/farmercommunity/chat", { state: { farmer } });
    };

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
            {/* <div className="flex flex-row justify-center items-center mt-8">
                <textarea 
                    className="w-full max-w-2xl mx-10 m-4 p-4 border border-gray-300 rounded-lg"
                    placeholder="ඔබගේ ගොවි සමාජය පිළිබඳ අදහස් හෝ ප්‍රශ්න මෙහි ලියන්න..."
                />
                <button>
                    <motion.button
                        className="bg-green-600 text-white rounded hover:bg-green-700"
                        whileHover={{ scale: 1.05 }}
                    >
                        පළ කරන්න
                    </motion.button>
                </button>

            </div> */}
            
            <motion.div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center items-center mt-16">
                {sortedFarmers.map((farmer) => {
                    const isCurrentUser = farmer.username === localStorage.getItem("username");
                    const isConnected = farmer.connectedfarmers.includes(localStorage.getItem("username"));
                    return (
                        <motion.div
                            key={farmer.name}
                            className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg cursor-pointer p-6 mx-2 my-4"
                            style={{ aspectRatio: "4/5", width: "90%" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src={
                                    farmer.image
                                        ? `data:image/jpeg;base64, ${farmer.image}`
                                        : user
                                }
                                alt="user"
                                className="bg-white w-24 m-3"
                            />
                            <h2 className="text-2xl font-semibold m-2">
                                {isCurrentUser ? farmer.name + " (You)" : farmer.name}
                            </h2>
                            <p className="text-gray-600 ">{farmer.location}</p>
                            <p className="text-gray-500 text-center text-sm mt-2">
                                {farmer.about ? farmer.about : "අපනයන කෘෂිකර්මයට කැමැත්තක් සහිත පළපුරුදු ගොවියෙකි."}
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                                Crops:{" "}
                                {Array.isArray(farmer.crops)
                                    ? farmer.crops.join(", ")
                                    : farmer.crops
                                    ? farmer.crops
                                          .split(",")
                                          .map((crop) => crop.trim())
                                          .join(", ")
                                    : ""}
                            </p>

                            {!isCurrentUser && (
                                isConnected ? (
                                    <motion.button
                                        className="mt-6 px-8 py-2 text-green-700 bg-green-100 border-2 border-green-700 rounded-3xl hover:bg-green-200 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        style={{ border: "2px solid #4CAF50" }}
                                        onClick={() => handleChat(farmer)}
                                    >
                                        Chat
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        className="mt-6 px-5 py-2 text-green-700 bg-green-100 border-2 border-green-700 rounded-3xl hover:bg-green-200 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        style={{ border: "2px solid #4CAF50" }}
                                        onClick={() => handleConnect(farmer)}
                                    >
                                        + Connect
                                    </motion.button>
                                )
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}

export default FarmerCommunity;
