import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Notes from "./features/Notes/Notes.tsx";

const App = () => {
    return (
        <>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Notes/>
            </main>
        </>
    );
};

export default App;