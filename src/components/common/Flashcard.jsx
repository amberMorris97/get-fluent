import Button from "./Button";
import Card from "./Card"

const Flashcard = ({ phrase, handleFlipState, flipped, handleRemoveFlashcard }) => {
    return (
        <div>
            <Card onClick={handleFlipState}>
                {!flipped && <h3>{phrase.phrase}</h3>}
                {flipped && <h3>{phrase.translation}</h3>}
            <Button label="Remove from flashcards" onClick={handleRemoveFlashcard} />
            </Card>
        </div>
    );
};

export default Flashcard;