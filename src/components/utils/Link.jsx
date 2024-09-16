import useNavigation from "../../hooks/useNavigation"

const Link = ({ to, children, className }) => {
    const { navigate } = useNavigation();
    
    const handleClick = (e) => {
        e.preventDefault();
        
        navigate(to)
    }

    return <a href={to} onClick={handleClick} className={className}>{children}</a>
}

export default Link
