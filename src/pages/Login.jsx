import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Input from "../components/Input";
import { useSignupMutation, useLoginMutation, setToken } from "../store";
import { FaArrowsRotate } from "react-icons/fa6";
import useNavigation from "../hooks/useNavigation";
import HorizontalBar from "../components/styling_Comps/HorizontalBar"
import { useDispatch } from "react-redux";

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    
    const [signup, signUpResults] = useSignupMutation();
    const [login, logInResults] = useLoginMutation();
    
    const dispatch = useDispatch();
    const { navigate } = useNavigation();

    const results = isSignUp ? signUpResults : logInResults;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            const user = {
                username: `@${e.target.username.value}`,
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value,
                status: "online",
            };
            signup(user);
        } else if(!isSignUp) {
            let value = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.usernameEmail.value) ? 'email' : 'username';
            const user = {
                [value]: `@${e.target.usernameEmail.value}`,
                password: e.target.password.value,
                status: "online",
            };
            login(user);
        }
    };

    const signUpDataInputs = [
        {
            name: "name",
            placeholder: "Name",
            minlength: "1",
            maxlength: "50",
            required: true,
        },
        {
            name: "username",
            placeholder: "Username",
            minlength: "1",
            maxlength: "50",
            required: true,
        },
        {
            name: "email",
            placeholder: "Email",
            minlength: null,
            maxlength: null,
            required: true,
        },
        {
            name: "password",
            placeholder: "Password",
            minlength: null,
            maxlength: null,
            required: true,
        },
    ];
    const logInDataInputs = [
        {
            name: "usernameEmail",
            placeholder: "Username / Email",
            minlength: null,
            maxlength: null,
            required: true,
        },
        {
            name: "password",
            placeholder: "Password",
            minlength: null,
            maxlength: null,
            required: true,
        },
    ];

    let ErrorsMap = new Map();
    let ErrorsMsg = "An unexpected error occurred.";
    if (results?.isError) {
        if (results.error.status === "FETCH_ERROR") {
            // Likely a network error (e.g., server is down)
            ErrorsMsg = "Unable to connect to the server. Please check your internet connection or try again later."
            console.error("Network error: The server may be offline.");
        } else if (results?.isError) {
            if (results.error.data.name == "ValidationError") {
                ErrorsMsg = "There were validation errors. Please check the form and try again.";
                Object.keys(results.error.data.errors).forEach(errorType => {
                    ErrorsMap.set(errorType, results.error.data.errors[errorType]);
                })
            } else {
                ErrorsMsg = results.error.data.message || "An error occurred on the server.";
            }
        } else {
            // Other kinds of errors
            console.error("An unknown error occurred:", results.error);
        }
        console.log(results)
    }

    if (results?.isSuccess) {
        window.localStorage.setItem("biscut", results?.data?.user._id);
        dispatch(setToken(results?.data?.token));
        navigate("/DashBoard")
    }

    let typeOfInput = isSignUp ? signUpDataInputs : logInDataInputs
    let Inputs = typeOfInput.map((data, i) => {
        const ErrorObject = ErrorsMap.get(data?.name)
        return (
            <Input key={i} data={data} ErrorObject={ErrorObject} />
        );
    });

    if (results.isError) {
        console.log(results.isError)
    }
    return (
        <div className="bg-zinc-950 w-full h-full flex flex-col items-center">
            <HorizontalBar />
            <div className="flex flex-col flex-1 w-screen justify-center items-center">
                <div className="p-10 text-violet-400 text-3xl font-semibold">
                    {isSignUp ? "Create your account" : "Login to your account"}
                </div>
                <div className="p-2 text-violet-400 text-sm ">
                    {results.isError && ErrorsMsg}
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center"
                >
                    {Inputs}
                    <button
                        className="flex justify-between items-center px-4 bg-[#eff3f4] rounded-full w-112 h-12 text-base font-semibold text-violet-500 m-2 mt-12 border-[1px] border-[#eff3f4] outline-none"
                    >
                        <span className="flex-grow text-center">
                            {results?.isLoading ? (
                                <AiOutlineLoading className="animate-spin text-2xl inline" />
                            ) : (
                                isSignUp ? 'Sign Up' : 'Login'
                            )}
                        </span>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsSignUp(!isSignUp);
                            }}
                            className="bg-violet-500 text-white p-2 rounded-full hover:bg-violet-600 transition-colors duration-300 group"
                        >
                            <FaArrowsRotate className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                        </button>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;