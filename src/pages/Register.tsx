import Navigation from "@/components/Navigation";

const Register = () =>{

    return(
        <div className="min-h-screen">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Register for the Event</h1>
                <p className="mb-4"> Please note :This is where will add the form and the invoice for payments</p>
                {/* Registration Form Component can be added here */}
            </div>
        </div>
    )
}

export default Register;