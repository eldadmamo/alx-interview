
const Notifications = () => {
    return (
        <div className="bg-black text-white h-screen">
            <div className="px-4 py-4">
                <h1 className="text-lg font-bold">Notifications</h1>
                <ul className="mt-4">
                    <li className="bg-[#272a2f] rounded-lg p-4 mb-2">No new notifications</li>
                    {/* You can add more notifications here */}
                </ul>
            </div>
        </div>
    );
};

export default Notifications;
