import useNavigation from "../../hooks/useNavigation"

const Link = ({ to, children, className, onClick }) => {
    const { navigate } = useNavigation();
    
    const handleClick = (e) => {
        e.preventDefault();
        
        navigate(to)
    }

    return <a href={to} onClick={(e) => {
        handleClick(e)
        onClick()
    }} className={className}>{children}</a>
}

export default Link
