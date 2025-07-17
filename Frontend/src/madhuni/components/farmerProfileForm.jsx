import { useNavigate } from "react-router-dom";

function FarmerProfileForm() {

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("username", localStorage.getItem("username"));
        const data = {
            name: formData.get("name"),
            village: formData.get("village"),
            crops: formData.get("crops"),
            about: formData.get("about"),
            image: formData.get("image") ? formData.get("image") : null, 
        }
        
        const response = await fetch("http://localhost:8000/farmers/add_farmer_details",{
            method: "POST",
            body: formData,
        })

        if(response.ok){
            alert("Profile created successfully!");
            navigate('/farmercommunity');
        }
    }

    return(
        <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100">
            <h1 className="text-2xl font-bold text-center p-10">ඔබගේ විස්තර මෙහි ඇතුළත් කරන්න</h1>
            <form className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold m-2 mt-3" htmlFor="name">
                        නම
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="ඔබගේ නම"
                    />
                    <label className="block text-gray-700 text-sm font-bold m-2" htmlFor="village">
                        ගම
                    </label>
                    <input
                        type="text"
                        name="village"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="ඔබගේ ගම"
                    />
                    <label className="block text-gray-700 text-sm font-bold m-2 mt-3" htmlFor="crops">
                        ඔබ වගා කරන බෝග
                    </label>
                    <textarea
                        type="text"
                        name="crops"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="ඔබ වගා කරන බෝග"
                    />
                    <label className="block text-gray-700 text-sm font-bold m-2 mt-3" htmlFor="about">
                        ඔබ ගැන කියන්න
                    </label>
                    <textarea
                        type="text"
                        name="about"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="ඔබ ගැන සදහන් කරන්න"
                    />
                    <label className="block text-gray-700 text-sm font-bold m-2" htmlFor="image">
                        ඔබගේ පින්තූරය
                    </label>
                    <input
                        type="file"
                        name="image"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="ඔබගේ පින්තූරය"
                    />
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold text-sm py-2 px-2 rounded focus:outline-none focus:shadow-outline m-2 mt-4" type="submit">
                        ඉදිරිපත් කරන්න
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FarmerProfileForm;