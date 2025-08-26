import Navigation from "@/components/Navigation";

const Contact = () =>{

    return(
        <div className="min-h-screen">
            <Navigation />
            <div className="min-h-screen">
                <section className="pt-24 pb-16 bg-gradient-to-r from-primary/10 to-accent/10">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-4xl mx-auto">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                                Contact Us
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground">
                                We would love to hear from you!
                            </p>
                            <p>For inquiries, sponsorship opportunities, or general questions, please reach out to us.</p>
                            <p>
                                We'll add emails amd contact infro here 
                            </p>
                        </div>
                    </div>
                </section>
                {/* Additional content can be added here */}
            </div>
        </div>
    )
}

export default Contact;