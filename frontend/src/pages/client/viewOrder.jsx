import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserOrder = () => {
    const [form, setForm] = useState({
        restaurantName: '',
        description: '',
        country: '',
        city: '',
        postalCode: '',
        address: '',
    });
    const navigate = useNavigate();
    const [mainImagePreview, setMainImagePreview] = useState(null);
    const [backgroundImagePreview, setBackgroundImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token");

        const userType = localStorage.getItem("user_type");
        if (userType !== "1") {
            navigate("/unauthorized");
            return;
        }
        if (!token) {
            navigate("/unauthorized");
            return;
        }

        const fetchUserOrder = async () => {
            try {
                const response = await fetch("http://localhost:3100/testOrderView", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({})
                });

                const json = await response.json();
                if (response.ok) {
                    console.log(json)
                    // setForm({
                    //     restaurantName: json.data.restaurant_name || '',
                    //     description: json.data.restaurant_description || '',
                    //     country: json.data.address_country || '',
                    //     city: json.data.address_city || '',
                    //     postalCode: json.data.address_postal_code || '',
                    //     address: json.data.address_name || '',
                    // });
                    setMessage(json)
                }
            }catch(e){

            }
        };
        fetchUserOrder();
    }, []);




    return (
        <section className="restaurant-settings-page">
            <h1>Messages reçus du serveur :</h1>
            {message && <pre>{JSON.stringify(message, null, 2)}</pre>}
        </section>
    );
};

export default UserOrder;