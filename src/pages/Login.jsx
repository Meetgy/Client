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
        ErrorContent = <div>Please try again after some time</div>
    }
    if (results.isSuccess) {
        window.localStorage.setItem("biscut", results?.data?._id);
    }

    const dataInputs = [
        {
            name: "username",
            placeholder: "USERNAME",
        },
        {
            name: "name",
            placeholder: "NAME",
        },
        {
            name: "email",
            placeholder: "EMAIL",
        },
        {
            name: "password",
            placeholder: "PASSWORD",
        },
    ];
    const Input = dataInputs.map((data, i) => {
        return (
            <div key={i}>
                <input
                    key={i}
                    className="w-48 px-1 text-base m-2 bg-gray-100 rounded-md "
                    name={data.name}
                    type="text"
                    placeholder={data.placeholder}
                />
            </div>
        );
    });

    return (
        <div className="bg-[#212121] w-screen h-screen flex flex-col justify-center items-center">
            {results.isError && ErrorContent}
            <form
                onSubmit={handleSubmit}
                className="flex flex-row justify-center items-center"
            >
                {Input}
                <button className="px-2 bg-gray-300 text-base text-black rounded-md ">
                    JOIN
                </button>
            </form>
        </div>
    )
}

export default LoginPage;