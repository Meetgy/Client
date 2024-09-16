import useNavigation from "../../hooks/useNavigation"

const Link = ({ to, chilren }) => {
    const { navigate } = useNavigation();
    
    const handleClick = (e) => {
        e.preventDefault();
        
        navigate(to)
    }

    return <a href={to} onClick={handleClick}>{chilren}</a>
}

export default Link
