import Header from "../comps/Header";
import { verifyAdmin } from "../comps/DataAccess";

export default function AdminLogin() {
    async function handleSubmit(e) {
        e.preventDefault();
        const username = e.target.email.value;
        const password = e.target.password.value;

        const user = await verifyAdmin(username, password);
        if (user) {
            sessionStorage.setItem("admin", "true");
            window.location.reload();
        } else {
            alert("Lawde galat password daal diya");
        }
    }

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 lg:px-12 py-8">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
                    <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="border rounded-lg px-4 py-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="border rounded-lg px-4 py-2 w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
