import { useLocation } from "react-router-dom"
export function ViewBlog() {
    const location = useLocation()
    const post = location.state;

    return (
        <div>
            <div className="container mx-auto px-4">
                <h1 className=" base-text  py-2 text-2xl text-center text-green-500" >{post.title}</h1>
                <h3 className="base-text text-xl text-center py-2" >{post.excerpt}</h3>
                <p className="base-text text-xs text-center py-2"  style={{color: 'var(--secondary-foreground)'}}>{post.content}</p>
                <p key={post} className="base-text text-green-500 text-center mt-10" >
                    {post.tags.map((tag, index) => { return <span key={index} className="base-text px-2 mx-1 py-1 border text-xs">{tag}</span> })}
                </p>
                <p className="base-text text-green-500 text-right mt-10" >{post.year}</p>

            </div>
        </div>);
}

