import Part from "./Part";

export default function Content({contents}) {
    return (
        <div className="content">
            {contents.map((content, index) => {
                return (
                    <Part 
                        key={index}
                        part={content.name} 
                        exercise={content.exercises} 
                    />
                )
            })}
        </div>
    );
}

