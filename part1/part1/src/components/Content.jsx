import Part from "./Part";

export default function Content({parts}) {
    return (
        <div className="content">
            {parts.map((content, index) => {
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

