import Button from './Button';

const Card = ({ type, phrase, flipped, onClick, handleAddFlashcard }) => {
    if (type === 'flashcards') {
        return (
            <div className={`card flashcard ${flipped ? 'flipped' : ''}`} onClick={onClick}>
                <div className="flashcard-inner">
                    <div className='flashcard-front'>
                        <h3>{phrase.phrase}</h3>
                    </div>
                    <div className="flashcard-back">
                        <h3>{phrase.translation}</h3>
                    </div>
                </div>
            </div>
        );
    } else if (type === 'phrases') {
        return (
            <div className="card phraseCard">
                <h3>{phrase.phrase}</h3>
                <h4>{phrase.translation}</h4>
                <Button label="Add to flashcards" className="add-flashcard-btn btn" onClick={handleAddFlashcard} />
            </div>
        );
    } else {
        return (
            <div className="card emptyDataResponseCard">
                <h3>No flashcards yet.</h3>
                <h4>Go add some!</h4>
                <Button label="Get Fluent" onClick={() => window.location = '/'} />
            </div>
        );
    };
};

export default Card;