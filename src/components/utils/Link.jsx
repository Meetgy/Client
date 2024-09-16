import useNavigation from "../../hooks/useNavigation"

const Link = ({ to, chilren, className }) => {
    const { navigate } = useNavigation();
    
    const handleClick = (e) => {
        e.preventDefault();
        
        navigate(to)
    }

    return <a href={to} onClick={handleClick} className={className}>{chilren}</a>
}

export default Link
