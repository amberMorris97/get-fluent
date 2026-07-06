import Card from "./Card"

const Flashcard = ({ phrase, handleFlipState, flipped }) => {
    return (
        <div>
            <Card onClick={handleFlipState}>
                {!flipped && <h3>{phrase.phrase}</h3>}
                {flipped && <h3>{phrase.translation}</h3>}
            </Card>
        </div>
    );
};

export default Flashcard;