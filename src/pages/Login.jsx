import Input from "../components/Input";
import { useSignupMutation } from "../store";

const LoginPage = () => {
    const [signup, results] = useSignupMutation()

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: e.target.username.value,
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            status: "online",
            // connections: ["66641d65c4143d51b00480ed", "666569a036995de3965f84bb"],
        };
        signup(user)
    };
    let ErrorContent;
    if(results.isError) {
        ErrorContent = <div className="p-2 text-violet-400 text-xl ">Please try again after some time</div>
    }
    if (results.isSuccess) {
        window.localStorage.setItem("biscut", results?.data?._id);
    }

    const dataInputs = [
        {
            name: "username",
            placeholder: "Username",
            minlength: "1",
            maxlength: "50",
        },
        {
            name: "name",
            placeholder: "Name",
            minlength: "1",
            maxlength: "50",
        },
        {
            name: "email",
            placeholder: "Email",
            minlength: null,
            maxlength: null,
        },
        {
            name: "password",
            placeholder: "Password",
            minlength: null,
            maxlength: null,
        },
    ];
    const Inputs = dataInputs.map((data, i) => {
        return (
            <Input key={i} data={data}/>
        );
    });

    return (
        <div className="bg-zinc-950 w-full h-full flex flex-col items-center">
            <div className="bg-violet-500 h-2 w-screen relative top-0"></div>
            <div className="flex flex-col flex-1 w-screen justify-center items-center">
                <div className="p-10 text-violet-400 text-3xl font-semibold">Create your account</div>
                {results.isError && ErrorContent}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center"
                >
                    {Inputs}
                    <button className="px-2 bg-[#eff3f4] rounded-full w-112 h-12 text-base font-semibold text-violet-500 m-2 mt-12 border-[1px] border-[#eff3f4] outline-none">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;